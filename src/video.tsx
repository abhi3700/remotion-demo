import React from 'react';
import {Audio} from '@remotion/media';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {wipe} from '@remotion/transitions/wipe';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  staticFile,
  useVideoConfig,
} from 'remotion';
import {BasicCaptions} from './basic-captions.element';
import {CircuitScene} from './scenes/circuit';
import {ExchangeScene} from './scenes/exchange';
import {IngredientsScene} from './scenes/ingredients';
import {IntroScene} from './scenes/intro';
import {OutroScene} from './scenes/outro';
import {UsesScene} from './scenes/uses';
import {clamp} from './theme';

export const ZKPExplainer: React.FC = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: '#050714'}}>
      <TransitionSeries>
        <TransitionSeries.Sequence
          durationInFrames={288}
          name="01 · The idea"
          premountFor={fps}
        >
          <IntroScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({direction: 'from-left'})}
          timing={linearTiming({durationInFrames: 0.6 * fps})}
        />
        <TransitionSeries.Sequence
          durationInFrames={378}
          name="02 · Prover + verifier"
          premountFor={fps}
        >
          <ExchangeScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({direction: 'from-left'})}
          timing={linearTiming({durationInFrames: 0.6 * fps})}
        />
        <TransitionSeries.Sequence
          durationInFrames={348}
          name="03 · Core components"
          premountFor={fps}
        >
          <IngredientsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({direction: 'from-left'})}
          timing={linearTiming({durationInFrames: 0.6 * fps})}
        />
        <TransitionSeries.Sequence
          durationInFrames={378}
          name="04 · Inside the circuit"
          premountFor={fps}
        >
          <CircuitScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({direction: 'from-left'})}
          timing={linearTiming({durationInFrames: 0.6 * fps})}
        />
        <TransitionSeries.Sequence
          durationInFrames={438}
          name="05 · Real-world uses"
          premountFor={fps}
        >
          <UsesScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({direction: 'from-left'})}
          timing={linearTiming({durationInFrames: 0.6 * fps})}
        />
        <TransitionSeries.Sequence
          durationInFrames={240}
          name="06 · Takeaway"
          premountFor={fps}
        >
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Sequence
        durationInFrames={9 * fps}
        from={0 * fps}
        name="Narration + captions · 01 · The idea"
        premountFor={fps}
      >
        <Audio
          name="Voiceover · 01 · The idea"
          premountFor={fps}
          src={staticFile('voiceover/01-intro.mp3')}
        />
        <BasicCaptions
          captions={[
            {
              text: 'Imagine proving you know a secret —',
              startMs: 86,
              endMs: 2255,
              timestampMs: 1170,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'without ever revealing what that secret is.',
              startMs: 2696,
              endMs: 5098,
              timestampMs: 3897,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "That's the idea behind a zero-knowledge proof.",
              startMs: 5502,
              endMs: 8603,
              timestampMs: 7052,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
          combineTokensWithinMilliseconds={0}
          name="Captions · 01 · The idea"
          premountFor={fps}
          style={{
            bottom: 88,
            left: 250,
            position: 'absolute',
            scale: 0.58,
            transformOrigin: 'center bottom',
            zIndex: 20,
          }}
          width={1420}
        />
      </Sequence>

      <Sequence
        durationInFrames={12 * fps}
        from={9 * fps}
        name="Narration + captions · 02 · Prover + verifier"
        premountFor={fps}
      >
        <Audio
          name="Voiceover · 02 · Prover + verifier"
          premountFor={fps}
          src={staticFile('voiceover/02-exchange.mp3')}
        />
        <BasicCaptions
          captions={[
            {
              text: 'Alice is the prover.',
              startMs: 74,
              endMs: 1299,
              timestampMs: 686,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'Bob is the verifier.',
              startMs: 1691,
              endMs: 3162,
              timestampMs: 2426,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'Alice wants Bob to trust',
              startMs: 3566,
              endMs: 4865,
              timestampMs: 4216,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'that her claim is true —',
              startMs: 4865,
              endMs: 5931,
              timestampMs: 5398,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "but she doesn't want to hand over",
              startMs: 6483,
              endMs: 7733,
              timestampMs: 7108,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'her private information.',
              startMs: 7745,
              endMs: 8738,
              timestampMs: 8242,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'Instead, she sends a proof.',
              startMs: 9142,
              endMs: 10968,
              timestampMs: 10055,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
          combineTokensWithinMilliseconds={0}
          name="Captions · 02 · Prover + verifier"
          premountFor={fps}
          style={{
            bottom: 88,
            left: 250,
            position: 'absolute',
            scale: 0.58,
            transformOrigin: 'center bottom',
            zIndex: 20,
          }}
          width={1420}
        />
      </Sequence>

      <Sequence
        durationInFrames={11 * fps}
        from={21 * fps}
        name="Narration + captions · 03 · Core components"
        premountFor={fps}
      >
        <Audio
          name="Voiceover · 03 · Core components"
          premountFor={fps}
          src={staticFile('voiceover/03-components.mp3')}
        />
        <BasicCaptions
          captions={[
            {
              text: 'There are four pieces.',
              startMs: 112,
              endMs: 1175,
              timestampMs: 644,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'The statement, or claim.',
              startMs: 1575,
              endMs: 2788,
              timestampMs: 2182,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'The witness, which is private.',
              startMs: 3200,
              endMs: 4975,
              timestampMs: 4088,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'The proof Alice creates.',
              startMs: 5375,
              endMs: 6950,
              timestampMs: 6162,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'And the verifier,',
              startMs: 7350,
              endMs: 8212,
              timestampMs: 7781,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'which checks that proof.',
              startMs: 8425,
              endMs: 9625,
              timestampMs: 9025,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
          combineTokensWithinMilliseconds={0}
          name="Captions · 03 · Core components"
          premountFor={fps}
          style={{
            bottom: 88,
            left: 250,
            position: 'absolute',
            scale: 0.58,
            transformOrigin: 'center bottom',
            zIndex: 20,
          }}
          width={1420}
        />
      </Sequence>

      <Sequence
        durationInFrames={12 * fps}
        from={32 * fps}
        name="Narration + captions · 04 · Inside the circuit"
        premountFor={fps}
      >
        <Audio
          name="Voiceover · 04 · Inside the circuit"
          premountFor={fps}
          src={staticFile('voiceover/04-circuit.mp3')}
        />
        <BasicCaptions
          captions={[
            {
              text: 'A proving system uses',
              startMs: 86,
              endMs: 1618,
              timestampMs: 852,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'the private witness and public statement',
              startMs: 1630,
              endMs: 3897,
              timestampMs: 2764,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'to create a proof',
              startMs: 4191,
              endMs: 5196,
              timestampMs: 4694,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: "that the circuit's constraints hold.",
              startMs: 5196,
              endMs: 6728,
              timestampMs: 5962,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'Bob checks the proof',
              startMs: 7132,
              endMs: 8346,
              timestampMs: 7739,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'using public inputs —',
              startMs: 8358,
              endMs: 9743,
              timestampMs: 9050,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'without learning the witness.',
              startMs: 9951,
              endMs: 11299,
              timestampMs: 10625,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
          combineTokensWithinMilliseconds={0}
          name="Captions · 04 · Inside the circuit"
          premountFor={fps}
          style={{
            bottom: 88,
            left: 250,
            position: 'absolute',
            scale: 0.58,
            transformOrigin: 'center bottom',
            zIndex: 20,
          }}
          width={1420}
        />
      </Sequence>

      <Sequence
        durationInFrames={14 * fps}
        from={44 * fps}
        name="Narration + captions · 05 · Real-world uses"
        premountFor={fps}
      >
        <Audio
          name="Voiceover · 05 · Real-world uses"
          premountFor={fps}
          src={staticFile('voiceover/05-uses.mp3')}
        />
        <BasicCaptions
          captions={[
            {
              text: 'Zero-knowledge proofs power rollup verification,',
              startMs: 83,
              endMs: 3381,
              timestampMs: 1732,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'privacy-preserving identity,',
              startMs: 3750,
              endMs: 5238,
              timestampMs: 4494,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'and applications that validate sensitive data',
              startMs: 5464,
              endMs: 8000,
              timestampMs: 6732,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'without revealing it.',
              startMs: 8274,
              endMs: 9226,
              timestampMs: 8750,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'Not every zero-knowledge application',
              startMs: 9619,
              endMs: 11560,
              timestampMs: 10590,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'is private by default.',
              startMs: 11869,
              endMs: 13190,
              timestampMs: 12530,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
          combineTokensWithinMilliseconds={0}
          name="Captions · 05 · Real-world uses"
          premountFor={fps}
          style={{
            bottom: 88,
            left: 250,
            position: 'absolute',
            scale: 0.58,
            transformOrigin: 'center bottom',
            zIndex: 20,
          }}
          width={1420}
        />
      </Sequence>

      <Sequence
        durationInFrames={8 * fps}
        from={58 * fps}
        name="Narration + captions · 06 · Takeaway"
        premountFor={fps}
      >
        <Audio
          name="Voiceover · 06 · Takeaway"
          premountFor={fps}
          src={staticFile('voiceover/06-outro.mp3')}
        />
        <BasicCaptions
          captions={[
            {
              text: 'The key idea?',
              startMs: 96,
              endMs: 781,
              timestampMs: 438,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'Prove correctness.',
              startMs: 1166,
              endMs: 2308,
              timestampMs: 1737,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'Reveal nothing else —',
              startMs: 2704,
              endMs: 4147,
              timestampMs: 3426,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'beyond what the statement',
              startMs: 4351,
              endMs: 5457,
              timestampMs: 4904,
              confidence: null,
              pageBreakAfter: true,
            },
            {
              text: 'and public inputs disclose.',
              startMs: 5577,
              endMs: 7308,
              timestampMs: 6442,
              confidence: null,
              pageBreakAfter: true,
            },
          ]}
          combineTokensWithinMilliseconds={0}
          name="Captions · 06 · Takeaway"
          premountFor={fps}
          style={{
            bottom: 88,
            left: 250,
            position: 'absolute',
            scale: 0.58,
            transformOrigin: 'center bottom',
            zIndex: 20,
          }}
          width={1420}
        />
      </Sequence>

      <Audio
        durationInFrames={66 * fps}
        name="Background music · Sonor #2 — Eugenio Mininni"
        premountFor={fps}
        src={staticFile('sonor-2-eugenio-mininni.mp3')}
        volume={(frame) =>
          interpolate(
            frame,
            [0, 1.5 * fps, 63 * fps, 66 * fps - 1],
            [0, 0.055, 0.055, 0],
            clamp,
          )
        }
      />
    </AbsoluteFill>
  );
};
