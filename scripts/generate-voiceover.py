import asyncio
import json
import os
import re
import sys
from pathlib import Path

from edge_tts import Communicate
from edge_tts.exceptions import NoAudioReceived


VOICE = os.environ.get("ZKP_VOICE", "en-US-AndrewMultilingualNeural")
ONLY_CLIP = os.environ.get("ZKP_ONLY_CLIP")
MAX_ATTEMPTS = int(os.environ.get("EDGE_TTS_MAX_ATTEMPTS", "5"))
RETRY_DELAY_SECONDS = float(os.environ.get("EDGE_TTS_RETRY_DELAY_SECONDS", "2"))
TEMP_DIR = Path("/tmp/zkp-remotion-neural-voiceover")
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "public/voiceover"

CLIPS = [
    {
        "name": "01-intro",
        "rate": "+2%",
        "phrases": [
            "Imagine proving you know a secret —",
            "without ever revealing what that secret is.",
            "That's the idea behind a zero-knowledge proof.",
        ],
    },
    {
        "name": "02-exchange",
        "rate": "+2%",
        "phrases": [
            "Alice is the prover.",
            "Bob is the verifier.",
            "Alice wants Bob to trust",
            "that her claim is true —",
            "but she doesn't want to hand over",
            "her private information.",
            "Instead, she sends a proof.",
        ],
    },
    {
        "name": "03-components",
        "rate": "+0%",
        "phrases": [
            "There are four pieces.",
            "The statement, or claim.",
            "The witness, which is private.",
            "The proof Alice creates.",
            "And the verifier,",
            "which checks that proof.",
        ],
    },
    {
        "name": "04-circuit",
        "rate": "+2%",
        "phrases": [
            "A proving system uses",
            "the private witness and public statement",
            "to create a proof",
            "that the circuit's constraints hold.",
            "Bob checks the proof",
            "using public inputs —",
            "without learning the witness.",
        ],
    },
    {
        "name": "05-uses",
        "rate": "+5%",
        "phrases": [
            "Zero-knowledge proofs power rollup verification,",
            "privacy-preserving identity,",
            "and applications that validate sensitive data",
            "without revealing it.",
            "Not every zero-knowledge application",
            "is private by default.",
        ],
    },
    {
        "name": "06-outro",
        "rate": "+4%",
        "phrases": [
            "The key idea?",
            "Prove correctness.",
            "Reveal nothing else —",
            "beyond what the statement",
            "and public inputs disclose.",
        ],
    },
]


def count_words(text: str) -> int:
    return len(re.findall(r"[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*", text))


async def synthesize_with_retry(
    name: str, narration: str, rate: str, audio_path: Path
) -> list[dict[str, object]]:
    partial_audio_path = audio_path.with_suffix(".part.mp3")

    for attempt in range(1, MAX_ATTEMPTS + 1):
        metadata: list[dict[str, object]] = []
        partial_audio_path.unlink(missing_ok=True)
        communicate = Communicate(
            narration,
            VOICE,
            rate=rate,
            pitch="-2Hz",
            boundary="WordBoundary",
        )

        try:
            with partial_audio_path.open("wb") as audio_file:
                async for event in communicate.stream():
                    if event["type"] == "audio":
                        audio_file.write(event["data"])
                    elif event["type"] == "WordBoundary":
                        metadata.append(event)

            if partial_audio_path.stat().st_size == 0:
                raise NoAudioReceived("The service returned an empty audio file.")

            partial_audio_path.replace(audio_path)
            return metadata
        except NoAudioReceived as error:
            partial_audio_path.unlink(missing_ok=True)
            if attempt == MAX_ATTEMPTS:
                raise RuntimeError(
                    f"{name}: Microsoft Edge TTS returned no audio after "
                    f"{MAX_ATTEMPTS} attempts for voice {VOICE}. "
                    "Try again later or set ZKP_VOICE to another installed voice."
                ) from error

            delay = RETRY_DELAY_SECONDS * (2 ** (attempt - 1))
            print(
                f"{name}: no audio received on attempt {attempt}/{MAX_ATTEMPTS}; "
                f"retrying in {delay:g}s...",
                file=sys.stderr,
            )
            await asyncio.sleep(delay)

    raise AssertionError("retry loop exited unexpectedly")


async def generate_clip(clip: dict[str, object]) -> None:
    name = str(clip["name"])
    rate = str(clip["rate"])
    phrases = [str(phrase) for phrase in clip["phrases"]]
    narration = " ".join(phrases)
    audio_path = TEMP_DIR / f"{name}-raw.mp3"
    metadata = await synthesize_with_retry(name, narration, rate, audio_path)

    expected_words = sum(count_words(phrase) for phrase in phrases)
    if len(metadata) != expected_words:
        raise RuntimeError(
            f"{name}: expected {expected_words} word boundaries, got {len(metadata)}"
        )

    captions = []
    word_index = 0
    for phrase in phrases:
        phrase_word_count = count_words(phrase)
        phrase_events = metadata[word_index : word_index + phrase_word_count]
        word_index += phrase_word_count
        first = phrase_events[0]
        last = phrase_events[-1]
        start_ms = round(first["offset"] / 10_000)
        end_ms = round((last["offset"] + last["duration"]) / 10_000)
        captions.append(
            {
                "text": phrase,
                "startMs": start_ms,
                "endMs": end_ms,
                "timestampMs": round((start_ms + end_ms) / 2),
                "confidence": None,
                "pageBreakAfter": True,
            }
        )

    caption_path = OUTPUT_DIR / f"{name}.captions.json"
    caption_path.write_text(json.dumps(captions, indent=2) + "\n", encoding="utf-8")


async def main() -> None:
    if MAX_ATTEMPTS < 1:
        raise ValueError("EDGE_TTS_MAX_ATTEMPTS must be at least 1")
    if RETRY_DELAY_SECONDS < 0:
        raise ValueError("EDGE_TTS_RETRY_DELAY_SECONDS cannot be negative")

    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for clip in CLIPS:
        if ONLY_CLIP and clip["name"] != ONLY_CLIP:
            continue
        await generate_clip(clip)


if __name__ == "__main__":
    asyncio.run(main())
