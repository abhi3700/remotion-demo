#!/usr/bin/env bash

set -euo pipefail

zkp_repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
zkp_output="$zkp_repo_root/out/zkp-explainer.mp4"

if ! command -v npm >/dev/null 2>&1; then
  printf 'npm was not found. Install Node.js 20 or newer and try again.\n' >&2
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  printf 'ffmpeg was not found. Install ffmpeg and try again.\n' >&2
  exit 1
fi

if [ ! -x "$zkp_repo_root/node_modules/.bin/remotion" ]; then
  printf 'Remotion dependencies were not found. Run npm install and try again.\n' >&2
  exit 1
fi

cd -- "$zkp_repo_root"

printf '[1/2] Generating voiceover and captions...\n'
"$zkp_repo_root/scripts/generate-voiceover.sh"

printf '[2/2] Rendering final video...\n'
npm run render

if [ ! -s "$zkp_output" ]; then
  printf 'Render finished without producing %s.\n' "$zkp_output" >&2
  exit 1
fi

printf 'Final video: %s\n' "$zkp_output"
