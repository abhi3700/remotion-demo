#!/usr/bin/env bash

set -euo pipefail

zkp_script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
zkp_repo_root="$(cd -- "$zkp_script_dir/.." && pwd)"
zkp_local_python="$zkp_repo_root/.voiceover-venv/bin/python"

if [ -n "${EDGE_TTS_PYTHON:-}" ]; then
  zkp_python="$EDGE_TTS_PYTHON"
elif [ -x "$zkp_local_python" ]; then
  zkp_python="$zkp_local_python"
else
  zkp_python="python3"
fi

zkp_output_dir="$zkp_repo_root/public/voiceover"
zkp_temp_dir="/tmp/zkp-remotion-neural-voiceover"

if ! "$zkp_python" -c 'import edge_tts' >/dev/null 2>&1; then
  printf 'edge-tts was not found. Install edge-tts or set EDGE_TTS_PYTHON.\n' >&2
  exit 1
fi

mkdir -p "$zkp_output_dir" "$zkp_temp_dir"

"$zkp_python" "$zkp_script_dir/generate-voiceover.py"

for clip_name in \
  01-intro \
  02-exchange \
  03-components \
  04-circuit \
  05-uses \
  06-outro
do
  ffmpeg \
    -y \
    -loglevel error \
    -i "$zkp_temp_dir/$clip_name-raw.mp3" \
    -af "loudnorm=I=-18:LRA=7:TP=-1.5" \
    -codec:a libmp3lame \
    -b:a 192k \
    "$zkp_output_dir/$clip_name.mp3"
done

printf 'Generated neural voiceover and caption timing data.\n'
