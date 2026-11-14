import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {
  ChapterHeading,
  enter,
  GlassPanel,
  SceneShell,
  Text,
} from '../components';
import {clamp, COLORS} from '../theme';

export const INGREDIENTS_DURATION = 348;

const items = [
  {
    code: '01',
    color: COLORS.cyan,
    detail: 'The public claim to prove',
    glyph: '≋',
    title: 'Statement',
  },
  {
    code: '02',
    color: COLORS.violet,
    detail: 'The private information',
    glyph: '◇',
    title: 'Witness',
  },
  {
    code: '03',
    color: COLORS.mint,
    detail: 'Compact cryptographic evidence',
    glyph: 'π',
    title: 'Proof',
  },
  {
    code: '04',
    color: COLORS.amber,
    detail: 'The algorithm that checks it',
    glyph: '✓',
    title: 'Verifier',
  },
] as const;

const ComponentCard: React.FC<{
  code: string;
  color: string;
  detail: string;
  glyph: string;
  index: number;
  title: string;
}> = ({code, color, detail, glyph, index, title}) => {
  const frame = useCurrentFrame();
  const show = enter(frame, 42 + index * 15, 30);
  const sweep = interpolate(
    frame,
    [72 + index * 14, 152 + index * 14],
    [-180, 460],
    clamp,
  );

  return (
    <GlassPanel
      color={color}
      style={{
        height: 338,
        opacity: show,
        scale: 0.95 + show * 0.05,
        translate: `0 ${(1 - show) * 46}px`,
        width: 390,
      }}
    >
      <div
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          height: 520,
          left: sweep,
          position: 'absolute',
          rotate: '18deg',
          top: -110,
          width: 100,
        }}
      />
      <div style={{padding: '34px 34px 30px'}}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Text
            color={color}
            size={17}
            weight={700}
            style={{letterSpacing: '0.14em'}}
          >
            {code}
          </Text>
          <div
            style={{
              alignItems: 'center',
              backgroundColor: `${color}12`,
              border: `1px solid ${color}40`,
              borderRadius: 18,
              color,
              display: 'flex',
              fontSize: 34,
              fontWeight: 600,
              height: 70,
              justifyContent: 'center',
              width: 70,
            }}
          >
            {glyph}
          </div>
        </div>
        <Text size={36} weight={700} style={{marginTop: 50}}>
          {title}
        </Text>
        <Text
          color={COLORS.muted}
          size={21}
          weight={400}
          style={{letterSpacing: '-0.015em', lineHeight: 1.4, marginTop: 18}}
        >
          {detail}
        </Text>
      </div>
      <div
        style={{
          background: `linear-gradient(90deg, ${color}, transparent)`,
          bottom: 0,
          height: 3,
          left: 0,
          opacity: 0.7,
          width: '72%',
        }}
      />
    </GlassPanel>
  );
};

export const IngredientsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const rail = enter(frame, 48, 70);

  return (
    <SceneShell
      accent={COLORS.mint}
      chapter={3}
      label="Core components"
      sceneDuration={INGREDIENTS_DURATION}
    >
      <div style={{left: 115, position: 'absolute', top: 166}}>
        <ChapterHeading
          eyebrow="The anatomy of a proof"
          subtitle="Four roles turn a private fact into a result anyone can verify."
          title={
            <>
              Four pieces. <span style={{color: COLORS.mint}}>One trusted result.</span>
            </>
          }
        />
      </div>

      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.08)',
          height: 1,
          left: 160,
          position: 'absolute',
          right: 160,
          top: 530,
        }}
      >
        <div
          style={{
            background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.violet}, ${COLORS.mint}, ${COLORS.amber})`,
            boxShadow: `0 0 18px ${COLORS.cyan}66`,
            height: 1,
            scale: `${rail} 1`,
            transformOrigin: 'left center',
            width: '100%',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          gap: 22,
          left: 115,
          position: 'absolute',
          top: 550,
        }}
      >
        {items.map((item, index) => (
          <ComponentCard index={index} key={item.code} {...item} />
        ))}
      </div>
    </SceneShell>
  );
};
