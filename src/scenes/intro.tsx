import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Chip, enter, Kicker, SceneShell, Text} from '../components';
import {clamp, COLORS, SMOOTH} from '../theme';

export const INTRO_DURATION = 288;

const ProofOrb: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = enter(frame, 18, 38);
  const breathe = interpolate(
    Math.sin((frame / fps) * Math.PI),
    [-1, 1],
    [0.98, 1.025],
  );
  const rotateA = interpolate(frame, [0, INTRO_DURATION], [-18, 24], clamp);
  const rotateB = interpolate(frame, [0, INTRO_DURATION], [28, -14], clamp);

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: 500,
        justifyContent: 'center',
        opacity: reveal,
        position: 'relative',
        scale: reveal * breathe,
        width: 500,
      }}
    >
      <div
        style={{
          background: `radial-gradient(circle, ${COLORS.cyan}22, transparent 66%)`,
          filter: 'blur(16px)',
          inset: -90,
          position: 'absolute',
        }}
      />
      <svg height="500" viewBox="0 0 500 500" width="500">
        <circle
          cx="250"
          cy="250"
          fill="none"
          opacity="0.14"
          r="212"
          stroke={COLORS.cyan}
          strokeWidth="1"
        />
        <g style={{transform: `rotate(${rotateA}deg)`, transformOrigin: '250px 250px'}}>
          <circle
            cx="250"
            cy="250"
            fill="none"
            r="184"
            stroke={COLORS.cyan}
            strokeDasharray="120 26 12 34"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </g>
        <g style={{transform: `rotate(${rotateB}deg)`, transformOrigin: '250px 250px'}}>
          <circle
            cx="250"
            cy="250"
            fill="none"
            opacity="0.85"
            r="145"
            stroke={COLORS.violet}
            strokeDasharray="56 18 8 28"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </g>
        <circle
          cx="250"
          cy="250"
          fill="rgba(9,18,40,0.82)"
          r="105"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
        <path
          d="M220 252 L242 274 L285 226"
          fill="none"
          stroke={COLORS.mint}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="9"
        />
      </svg>
      <div
        style={{
          bottom: 34,
          color: COLORS.muted,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: '0.18em',
          position: 'absolute',
          textTransform: 'uppercase',
        }}
      >
        Proof verified
      </div>
    </div>
  );
};

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const titleA = enter(frame, 8, 30);
  const titleB = enter(frame, 18, 34);
  const copy = enter(frame, 38, 28);
  const chips = enter(frame, 62, 28);

  return (
    <SceneShell
      accent={COLORS.cyan}
      chapter={1}
      label="The idea"
      sceneDuration={INTRO_DURATION}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          inset: '136px 105px 104px 118px',
          justifyContent: 'space-between',
          position: 'absolute',
        }}
      >
        <div style={{width: 1040}}>
          <div
            style={{
              opacity: enter(frame, 0, 24),
              translate: `0 ${(1 - enter(frame, 0, 24)) * 18}px`,
            }}
          >
            <Kicker>Zero-knowledge proofs</Kicker>
          </div>
          <Text
            size={102}
            weight={700}
            style={{
              marginTop: 38,
              opacity: titleA,
              translate: `0 ${(1 - titleA) * 46}px`,
            }}
          >
            Prove you know
          </Text>
          <Text
            size={102}
            weight={700}
            style={{
              color: COLORS.cyan,
              marginTop: 4,
              opacity: titleB,
              textShadow: `0 0 42px ${COLORS.cyan}32`,
              translate: `0 ${(1 - titleB) * 46}px`,
            }}
          >
            a secret.
          </Text>
          <Text
            color={COLORS.muted}
            size={36}
            weight={400}
            style={{
              letterSpacing: '-0.025em',
              lineHeight: 1.42,
              marginTop: 36,
              opacity: copy,
              translate: `0 ${(1 - copy) * 24}px`,
            }}
          >
            Without revealing the secret itself.
          </Text>
          <div
            style={{
              display: 'flex',
              gap: 14,
              marginTop: 52,
              opacity: chips,
              translate: `0 ${(1 - chips) * 20}px`,
            }}
          >
            <Chip>Prove</Chip>
            <Chip color={COLORS.violet}>Protect</Chip>
            <Chip color={COLORS.mint}>Verify</Chip>
          </div>
        </div>
        <div
          style={{
            opacity: interpolate(frame, [18, 62], [0, 1], {
              ...clamp,
              easing: SMOOTH,
            }),
            translate: `${(1 - enter(frame, 18, 38)) * 60}px 0`,
          }}
        >
          <ProofOrb />
        </div>
      </div>
    </SceneShell>
  );
};
