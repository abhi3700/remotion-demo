import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Chip, enter, SceneShell, Text} from '../components';
import {clamp, COLORS} from '../theme';

export const OUTRO_DURATION = 240;

const Halo: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = enter(frame, 0, 46);
  const rotateA = interpolate(frame, [0, OUTRO_DURATION], [-24, 18], clamp);
  const rotateB = interpolate(frame, [0, OUTRO_DURATION], [18, -26], clamp);

  return (
    <div
      style={{
        height: 760,
        left: 580,
        opacity: reveal,
        position: 'absolute',
        top: 140,
        width: 760,
      }}
    >
      <div
        style={{
          background: `radial-gradient(circle, ${COLORS.violet}24, ${COLORS.cyan}10 34%, transparent 70%)`,
          filter: 'blur(14px)',
          inset: -120,
          position: 'absolute',
        }}
      />
      <svg height="760" viewBox="0 0 760 760" width="760">
        <g style={{transform: `rotate(${rotateA}deg)`, transformOrigin: '380px 380px'}}>
          <circle
            cx="380"
            cy="380"
            fill="none"
            opacity="0.5"
            r="320"
            stroke={COLORS.cyan}
            strokeDasharray="150 46 10 72"
            strokeWidth="2"
          />
        </g>
        <g style={{transform: `rotate(${rotateB}deg)`, transformOrigin: '380px 380px'}}>
          <circle
            cx="380"
            cy="380"
            fill="none"
            opacity="0.42"
            r="270"
            stroke={COLORS.violet}
            strokeDasharray="92 28 18 66"
            strokeWidth="2"
          />
        </g>
        <circle
          cx="380"
          cy="380"
          fill="none"
          opacity="0.12"
          r="218"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const lineA = enter(frame, 4, 30);
  const lineB = enter(frame, 16, 34);
  const copy = enter(frame, 38, 26);
  const tag = enter(frame, 56, 26);

  return (
    <SceneShell
      accent={COLORS.mint}
      chapter={6}
      label="Takeaway"
      sceneDuration={OUTRO_DURATION}
    >
      <Halo />
      <div
        style={{
          left: 180,
          position: 'absolute',
          right: 180,
          textAlign: 'center',
          top: 285,
        }}
      >
        <Text
          size={104}
          weight={700}
          style={{
            opacity: lineA,
            translate: `0 ${(1 - lineA) * 42}px`,
          }}
        >
          Prove <span style={{color: COLORS.cyan}}>correctness.</span>
        </Text>
        <Text
          size={94}
          weight={700}
          style={{
            marginTop: 12,
            opacity: lineB,
            translate: `0 ${(1 - lineB) * 42}px`,
          }}
        >
          Reveal <span style={{color: COLORS.violet}}>nothing else.</span>
        </Text>
        <Text
          color={COLORS.muted}
          size={24}
          weight={400}
          style={{
            letterSpacing: '-0.01em',
            lineHeight: 1.45,
            marginTop: 40,
            opacity: copy,
            translate: `0 ${(1 - copy) * 22}px`,
          }}
        >
          Beyond what the statement and public inputs already disclose.
        </Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 58,
            opacity: tag,
            translate: `0 ${(1 - tag) * 22}px`,
          }}
        >
          <Chip color={COLORS.mint}>Zero-knowledge proofs</Chip>
        </div>
      </div>
    </SceneShell>
  );
};
