import { useEffect, useRef } from 'react';
import { reducedMotion } from '../lib/store';

interface Props {
  dir: string;
  count: number;
  ext: string;
  /** 'scroll' = frames follow the element through the viewport; 'pointer' = frames follow the mouse left→right */
  drive: 'scroll' | 'pointer';
  alt: string;
  className?: string;
}

/**
 * Apple-style image sequence on a canvas. Frames load progressively (first frame
 * immediately), the canvas redraws only when the frame index changes.
 */
export default function FrameSequence({ dir, count, ext, drive, alt, className = '' }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c || count <= 0) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const base = import.meta.env.BASE_URL;
    const frames: HTMLImageElement[] = new Array(count);
    let current = -1;
    let target = 0;
    let raf = 0;

    const src = (i: number) => `${base}${dir}/${String(i + 1).padStart(4, '0')}.${ext}`;
    const size = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
      current = -1;
    };
    const draw = (i: number) => {
      // nearest loaded frame so scrubbing never shows a blank canvas
      let k = i;
      while (k >= 0 && !(frames[k]?.complete && frames[k].naturalWidth)) k--;
      if (k < 0 || k === current) return;
      current = k;
      const img = frames[k];
      const s = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h);
    };
    const load = (i: number) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => { if (i === 0 || Math.abs(i - target) < 3) draw(target); };
      img.src = src(i);
      frames[i] = img;
    };

    size();
    load(0);
    // load the rest when the browser is idle
    const idle = (window as unknown as { requestIdleCallback?: (f: () => void) => number }).requestIdleCallback ?? ((f: () => void) => setTimeout(f, 200));
    idle(() => { for (let i = 1; i < count; i++) load(i); });

    const tick = () => { raf = 0; draw(target); };
    const request = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const onScroll = () => {
      const r = c.getBoundingClientRect();
      const p = 1 - (r.bottom) / (window.innerHeight + r.height);
      target = Math.max(0, Math.min(count - 1, Math.round(p * (count - 1))));
      request();
    };
    const onPointer = (e: PointerEvent) => {
      target = Math.max(0, Math.min(count - 1, Math.round((e.clientX / window.innerWidth) * (count - 1))));
      request();
    };

    if (!reducedMotion) {
      if (drive === 'scroll') window.addEventListener('scroll', onScroll, { passive: true });
      else window.addEventListener('pointermove', onPointer, { passive: true });
    }
    target = drive === 'pointer' ? Math.floor(count / 2) : 0;
    const ro = new ResizeObserver(() => { size(); request(); });
    ro.observe(c);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
      ro.disconnect();
    };
  }, [dir, count, ext, drive]);

  return <canvas ref={canvas} role="img" aria-label={alt} className={`block w-full h-full ${className}`} />;
}
