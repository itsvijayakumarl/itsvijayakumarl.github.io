import FrameSequence from './FrameSequence';
import Visual, { type VisualKind } from './Visual';
import { MEDIA } from '../data/media';

type Slot = keyof typeof MEDIA;

/** Your photo / scroll sequence when provided; a code-drawn visual until then (never an empty box). */
export default function MediaSlot({ slot, alt, ratio = 'aspect-[3/2]', fallback = 'terminal' }: { slot: Slot; alt: string; ratio?: string; fallback?: VisualKind }) {
  const m = MEDIA[slot];
  return (
    <div className={`relative w-full ${ratio}`} data-open={m.still || m.sequence.count > 0 ? '' : undefined}>
      {m.sequence.count > 0 ? (
        <FrameSequence {...m.sequence} alt={alt} className="absolute inset-0" />
      ) : m.still ? (
        <img src={`${import.meta.env.BASE_URL}${m.still}`} alt={alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
      ) : (
        <div className="absolute inset-0">
          <Visual kind={fallback} live />
          {import.meta.env.DEV && (
            <span className="absolute top-2.5 left-2.5 z-10 font-mono text-[9px] tracking-wider uppercase text-amber-300 bg-black/85 px-2.5 py-1 rounded border border-amber-400/30">
              Replace → MEDIA.{slot} (src/data/media.ts)
            </span>
          )}
        </div>
      )}
    </div>
  );
}
