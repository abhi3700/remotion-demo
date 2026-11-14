import {Easing} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Manrope';

export const {fontFamily} = loadFont('normal', {
  weights: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const COLORS = {
  ink: '#F7F8FF',
  muted: '#9BA9C6',
  dim: '#65718F',
  cyan: '#66E4FF',
  violet: '#A78BFA',
  mint: '#6FF7C5',
  amber: '#FFC982',
  canvas: '#050714',
  panel: '#0C1226',
} as const;

export const SMOOTH = Easing.bezier(0.16, 1, 0.3, 1);

export const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};
