# Image & Scroll-Sequence Guide

Your portraits are now live across the site. Everything is controlled from **`src/data/media.ts`**,
and the files live in **`public/photos/`**, **`public/sequences/`** and **`public/media/`**.

## Where each image is used

| File (public/photos/) | Size | Scene on the site |
|---|---|---|
| `shift-blue.webp` → `shift-red.webp` | 16:9 | **Hero (desktop)**: full-screen portrait that opens in blue, out of focus, and pulls focus into red |
| `hero-mobile-blue.webp` → `hero-mobile.webp` | 9:16 | **Hero (phones)**: same focus pull, vertical crop |
| `hero-blue.webp` → `hero-red.webp` | 4:5 | **Red shift**: blue-to-red wipe that opens the Security chapter |
| `work.webp` | 3:2 | **About**: building (opens up on scroll) |
| `lead.webp` | 3:2 | **About**: leading (opens up on scroll) |
| `contact.webp` | 4:5 | **Closing call to action**: portrait on the right, words on the left (same look as Red shift) |
| `public/og-image.jpg` | 1200×630 | Link previews (LinkedIn, WhatsApp, X) |

**The turn (full screen):**
- Desktop / landscape: `public/sequences/turn-wide/0001.webp` … `0076.webp` (1280×720, 16:9) — 76 frames from the landscape Google Flow video, scrubbed by scroll and dissolved into the black page on every edge.
- Phones / portrait screens: `public/sequences/turn/0001.webp` … `0064.webp` (720×900, 4:5) — the earlier portrait turn, because a 16:9 crop on a 390 px-wide screen would cut the head off. These frames also feed the loader monogram.

## Smoke videos (`public/media/`)

| File | Size | Used for |
|---|---|---|
| `smoke-red.webm` / `smoke-red.mp4` | 1280×720, 4.3 s seamless loop, ~0.1 MB / ~0.9 MB | Red shift (red side), closing call to action |
| `smoke-blue.webm` / `smoke-blue.mp4` | same, ~0.1 MB / ~0.7 MB | Loader, Red shift (blue side) |
| `smoke-red.webp` / `smoke-blue.webp` | 1280×720 | Poster frame **and** the reduced-motion image (made from your smoke-red.png / smoke-blue.png) |

All muted, looping, and only playing while on screen. The photo sits on top (blend: lighten), so its black background lets the moving haze show through; on phones the haze is masked away from the face.

How they were made (from the Flow video "Smoke Video Red and Blue"):
1. Cropped to 992×558 from the top-right (x 288–1280, y 0–558) so the ✦ watermark (y ≥ 576) is gone, then scaled to 720p.
2. Kept only the red part (frames 1–76; the Flow clip morphs to blue after ~3.3 s), crossfaded its last second into its first second for a seamless loop, then slowed it 2× with motion interpolation (calmer drift, 4.3 s loop).
3. **Blue = recoloured red, frame by frame.** The exact red→blue colour mapping was measured from your two stills (smoke-red.png → smoke-blue.png line up pixel-for-pixel), then applied to every red frame. Same shape and motion; average difference vs your smoke-blue.png: 0.5 / 255.
4. Encoded: WebM (VP9, CRF 20) and MP4 (H.264, CRF 14, faststart), no audio. Quality ~53–55 dB PSNR (visually lossless); the smooth haze compresses well, so the files are smaller than the 1–2 MB budget.

## Rising haze (the background on every screen)

Not a video: a WebGL shader (`src/components/HazeCanvas.tsx`) fed with the real haze from your stills (`src/assets/haze/`):
- `haze-detail.png` — the grain and soft cloud structure cut from the glowing area of smoke-red.png (brightness divided out, made seamlessly tileable).
- `haze-ramp.png` — row 1: the exact red of smoke-red.png for every brightness level; row 2: the exact blue smoke-blue.png uses for the same level.
- `haze-still-blue.webp` — a still frame, shown if WebGL isn't available.

To make the haze from a different still: replace smoke-red.png / smoke-blue.png and re-run the texture step (cut the brightest 384×384 area, divide by an 80 px blur, make it periodic, save at 512×512; rebuild the ramp from the red/blue pair). Strength (`uPeak`), height (`0.40 * uVh`) and speed (`rise = t * 9.0`) are at the top of the shader.

**Blue versions are made from the red photos**, so every blue/red pair lines up pixel-for-pixel (no ghosting in the hero fade, no misaligned face across the Red shift wipe). Only the red rim light and haze are turned blue; skin tones are untouched. If you replace a red photo, regenerate its blue partner the same way (script used: saturated pure-red pixels → blue, blended with a soft mask).

## Replacing an image
Keep the same file name, aspect ratio and format (WebP, quality ~80), and drop it into `public/photos/`.
Nothing else needs to change.

## Re-making the head turn
**Wide (desktop):**
1. Start/end frames at 16:9: turn-wide-01 facing the right of the image, turn-wide-05 facing the left and looking at the camera.
2. Google Flow → **Video → Frames** → start + end frame, 16:9, 8 s.
3. Keep only the turn (in the current video: frames 1–138 of 192; the blink at frames 83–94 is reduced to a single half-blink frame), crop 992×558 at x=144, y=0 (removes the ✦ watermark, which sits at y ≥ 576), scale to 1280×720, export ~76 evenly spaced frames as WebP quality 72:
```bash
ffmpeg -i turn-wide.mp4 -vf "trim=end_frame=138,crop=992:558:144:0,scale=1280:720:flags=lanczos,fps=13.2" -c:v libwebp -quality 72 public/sequences/turn-wide/%04d.webp
```
4. Set `TURN_WIDE.count` in `src/data/media.ts` to the number of frames.

**Portrait (phones):** same idea at 9:16, cropped to 4:5 from the top:
```bash
ffmpeg -i turn.mp4 -t 4.1 -vf "crop=720:900:0:40,fps=15.6" -c:v libwebp -quality 72 public/sequences/turn/%04d.webp
```
then set `TURN.count`.

## Brand rules for any new photo
Pure black background · black shirt · soft key light front-left · red rim light (#FF2A1F) behind-right · same head size in all 4:5 portraits · WebP under ~150 KB.

For new smoke: keep the haze on the right, pure black elsewhere, and make the blue version by recolouring the red one (so shape and motion match).
