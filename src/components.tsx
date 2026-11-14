import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {clamp, COLORS, fontFamily, SMOOTH} from './theme';

export const enter = (frame: number, start = 0, duration = 24) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: SMOOTH,
  });

export const Text: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  weight?: 400 | 500 | 600 | 700 | 800;
  style?: React.CSSProperties;
}> = ({children, size = 36, color = COLORS.ink, weight = 600, style}) => (
  <div
    style={{
      color,
      fontFamily,
      fontSize: size,
      fontWeight: weight,
      letterSpacing: '-0.03em',
      lineHeight: 1.08,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Kicker: React.FC<{
  children: React.ReactNode;
  color?: string;
}> = ({children, color = COLORS.cyan}) => (
  <div
    style={{
      alignItems: 'center',
      color,
      display: 'flex',
      fontFamily,
      fontSize: 18,
      fontWeight: 700,
      gap: 12,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
    }}
  >
    <span
      style={{
        backgroundColor: color,
        borderRadius: 999,
        boxShadow: `0 0 18px ${color}`,
        height: 7,
        width: 7,
      }}
    />
    {children}
  </div>
);

export const Chip: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({children, color = COLORS.cyan, style}) => (
  <div
    style={{
      alignItems: 'center',
      background: `linear-gradient(180deg, ${color}18, ${color}0B)`,
      border: `1px solid ${color}45`,
      borderRadius: 999,
      boxShadow: `inset 0 1px 0 ${color}25`,
      color,
      display: 'inline-flex',
      fontFamily,
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: '0.11em',
      padding: '12px 18px',
      textTransform: 'uppercase',
      ...style,
    }}
  >
    {children}
  </div>
);

export const GlassPanel: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({children, color = COLORS.cyan, style}) => (
  <div
    style={{
      background:
        'linear-gradient(145deg, rgba(17,25,50,0.92), rgba(8,13,29,0.78))',
      border: `1px solid ${color}32`,
      borderRadius: 30,
      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.07), 0 28px 90px rgba(0,0,0,0.28), 0 0 44px ${color}0D`,
      overflow: 'hidden',
      position: 'relative',
      ...style,
    }}
  >
    <div
      style={{
        background: `linear-gradient(90deg, transparent, ${color}99, transparent)`,
        height: 1,
        left: '8%',
        opacity: 0.7,
        position: 'absolute',
        right: '8%',
        top: 0,
      }}
    />
    {children}
  </div>
);

export const ChapterHeading: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  align?: 'left' | 'center';
}> = ({eyebrow, title, subtitle, align = 'left'}) => {
  const frame = useCurrentFrame();
  const a = enter(frame, 4, 22);
  const b = enter(frame, 12, 26);
  const c = enter(frame, 22, 28);

  return (
    <div style={{textAlign: align, width: align === 'center' ? '100%' : 940}}>
      <div
        style={{
          display: 'flex',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
          opacity: a,
          translate: `0 ${(1 - a) * 18}px`,
        }}
      >
        <Kicker>{eyebrow}</Kicker>
      </div>
      <Text
        size={72}
        weight={700}
        style={{
          marginTop: 24,
          opacity: b,
          translate: `0 ${(1 - b) * 32}px`,
        }}
      >
        {title}
      </Text>
      <Text
        size={25}
        color={COLORS.muted}
        weight={400}
        style={{
          letterSpacing: '-0.015em',
          lineHeight: 1.45,
          marginTop: 22,
          opacity: c,
          translate: `0 ${(1 - c) * 22}px`,
        }}
      >
        {subtitle}
      </Text>
    </div>
  );
};

const Mark: React.FC = () => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      height: 32,
      justifyContent: 'center',
      position: 'relative',
      width: 32,
    }}
  >
    <div
      style={{
        border: `1px solid ${COLORS.cyan}95`,
        borderRadius: 9,
        height: 24,
        rotate: '45deg',
        width: 24,
      }}
    />
    <div
      style={{
        backgroundColor: COLORS.cyan,
        borderRadius: 999,
        boxShadow: `0 0 16px ${COLORS.cyan}`,
        height: 6,
        position: 'absolute',
        width: 6,
      }}
    />
  </div>
);

export const SceneShell: React.FC<{
  children: React.ReactNode;
  chapter: number;
  label: string;
  accent?: string;
  sceneDuration: number;
}> = ({children, chapter, label, sceneDuration, accent = COLORS.cyan}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, sceneDuration - 1], [0, 1], clamp);
  const drift = interpolate(frame, [0, sceneDuration], [-80, 80], clamp);
  const orbit = interpolate(frame, [0, sceneDuration], [-4, 4], clamp);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.canvas,
        color: COLORS.ink,
        fontFamily,
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle at 76% 33%, rgba(71,91,201,0.19), transparent 32%), radial-gradient(circle at 19% 79%, rgba(26,208,222,0.09), transparent 27%), linear-gradient(135deg, #070A18 0%, #050714 54%, #07091A 100%)',
        }}
      />
      <div
        style={{
          background: `radial-gradient(circle, ${accent}28 0%, transparent 66%)`,
          filter: 'blur(24px)',
          height: 720,
          opacity: 0.7,
          position: 'absolute',
          right: -160 + drift,
          top: -240,
          width: 720,
        }}
      />
      <div
        style={{
          backgroundImage:
            'linear-gradient(rgba(126,145,190,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(126,145,190,0.055) 1px, transparent 1px)',
          backgroundPosition: `${drift}px ${-drift * 0.25}px`,
          backgroundSize: '76px 76px',
          inset: 0,
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.8) 70%, transparent)',
          opacity: 0.55,
          position: 'absolute',
          rotate: `${orbit * 0.04}deg`,
          scale: 1.04,
        }}
      />
      <div
        style={{
          background:
            'linear-gradient(110deg, transparent 22%, rgba(255,255,255,0.022) 50%, transparent 78%)',
          inset: 0,
          position: 'absolute',
          translate: `${drift * 2}px 0`,
        }}
      />

      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          left: 80,
          position: 'absolute',
          top: 56,
        }}
      >
        <Mark />
        <div
          style={{
            color: COLORS.ink,
            fontFamily,
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: '0.16em',
            marginLeft: 14,
          }}
        >
          ZERO KNOWLEDGE
        </div>
      </div>

      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: 18,
          position: 'absolute',
          right: 80,
          top: 63,
        }}
      >
        <div
          style={{
            color: COLORS.muted,
            fontFamily,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </div>
        <div
          style={{
            color: accent,
            fontFamily,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          {String(chapter).padStart(2, '0')} / 06
        </div>
      </div>

      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.08)',
          height: 1,
          left: 80,
          position: 'absolute',
          right: 80,
          top: 112,
        }}
      >
        <div
          style={{
            background: `linear-gradient(90deg, ${accent}, ${COLORS.violet})`,
            boxShadow: `0 0 14px ${accent}`,
            height: 1,
            scale: `${progress} 1`,
            transformOrigin: 'left center',
            width: '100%',
          }}
        />
      </div>

      {children}

      <div
        style={{
          alignItems: 'center',
          bottom: 48,
          color: COLORS.dim,
          display: 'flex',
          fontFamily,
          fontSize: 14,
          fontWeight: 600,
          justifyContent: 'space-between',
          left: 80,
          letterSpacing: '0.16em',
          position: 'absolute',
          right: 80,
          textTransform: 'uppercase',
        }}
      >
        <span>Cryptography / Privacy / Proofs</span>
        <span style={{color: accent}}>ZK — 001</span>
      </div>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 46%, rgba(0,0,0,0.42) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

export const ArrowLine: React.FC<{
  color?: string;
  delay?: number;
  width?: number;
}> = ({color = COLORS.cyan, delay = 0, width = 300}) => {
  const frame = useCurrentFrame();
  const draw = enter(frame, delay, 32);
  const travel = interpolate(frame, [delay, delay + 110], [0, width - 24], {
    ...clamp,
  });

  return (
    <div style={{height: 44, position: 'relative', width}}>
      <svg height="44" viewBox={`0 0 ${width} 44`} width={width}>
        <path
          d={`M 4 22 L ${width - 24} 22`}
          fill="none"
          opacity="0.8"
          pathLength="1"
          stroke={color}
          strokeDasharray="1"
          strokeDashoffset={1 - draw}
          strokeWidth="2"
        />
        <path
          d={`M ${width - 36} 12 L ${width - 23} 22 L ${width - 36} 32`}
          fill="none"
          opacity={draw}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
      <div
        style={{
          backgroundColor: color,
          borderRadius: 999,
          boxShadow: `0 0 16px 4px ${color}88`,
          height: 7,
          left: 4,
          opacity: draw,
          position: 'absolute',
          top: 19,
          translate: `${travel}px 0`,
          width: 7,
        }}
      />
    </div>
  );
};

export const MiniCheck: React.FC<{color?: string}> = ({color = COLORS.mint}) => (
  <div
    style={{
      alignItems: 'center',
      backgroundColor: `${color}18`,
      border: `1px solid ${color}55`,
      borderRadius: 999,
      color,
      display: 'flex',
      fontFamily,
      fontSize: 15,
      fontWeight: 800,
      height: 30,
      justifyContent: 'center',
      width: 30,
    }}
  >
    ✓
  </div>
);
