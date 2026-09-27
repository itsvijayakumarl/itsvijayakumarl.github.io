# Third-party code, assets & credits

**Short version: the live site makes zero requests to any third-party server.**
Every library, font, shader and image is bundled into `dist/` at build time. If any CDN,
font service or GitHub repo disappears tomorrow, the deployed site keeps working.

Verified with a headless-browser network audit: load the page, scroll top to bottom, then count
requests to anything other than the site's own origin. **Result: 0 external requests.**

---

## 1. Runtime libraries (bundled into the build via npm)

| Package | Version | Licence | Used for |
|---|---|---|---|
| react, react-dom | 19.3.0 | MIT | UI framework |
| three | 0.186.1 | MIT | WebGL for the shader gradients ("What I do", closing CTA) via React Three Fiber |
| @react-three/fiber | 9.8.1 | MIT | React renderer for the shader gradient ("What I do") |
| gsap (+ ScrollTrigger) | 3.15.0 | GSAP Standard "no charge" licence | Scroll choreography, reveals, counters |
| lenis | 1.3.26 | MIT | Smooth scrolling |
| motion | 12.43.0 | MIT | Loader word transitions, card enter animations |
| lucide-react | 0.546.0 | ISC | Icons (inline SVG, bundled) |

## 2. Fonts (self-hosted — no Google Fonts at runtime)

| Font | Package | Licence |
|---|---|---|
| Geist Sans (300–900) | @fontsource/geist-sans 5.3.0 | SIL Open Font License 1.1 |
| Geist Mono (400–700) | @fontsource/geist-mono 5.3.0 | SIL Open Font License 1.1 |
| Instrument Serif (400, italic) | @fontsource/instrument-serif 5.3.0 | SIL Open Font License 1.1 |

The font files are copied into `dist/assets/` by Vite. They're imported in `src/main.tsx`.

## 3. Build-time only (not shipped to visitors)

vite 8.3.1 (MIT) · @vitejs/plugin-react (MIT) · tailwindcss 4.3.3 + @tailwindcss/vite (MIT) ·
typescript (Apache-2.0) · @types/* (MIT)

## 4. Ideas & techniques credited (no code copied — all effects re-implemented in this repo)

| Effect on the site | Inspired by | Licence of the original | Our file |
|---|---|---|---|
| React-based WebGL components | [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) | MIT (used as a dependency) | `src/components/fx/*` |
| Refractive "liquid glass" nav, buttons, HUD, toggles | [dashersw/liquid-glass-js](https://github.com/dashersw/liquid-glass-js) | MIT | `src/components/fx/LiquidGlassFilter.tsx` + `.lg` in `index.css` |
| Moving noise-displaced gradients ("What I do", closing CTA) | [ruucm/shadergradient](https://github.com/ruucm/shadergradient) | MIT | `src/components/fx/ShaderGradient.tsx` |
| 3D simplex noise GLSL | Ashima Arts / Stefan Gustavson | MIT | `src/components/fx/glsl.ts` |
| Rising haze: tiled real texture, two differently rotated copies blended with a variance-preserving mask so the tile never visibly repeats | Heitz & Neyret, "High-Performance By-Example Noise using a Histogram-Preserving Blending Operator" (2018) — technique only | Paper (no code used) | `src/components/HazeCanvas.tsx` |
| Seamless tile from a photo crop (periodic + smooth decomposition) | L. Moisan, "Periodic plus smooth image decomposition" (2011) — technique only | Paper (no code used) | used offline to make `src/assets/haze/haze-detail.png` |

## 5. Images & media

| Asset | Source | Location |
|---|---|---|
| Section backgrounds (security, automation, circuit) | Generated for this project | `src/assets/img/*.webp` |
| Company badges (Ecosystem) | Initials generated in code | `src/components/DigitalEcosystemSection.tsx` |
| Project visuals | Drawn in code (no image files) | `src/components/Visual.tsx` |
| Favicon set, OG image | Made for this project | `public/` |
| Résumé | Your own document | `public/Vijaya_Kumar_L_Resume.pdf` |
| Portraits (9 images; the 3 blue versions are recoloured from their red originals) | AI-assisted from Vijaya's own photos: Google Flow (Nano Banana 2) and ChatGPT image generation | `public/photos/`, set in `src/data/media.ts` |
| Head-turn sequence, wide (76 frames, 16:9) | Generated from Vijaya's frames (turn-wide-01 → turn-wide-05) with Google Flow, Frames to Video. Visible ✦ watermark cropped out; Google's invisible SynthID watermark remains embedded, as intended | `public/sequences/turn-wide/` |
| Head-turn sequence, portrait (64 frames, 4:5 — phones + loader) | Generated from Vijaya's frames with Google Flow (Gemini Omni 1.1 Flash, Frames to Video). Visible ✦ watermark cropped out; SynthID remains embedded | `public/sequences/turn/` |
| Smoke videos (red + blue loops, MP4 + WebM) and their stills | Red: Google Flow video from smoke-red.png (same start/end frame), ✦ watermark cropped out, trimmed to a seamless loop. Blue: recoloured from the red frames using the colour mapping measured from smoke-red.png → smoke-blue.png. SynthID remains embedded | `public/media/` |
| Rising-haze textures (grain tile, colour ramp, still) | Cut from smoke-red.png / smoke-blue.png (Google Flow) — no third-party imagery | `src/assets/haze/` |
| Social card | Made from `og-image.jpg` (AI-assisted portrait) | `public/og-image.jpg` |

## 6. Graceful degradation (nothing can take the page down)

- **No WebGL / old GPU / shader error / lost GPU context:** the rising haze is replaced by a still image of the same haze. Liquid metal becomes a chrome-gradient "VK". Shader gradients become static CSS gradients.
- **Any effect crashing** is caught by `FxBoundary`, and only that effect falls back.
- **Firefox / Safari:** liquid glass uses frosted blur instead of refraction, because only Chromium can refract the backdrop.
- **Reduced motion:** there's no intro, no custom cursor, and no scroll animation; content shows immediately. The haze is a still frame, smoke videos show their still image, the head turn shows its last frame.
- **Battery:** the haze draws at most 30 fps and stops while the tab is hidden; smoke videos load only near the screen and pause off-screen or when the tab is hidden.
- **Known console note:** @react-three/fiber 9.x logs `THREE.Clock … deprecated` as a warning. It's harmless and will disappear when R3F updates.

## 7. Last audit (27 Sep 2026 — headless Chromium at 1440×900, 1366×768, 390×844, 360×800)

| Check | Result |
|---|---|
| Requests to third-party domains while loading and scrolling the full page | **0** |
| Failed or cancelled requests | **0** |
| Fonts | Bundled locally (`@fontsource/*`), no Google Fonts |
| Images / video | All local (portraits, 76 + 64 turn frames, smoke videos in `public/`), or drawn in code; no hotlinked media |
| Build from a clean `npm ci` | Passes (`npm run lint` clean) |
| Console errors / page errors | **0** at all four sizes (normal and reduced motion) |
| Sideways scrolling | **None** at all four sizes (`overflow-x: clip` on html/body; a decorative orb used to push the page 10 px wide) |

To re-verify after any change, run `npm run build && npm run preview`, open DevTools → Network, reload and scroll. Every request should come from your own domain.

## 8. External links (navigation only — never loaded automatically)

LinkedIn, GitHub, trendit.in blog, aiprompts.trendit.in and project repos. These open only when a
visitor clicks them.
