# Premium Remotion Explainer Style

## Purpose

Use this guide when creating or polishing a short product or technical explainer in Remotion. Reuse the production method, pacing, and quality bar—not the visual identity of any previous video.

Theme colors are always product- and content-specific. Never copy a palette from another project. Define a fresh semantic palette after understanding the subject, brand, audience, and desired mood.

## Core principles

- Start with the story and narration. Motion should clarify the spoken idea, not compete with it.
- Give each scene one clear communication job.
- Prefer custom typography, shapes, diagrams, and restrained effects over generic stock imagery.
- Keep the result calm, precise, and intentional. “Premium” means strong hierarchy and good timing, not constant movement.
- Make every frame deterministic from Remotion's frame APIs.
- Treat narration, captions, music, diagrams, and visual QA as part of the implementation—not as final polish.

## Before editing

1. Read the brief, script, existing assets, and current project structure.
2. Preserve user changes and unrelated work.
3. Confirm the target aspect ratio, FPS, duration, audience, and delivery platform.
4. Break the script into chapters before building scenes.
5. Start Remotion Studio with `npm run studio -- --no-open` and keep the preview available while working.
6. Do not render the final video unless the user explicitly requests an export. Use Studio and representative stills during iteration.

## Story structure

For a 45–90 second explainer, usually use five to seven chapters:

1. Hook: establish the problem or surprising idea immediately.
2. Context: introduce the people, systems, or objects involved.
3. Building blocks: explain only the concepts required for the main mechanism.
4. Mechanism: show the central process as a complete visual flow.
5. Applications or benefits: make the idea concrete.
6. Caveat: include an important limitation when the topic needs one.
7. Takeaway: end on one memorable sentence.

Do not force this exact count. Merge or split chapters to match the material. A scene should change because the idea changes, not because a timer expired.

## Script and narration

- Write for speech, not for a document. Use short sentences and familiar words.
- Keep one thought per phrase. Break long sentences at natural semantic boundaries.
- Use punctuation to create human pauses: commas for a light pause, full stops for a clear reset, and an em dash only for deliberate emphasis.
- Avoid breathless delivery. Leave roughly 200–500 ms between important phrases and more room before a major reveal.
- Prefer a warm, conversational neural voice over a dramatic announcer voice.
- Test the voice at close to its natural rate before increasing speed. Small rate adjustments are safer than compressing the entire track.
- Generate narration as one clip per chapter. This keeps timing and revisions local.
- Normalize final voice clips to a consistent perceived loudness. A practical starting point is `I=-18`, `LRA=7`, and `TP=-1.5` with FFmpeg loudness normalization.
- Listen to every generated clip. Correct pronunciation, robotic joins, rushed phrases, clipped endings, and missing pauses before timing visuals.
- Keep the narration script and generated audio reproducible in a checked-in script when possible.

## Project structure

Use this structure unless the existing repository has an established alternative:

```text
src/
  index.ts
  root.tsx                 # compositions, dimensions, FPS, total duration
  video.tsx                # master timeline, transitions, audio, captions
  theme.ts                 # typography, easing, and project-specific tokens
  components.tsx           # shared visual and motion primitives
  scenes/
    intro.tsx
    ...
public/
  voiceover/               # chapter audio and caption timing data
  music/                   # licensed background tracks
scripts/
  generate-voiceover.*
```

Register the complete video and every individual scene as compositions. Group scene compositions in a Studio folder so each chapter can be reviewed independently.

Keep scene durations in one shared source of truth where practical. The root composition, master timeline, voiceover offsets, and total duration must agree.

## Visual system

Build a small reusable component system before repeating styles across scenes:

- `SceneShell`: background layers, safe area, chapter marker, and progress treatment.
- `Text`: shared font, weight, line-height, and letter-spacing behavior.
- `ChapterHeading`: eyebrow, title, and supporting copy with staged entrances.
- `Panel`: a restrained surface treatment for grouped information.
- `Chip` or `Badge`: compact labels and state indicators.
- `enter()`: the standard eased reveal helper.

Keep product identity in `theme.ts`. Use semantic roles such as:

- canvas and elevated surface
- primary and muted text
- primary and secondary accent
- success, warning, and error
- border, grid, and ambient glow

Choose the actual values for the current content and product. Check contrast and color meaning; do not inherit literal colors from a previous video.

Typography should carry most of the hierarchy:

- Use one high-quality family with enough weights.
- Use a large, concise scene title and smaller supporting copy.
- Keep body copy short enough to read at playback speed.
- Avoid more than three strong hierarchy levels in one frame.
- Balance line lengths instead of filling the entire width.
- Reserve the lower caption zone; scene text must not collide with subtitles.

Create depth with a few coordinated layers: a base canvas, soft ambient light, a subtle grid or texture, elevated panels, and sparse highlights. Keep blur, glow, borders, and shadows consistent and restrained.

## Motion language

All animation must come from `useCurrentFrame()`, `useVideoConfig()`, `interpolate()`, `spring()`, or other frame-derived logic. Do not use CSS transitions, CSS keyframes, wall-clock timers, or unseeded randomness.

Use seconds through `fps` for timing that should survive frame-rate changes.

