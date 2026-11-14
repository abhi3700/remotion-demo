import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {
  ArrowLine,
  ChapterHeading,
  Chip,
  enter,
  GlassPanel,
  MiniCheck,
  SceneShell,
  Text,
} from '../components';
import {clamp, COLORS} from '../theme';

export const EXCHANGE_DURATION = 378;

const Person: React.FC<{
  name: string;
  role: string;
  color: string;
  letter: string;
  delay: number;
}> = ({name, role, color, letter, delay}) => {
  const frame = useCurrentFrame();
  const show = enter(frame, delay, 30);

  return (
    <GlassPanel
      color={color}
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: 360,
        justifyContent: 'center',
        opacity: show,
        scale: 0.94 + show * 0.06,
        translate: `0 ${(1 - show) * 38}px`,
        width: 330,
      }}
    >
      <div
        style={{
          alignItems: 'center',
          background: `radial-gradient(circle at 35% 25%, ${color}36, ${color}0D)`,
          border: `1px solid ${color}70`,
          borderRadius: 999,
          boxShadow: `0 0 46px ${color}20`,
          color,
          display: 'flex',
          fontSize: 52,
          fontWeight: 700,
          height: 130,
          justifyContent: 'center',
          width: 130,
        }}
      >
        {letter}
      </div>
      <Text size={35} weight={700} style={{marginTop: 26}}>
        {name}
      </Text>
      <Text
        color={color}
        size={18}
        weight={700}
        style={{letterSpacing: '0.14em', marginTop: 10, textTransform: 'uppercase'}}
      >
        {role}
      </Text>
    </GlassPanel>
  );
};

export const ExchangeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const verified = enter(frame, 116, 34);
  const secret = enter(frame, 145, 32);
  const shimmer = interpolate(frame, [70, 210], [-180, 520], clamp);

  return (
    <SceneShell
      accent={COLORS.violet}
      chapter={2}
      label="Prover + verifier"
      sceneDuration={EXCHANGE_DURATION}
    >
      <div style={{left: 115, position: 'absolute', top: 168}}>
        <ChapterHeading
          eyebrow="A private exchange"
          subtitle="Alice proves a claim. Bob checks the proof. The private witness never leaves Alice."
          title={
            <>
              Trust the claim, <span style={{color: COLORS.violet}}>not the secret.</span>
            </>
          }
        />
      </div>

      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: 34,
          left: 102,
          position: 'absolute',
          right: 102,
          top: 492,
        }}
      >
        <Person
          color={COLORS.cyan}
          delay={30}
          letter="A"
          name="Alice"
          role="Prover"
        />

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            height: 290,
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div style={{opacity: enter(frame, 52, 24)}}>
            <Chip color={COLORS.violet}>Proof packet · π</Chip>
          </div>
          <div style={{marginTop: 22}}>
            <ArrowLine color={COLORS.violet} delay={54} width={460} />
          </div>
          <div
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)',
              height: 72,
              left: shimmer,
              opacity: 0.6,
              position: 'absolute',
              rotate: '-18deg',
              top: 60,
              width: 70,
            }}
          />
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: 12,
              marginTop: 24,
              opacity: verified,
              translate: `0 ${(1 - verified) * 18}px`,
            }}
          >
            <MiniCheck />
            <Text color={COLORS.mint} size={22} weight={700}>
              Claim verified
            </Text>
          </div>
        </div>

        <Person
          color={COLORS.violet}
          delay={72}
          letter="B"
          name="Bob"
          role="Verifier"
        />
      </div>

      <GlassPanel
        color={COLORS.cyan}
        style={{
          alignItems: 'center',
          bottom: 174,
          display: 'flex',
          gap: 18,
          left: 462,
          opacity: secret,
          padding: '18px 26px',
          position: 'absolute',
          translate: `0 ${(1 - secret) * 22}px`,
        }}
      >
        <div style={{color: COLORS.cyan, fontSize: 24}}>◈</div>
        <Text size={18} weight={700} style={{letterSpacing: '0.08em'}}>
          SECRET STAYS LOCAL
        </Text>
        <Text color={COLORS.muted} size={18} weight={400}>
          Only the proof crosses the boundary.
        </Text>
      </GlassPanel>
    </SceneShell>
  );
};
