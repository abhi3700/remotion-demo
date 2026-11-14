import React from 'react';
import {useCurrentFrame} from 'remotion';
import {
  ChapterHeading,
  enter,
  GlassPanel,
  SceneShell,
  Text,
} from '../components';
import {COLORS} from '../theme';

export const USES_DURATION = 438;

const uses = [
  {
    color: COLORS.cyan,
    eyebrow: 'Scale',
    glyph: '⬡',
    index: '01',
    text: 'Verify batches of transactions with a compact proof.',
    title: 'zk-Rollups',
  },
  {
    color: COLORS.violet,
    eyebrow: 'Identity',
    glyph: '◉',
    index: '02',
    text: 'Prove eligibility without disclosing every personal detail.',
    title: 'Private credentials',
  },
  {
    color: COLORS.mint,
    eyebrow: 'Data',
    glyph: '⌁',
    index: '03',
    text: 'Validate sensitive inputs while limiting what is exposed.',
    title: 'Selective disclosure',
  },
] as const;

const UseCard: React.FC<{
  color: string;
  delay: number;
  eyebrow: string;
  glyph: string;
  index: string;
  text: string;
  title: string;
}> = ({color, delay, eyebrow, glyph, index, text, title}) => {
  const frame = useCurrentFrame();
  const show = enter(frame, delay, 30);

  return (
    <GlassPanel
      color={color}
      style={{
        height: 390,
        opacity: show,
        scale: 0.95 + show * 0.05,
        translate: `0 ${(1 - show) * 42}px`,
        width: 520,
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '34px 36px 0',
        }}
      >
        <Text color={color} size={17} weight={700} style={{letterSpacing: '0.14em'}}>
          {index} / {eyebrow}
        </Text>
        <div
          style={{
            alignItems: 'center',
            background: `radial-gradient(circle, ${color}28, ${color}09)`,
            border: `1px solid ${color}44`,
            borderRadius: 22,
            color,
            display: 'flex',
            fontSize: 39,
            height: 78,
            justifyContent: 'center',
            width: 78,
          }}
        >
          {glyph}
        </div>
      </div>
      <div style={{padding: '42px 36px 34px'}}>
        <Text size={36} weight={700}>
          {title}
        </Text>
        <Text
          color={COLORS.muted}
          size={22}
          weight={400}
          style={{letterSpacing: '-0.015em', lineHeight: 1.45, marginTop: 20}}
        >
          {text}
        </Text>
      </div>
      <div
        style={{
          background: `radial-gradient(circle, ${color}22, transparent 68%)`,
          bottom: -140,
          height: 300,
          position: 'absolute',
          right: -80,
          width: 300,
        }}
      />
    </GlassPanel>
  );
};

export const UsesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const note = enter(frame, 106, 28);

  return (
    <SceneShell
      accent={COLORS.violet}
      chapter={5}
      label="Real-world uses"
      sceneDuration={USES_DURATION}
    >
      <div style={{left: 115, position: 'absolute', top: 166}}>
        <ChapterHeading
          eyebrow="Where ZK creates leverage"
          subtitle="The same primitive can reduce verification cost or reduce disclosure—depending on how the system is designed."
          title={
            <>
              Verify more. <span style={{color: COLORS.violet}}>Expose less.</span>
            </>
          }
        />
      </div>

      <div
        style={{
          display: 'flex',
          gap: 26,
          left: 115,
          position: 'absolute',
          top: 498,
        }}
      >
        {uses.map((item, index) => (
          <UseCard delay={38 + index * 17} key={item.index} {...item} />
        ))}
      </div>

      <div
        style={{
          alignItems: 'center',
          bottom: 172,
          display: 'flex',
          gap: 14,
          left: 118,
          opacity: note,
          position: 'absolute',
          translate: `0 ${(1 - note) * 18}px`,
        }}
      >
        <span style={{color: COLORS.amber, fontSize: 19}}>✦</span>
        <Text color={COLORS.muted} size={17} weight={500}>
          Privacy is a system property—not an automatic result of using ZK.
        </Text>
      </div>
    </SceneShell>
  );
};
