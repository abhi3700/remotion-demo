import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  ChapterHeading,
  Chip,
  enter,
  GlassPanel,
  MiniCheck,
  SceneShell,
  Text,
} from '../components';
import {clamp, COLORS, fontFamily} from '../theme';

export const CIRCUIT_DURATION = 378;

const Constraint: React.FC<{label: string; delay: number}> = ({label, delay}) => {
  const frame = useCurrentFrame();
  const show = enter(frame, delay, 22);

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        gap: 14,
        opacity: show,
        translate: `${(1 - show) * -18}px 0`,
      }}
    >
      <MiniCheck />
      <Text color={COLORS.muted} size={18} weight={500}>
        {label}
      </Text>
    </div>
  );
};

type FlowPoint = {x: number; y: number};

const pointOnPolyline = (points: FlowPoint[], progress: number): FlowPoint => {
  const segments = points.slice(1).map((point, index) => {
    const previous = points[index];
    return Math.hypot(point.x - previous.x, point.y - previous.y);
  });
  const totalLength = segments.reduce((sum, length) => sum + length, 0);
  let remaining = progress * totalLength;

  for (let index = 0; index < segments.length; index++) {
    const segmentLength = segments[index];
    if (remaining <= segmentLength) {
      const start = points[index];
      const end = points[index + 1];
      const ratio = segmentLength === 0 ? 0 : remaining / segmentLength;
      return {
        x: start.x + (end.x - start.x) * ratio,
        y: start.y + (end.y - start.y) * ratio,
      };
    }
    remaining -= segmentLength;
  }

  return points[points.length - 1];
};

const FlowDot: React.FC<{
  color: string;
  opacity: number;
  point: FlowPoint;
}> = ({color, opacity, point}) => (
  <g opacity={opacity}>
    <circle cx={point.x} cy={point.y} fill={color} opacity="0.18" r="14" />
    <circle
      cx={point.x}
      cy={point.y}
      fill={color}
      r="5"
      style={{filter: `drop-shadow(0 0 8px ${color})`}}
    />
  </g>
);

