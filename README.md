# Zero-Knowledge Proofs — Remotion explainer

A 66-second, 1920×1080, 30 fps, editable motion-graphics explainer built with React, TypeScript, and Remotion.

The video uses six connected scene compositions, glass-and-glow art direction, animated proof paths, soft scene transitions, and a narration-safe music mix.

## Requirements
- Node.js 20+ and npm
- Chrome/Chromium (Remotion can install a compatible browser if needed)
- FFmpeg/browser dependencies required by your operating system for rendering

## Run
```bash
npm install
npm run studio
```

## Render
```bash
npm run render
```

Output: `out/zkp-explainer.mp4`

To regenerate the voiceover and captions before rendering the final video, run:

```bash
./video.sh
```

## Narration
The narration in `VOICEOVER.md` is included as six chapter-aligned clips under `public/voiceover/`. It uses Microsoft’s warm, conversational `en-US-AndrewMultilingualNeural` voice with sentence-level pauses and loudness normalization.

Regenerate it with:

```bash
python3 -m venv .voiceover-venv
.voiceover-venv/bin/pip install edge-tts==7.3.1
bash scripts/generate-voiceover.sh
```

The script automatically uses `.voiceover-venv/bin/python` when present. Set `EDGE_TTS_PYTHON` to use another Python installation, or `ZKP_VOICE` to use another Edge neural voice. Transient empty responses from Microsoft Edge TTS are retried automatically.

## Music
“Sonor #2” by Eugenio Mininni is included at `public/sonor-2-eugenio-mininni.mp3`. It is mixed at 5.5% with a 1.5-second fade-in and 3-second fade-out, leaving the narration clearly dominant.

Source: [Mixkit futuristic stock music](https://mixkit.co/free-stock-music/mood/futuristic/)  
License: [Mixkit Stock Music Free License](https://mixkit.co/license/#musicFree)

## Captions
Six caption tracks are grouped with their matching narration clips in `src/video.tsx`. Phrase timing comes from the neural voice service's word boundaries, and the generated timing files are stored beside the audio under `public/voiceover/`.

## Edit
- `src/video.tsx`: master timeline, scene transitions, and audio mix
- `src/scenes/`: individual scene compositions
- `src/components.tsx`: shared visual system
- `src/theme.ts`: type, color, and easing tokens
- `src/root.tsx`: dimensions, FPS, and duration
- `VOICEOVER.md`: narration and timing

The animation uses no stock imagery. Google Fonts is used for Manrope; network access may be needed during first load.
