/**
 * YOUR PHOTOS & SCROLL SEQUENCES — the only file you need to edit.
 * Files live in /public. Paths here are relative to /public (no leading slash).
 * See IMAGE-GUIDE.md for what each image is and how to regenerate it.
 */

/** Every portrait used across the site. Replace a file in /public/photos to update it everywhere. */
export const PHOTOS = {
  heroRed: 'photos/hero-red.webp', // Red shift — alert state (4:5, right side)
  heroBlue: 'photos/hero-blue.webp', // Red shift — calm state (4:5) — recoloured from hero-red so the wipe lines up
  heroMobile: 'photos/hero-mobile.webp', // hero on phones (9:16), red
  heroMobileBlue: 'photos/hero-mobile-blue.webp', // hero on phones (9:16), blue — recoloured from the red photo so they line up
  shiftBlue: 'photos/shift-blue.webp', // hero — opens in blue, out of focus (16:9) — recoloured from shift-red
  shiftRed: 'photos/shift-red.webp', // hero — pulls focus into red (16:9)
  work: 'photos/work.webp', // About — building
  lead: 'photos/lead.webp', // About — leading
  contact: 'photos/contact.webp', // closing call to action (blended portrait)
};

/** The scroll-controlled head turn. Wide (16:9) frames on desktop/landscape, portrait (4:5) frames on phones. */
export const TURN_WIDE = { dir: 'sequences/turn-wide', count: 76, ext: 'webp', width: 1280, height: 720 };
export const TURN = { dir: 'sequences/turn', count: 64, ext: 'webp', width: 720, height: 900 }; // portrait: phones + the loader monogram

/**
 * Looping smoke behind the loader, Red shift and closing call to action.
 * still = the poster and the reduced-motion image. Blue is recoloured from red frame by frame,
 * so both have the same shape and motion.
 */
export const SMOKE = {
  red: { webm: 'media/smoke-red.webm', mp4: 'media/smoke-red.mp4', still: 'media/smoke-red.webp' },
  blue: { webm: 'media/smoke-blue.webm', mp4: 'media/smoke-blue.mp4', still: 'media/smoke-blue.webp' },
};

/**
 * Optional extra slots used by MediaSlot / FrameSequence.
 * still: a single image path. sequence: numbered frames (set count > 0 to enable).
 */
export const MEDIA = {
  hero: {
    still: PHOTOS.heroRed,
    sequence: { dir: 'sequences/hero', count: 0, ext: 'webp', drive: 'pointer' as const },
  },
  about: {
    still: PHOTOS.work,
    sequence: { dir: 'sequences/about', count: 0, ext: 'webp', drive: 'scroll' as const },
  },
  leadership: {
    still: PHOTOS.lead,
    sequence: { dir: 'sequences/leadership', count: 0, ext: 'webp', drive: 'scroll' as const },
  },
  contact: {
    still: PHOTOS.contact,
    sequence: { dir: 'sequences/contact', count: 0, ext: 'webp', drive: 'scroll' as const },
  },
};

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