Recommended motion ranges at 30 fps:

- Small element entrance: 18–28 frames.
- Major title or panel entrance: 24–40 frames.
- Scene transition: about 0.4–0.7 seconds.
- Entrance translation: usually 18–46 px.
- Entrance scale: usually from 0.94–0.98 to 1.
- Stagger between related elements: usually 6–14 frames.

Use a smooth decelerating easing for most entrances. Elements should arrive quickly enough to feel responsive and settle gently. Use overshoot only when it supports the product personality.

Animate hierarchy in reading order:

1. Context or eyebrow.
2. Main claim.
3. Supporting explanation.
4. Diagram, panel, or evidence.
5. Secondary labels and status details.

Keep ambient motion slower and quieter than explanatory motion. Background drift, grid movement, orbiting marks, shimmer, and pulses should add life without drawing attention away from the narration.

Use one transition family across the video unless the story requires a deliberate exception. A simple directional wipe or soft crossfade is usually enough.

## Diagrams and process animation

Diagrams must be correct before they are decorative.

- Lay out the semantic flow first: input → process → output → verification or result.
- Every line must visibly touch its source and destination, using explicit ports when useful.
- Use arrowheads or another unambiguous directional cue.
- Do not leave decorative line fragments that look like missing connections.
- Route lines around content instead of through labels.
- Give related inputs distinct visual identities, but keep the number of accents limited.
- A moving particle must follow the exact path geometry. Do not approximate a curved or segmented route with unrelated horizontal motion.
- Reveal a path in the same order that the narration explains it.
- Show state change at the destination: accepted, verified, complete, rejected, or another domain-specific result.
- Keep labels readable in a paused final frame; motion cannot be the only explanation.

For any important process, inspect a still after all lines have appeared. The completed diagram should communicate the full relationship without needing to scrub the timeline.

## Captions

- Captions are required for narrated explainers unless the user says otherwise.
- Derive timing from actual speech word boundaries or a reliable transcription. Do not estimate timing only from the written script.
- Split captions into short phrase-level pages that match natural pauses.
- Keep each page to one thought, normally one or two balanced lines.
- Use the exact spoken wording unless accessibility or platform constraints require a deliberate edit.
- Place captions in a consistent lower safe area with enough margin for platform controls.
- Use high contrast and a restrained backing surface or shadow so captions remain readable over every scene.
- Keep the caption treatment visually neutral enough to work across scenes.
- Check that scene content, logos, and diagrams never sit behind the caption block.

Group each caption track with its matching narration sequence. Name both tracks by chapter so timing problems are easy to locate in Studio.

## Background music and sound mix

- Choose music that supports the subject and product personality. Do not reuse a track merely because it worked in another project.
- Prefer instrumental tracks without vocals for narrated explainers.
- Avoid busy percussion, strong melodic hooks, or dramatic rises that compete with speech.
- Use one coherent track for a short explainer unless a story change clearly benefits from another cue.
- Keep narration dominant. A practical Remotion starting range for a mastered music file is roughly `0.04–0.07`, then adjust by listening.
- Fade music in for about 1–2 seconds and out for about 2–3 seconds.
- Lower or duck the music further under quiet narration or dense technical language.
- Preview with headphones and ordinary laptop speakers.
- Record the source, creator, and license in the README or asset manifest.

## Timeline construction

- Use `TransitionSeries` for the visual chapter sequence.
- Use named `Sequence` blocks for narration and captions.
- Premount scenes and media when appropriate to prevent first-frame loading issues.
- Name scenes and audio tracks for humans, not only for code.
- Align key visual reveals to the relevant spoken phrase, not merely to the start of the scene.
- Let the visual lead or follow the voice by a few frames when that improves comprehension, but keep the relationship obvious.
- Leave a small amount of breathing room at the start and end of the complete video.

## Quality assurance

Run source checks after meaningful edits:

```bash
npx tsc --noEmit
git diff --check
```

Use Studio for timing and audio review. Render representative stills for visual review:

- first settled frame of each scene
- main information frame
- completed diagram or final state
- midpoint of every transition
- frame with the longest caption
- final frame

Check every still for hierarchy, alignment, clipping, readability, caption collisions, accidental empty space, and incomplete connections.

Then watch the composition from beginning to end at normal speed and verify:

- narration sounds human and has the required pauses
- visuals support the phrase currently being spoken
- no scene feels rushed or lingers without purpose
- captions match the audio and remain readable
- music is present but never masks the voice
- transitions do not cut off narration or important animation
- all diagram paths reach their intended destinations
- the ending has enough time to land

Only after those checks, render the final MP4 when explicitly requested:

```bash
npm run render
```

## Definition of done

A video is ready when:

- the story is understandable without prior subject knowledge
- every scene has one clear purpose
- the narration is natural and well paced
- captions are synchronized and unobstructed
- music is licensed, appropriate, and mixed below the voice
- motion is restrained, deterministic, and aligned with meaning
- diagrams are complete and directionally clear
- individual scene compositions and the master composition agree on timing
- TypeScript and diff checks pass
- representative stills and one full-speed playback have been reviewed
- product-specific theme choices were made for this project rather than copied from another one