const FlowPath: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const drawPublic = enter(frame, 38, 48);
  const drawPrivate = enter(frame, 48, 48);
  const drawProof = enter(frame, 112, 34);
  const drawVerify = enter(frame, 156, 34);

  const publicPoints = [
    {x: 346, y: 542},
    {x: 440, y: 542},
    {x: 480, y: 582},
    {x: 480, y: 610},
    {x: 540, y: 610},
  ];
  const privatePoints = [
    {x: 346, y: 728},
    {x: 450, y: 728},
    {x: 490, y: 700},
    {x: 540, y: 700},
  ];
  const proofPoints = [
    {x: 1040, y: 680},
    {x: 1195, y: 680},
  ];
  const verifyPoints = [
    {x: 1450, y: 680},
    {x: 1490, y: 680},
    {x: 1534, y: 680},
    {x: 1570, y: 680},
  ];

  const publicProgress =
    frame < 74 ? 0 : ((frame - 74) % (3.2 * fps)) / (3.2 * fps);
  const privateProgress =
    frame < 92 ? 0 : ((frame - 92) % (3.4 * fps)) / (3.4 * fps);
  const proofProgress =
    frame < 138 ? 0 : ((frame - 138) % (2.6 * fps)) / (2.6 * fps);
  const verifyProgress =
    frame < 182 ? 0 : ((frame - 182) % (2.2 * fps)) / (2.2 * fps);

  return (
    <svg
      height="1080"
      style={{inset: 0, pointerEvents: 'none', position: 'absolute'}}
      viewBox="0 0 1920 1080"
      width="1920"
    >
      <defs>
        <marker
          id="circuit-arrow-cyan"
          markerHeight="8"
          markerWidth="8"
          orient="auto"
          refX="7"
          refY="4"
        >
          <path d="M 0 0 L 8 4 L 0 8 Z" fill={COLORS.cyan} />
        </marker>
        <marker
          id="circuit-arrow-violet"
          markerHeight="8"
          markerWidth="8"
          orient="auto"
          refX="7"
          refY="4"
        >
          <path d="M 0 0 L 8 4 L 0 8 Z" fill={COLORS.violet} />
        </marker>
        <marker
          id="circuit-arrow-mint"
          markerHeight="8"
          markerWidth="8"
          orient="auto"
          refX="7"
          refY="4"
        >
          <path d="M 0 0 L 8 4 L 0 8 Z" fill={COLORS.mint} />
        </marker>
        <marker
          id="circuit-arrow-amber"
          markerHeight="8"
          markerWidth="8"
          orient="auto"
          refX="7"
          refY="4"
        >
          <path d="M 0 0 L 8 4 L 0 8 Z" fill={COLORS.amber} />
        </marker>
      </defs>

      <path
        d="M 346 542 H 440 Q 480 542 480 582 V 610 H 540"
        fill="none"
        markerEnd="url(#circuit-arrow-cyan)"
        opacity={drawPublic * 0.9}
        pathLength="1"
        stroke={COLORS.cyan}
        strokeDasharray="1"
        strokeDashoffset={1 - drawPublic}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M 346 728 H 450 Q 490 728 490 700 H 540"
        fill="none"
        markerEnd="url(#circuit-arrow-violet)"
        opacity={drawPrivate * 0.9}
        pathLength="1"
        stroke={COLORS.violet}
        strokeDasharray="1"
        strokeDashoffset={1 - drawPrivate}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M 1040 680 H 1195"
        fill="none"
        markerEnd="url(#circuit-arrow-mint)"
        opacity={drawProof * 0.9}
        pathLength="1"
        stroke={COLORS.mint}
        strokeDasharray="1"
        strokeDashoffset={1 - drawProof}
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M 1450 680 H 1490"
        fill="none"
        markerEnd="url(#circuit-arrow-amber)"
        opacity={drawVerify * 0.9}
        pathLength="1"
        stroke={COLORS.amber}
        strokeDasharray="1"
        strokeDashoffset={1 - drawVerify}
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M 1534 680 H 1570"
        fill="none"
        markerEnd="url(#circuit-arrow-amber)"
        opacity={drawVerify * 0.9}
        pathLength="1"
        stroke={COLORS.amber}
        strokeDasharray="1"
        strokeDashoffset={1 - drawVerify}
        strokeLinecap="round"
        strokeWidth="2"
      />

      <g opacity={enter(frame, 58, 28)}>
        <circle cx="540" cy="610" fill={COLORS.panel} r="7" stroke={COLORS.cyan} />
        <circle cx="540" cy="700" fill={COLORS.panel} r="7" stroke={COLORS.violet} />
        <circle cx="1040" cy="680" fill={COLORS.panel} r="7" stroke={COLORS.mint} />
        <circle cx="1195" cy="680" fill={COLORS.panel} r="7" stroke={COLORS.mint} />
        <circle cx="1450" cy="680" fill={COLORS.panel} r="7" stroke={COLORS.amber} />
      </g>

      <g opacity={drawVerify}>
        <path
          d="M 1512 663 L 1529 680 L 1512 697 L 1495 680 Z"
          fill={`${COLORS.amber}18`}
          stroke={COLORS.amber}
          strokeWidth="2"
        />
        <circle cx="1512" cy="680" fill={COLORS.amber} r="4" />
        <text
          fill={COLORS.amber}
          fontFamily={fontFamily}
          fontSize="14"
          fontWeight="700"
          letterSpacing="2"
          textAnchor="middle"
          x="1512"
          y="646"
        >
          VERIFY
        </text>
      </g>

      <FlowDot
        color={COLORS.cyan}
        opacity={frame < 74 ? 0 : drawPublic}
        point={pointOnPolyline(publicPoints, publicProgress)}
      />
      <FlowDot
        color={COLORS.violet}
        opacity={frame < 92 ? 0 : drawPrivate}
        point={pointOnPolyline(privatePoints, privateProgress)}
      />
      <FlowDot
        color={COLORS.mint}
        opacity={frame < 138 ? 0 : drawProof}
        point={pointOnPolyline(proofPoints, proofProgress)}
      />
      <FlowDot
        color={COLORS.amber}
        opacity={frame < 182 ? 0 : drawVerify}
        point={pointOnPolyline(verifyPoints, verifyProgress)}
      />
    </svg>
  );
};

export const CircuitScene: React.FC = () => {
  const frame = useCurrentFrame();
  const proof = enter(frame, 130, 30);
  const verified = enter(frame, 168, 30);
  const pulse = interpolate(Math.sin(frame / 11), [-1, 1], [0.35, 1]);

  return (
    <SceneShell
      accent={COLORS.cyan}
      chapter={4}
      label="Inside the circuit"
      sceneDuration={CIRCUIT_DURATION}
    >
      <div style={{left: 115, position: 'absolute', top: 166}}>
        <ChapterHeading
          eyebrow="From witness to proof"
          subtitle="The prover satisfies the circuit with private and public inputs. The verifier receives only the proof and public data."
          title={
            <>
              Compute privately. <span style={{color: COLORS.cyan}}>Verify publicly.</span>
            </>
          }
        />
      </div>

      <FlowPath />

      <div style={{left: 118, position: 'absolute', top: 520}}>
        <Chip>Public statement</Chip>
      </div>
      <div style={{left: 118, position: 'absolute', top: 705}}>
        <Chip color={COLORS.violet}>Private witness</Chip>
      </div>

      <GlassPanel
        color={COLORS.cyan}
        style={{
          height: 355,
          left: 540,
          opacity: enter(frame, 58, 34),
          position: 'absolute',
          top: 500,
          translate: `0 ${(1 - enter(frame, 58, 34)) * 38}px`,
          width: 500,
        }}
      >
        <div style={{padding: '36px 40px'}}>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Text color={COLORS.cyan} size={18} weight={700}>
              ZK CIRCUIT
            </Text>
            <div
              style={{
                backgroundColor: COLORS.mint,
                borderRadius: 999,
                boxShadow: `0 0 ${10 + pulse * 18}px ${COLORS.mint}`,
                height: 8,
                width: 8,
              }}
            />
          </div>
          <Text size={39} weight={700} style={{marginTop: 26}}>
            Constraints satisfied
          </Text>
          <div style={{display: 'flex', flexDirection: 'column', gap: 18, marginTop: 34}}>
            <Constraint delay={78} label="Inputs are well formed" />
            <Constraint delay={96} label="Computation is correct" />
            <Constraint delay={114} label="Witness stays hidden" />
          </div>
        </div>
      </GlassPanel>

      <GlassPanel
        color={COLORS.mint}
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: 250,
          justifyContent: 'center',
          left: 1195,
          opacity: proof,
          position: 'absolute',
          scale: 0.94 + proof * 0.06,
          top: 555,
          width: 255,
        }}
      >
        <Text color={COLORS.mint} size={60} weight={500}>
          π
        </Text>
        <Text size={24} weight={700} style={{marginTop: 18}}>
          Compact proof
        </Text>
      </GlassPanel>

      <GlassPanel
        color={COLORS.amber}
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: 15,
          left: 1570,
          opacity: verified,
          padding: '22px 24px',
          position: 'absolute',
          top: 646,
          translate: `${(1 - verified) * 24}px 0`,
        }}
      >
        <MiniCheck color={COLORS.amber} />
        <Text color={COLORS.amber} size={20} weight={700}>
          VALID
        </Text>
      </GlassPanel>

      <Text
        color={COLORS.muted}
        size={18}
        weight={500}
        style={{bottom: 172, left: 1178, letterSpacing: '0.02em', position: 'absolute'}}
      >
        The verifier never receives the witness.
      </Text>
    </SceneShell>
  );
};
