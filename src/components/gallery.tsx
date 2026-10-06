'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Asset } from '@/data/projects';
import type { GalleryLayout } from '@/data/art-direction';

export function Gallery({ assets, title, layout }: { assets: Asset[]; title: string; layout: GalleryLayout }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  function open(index: number) {
    setSelected(index);
    setZoomed(false);
    dialog.current?.showModal();
  }

  function move(direction: number) {
    setSelected(current => ((current ?? 0) + assets.length + direction) % assets.length);
    setZoomed(false);
  }

  return <>
    {layout === 'sequence' && <p className="sequence-instruction label">An object in sequence <span>Scroll to explore →</span></p>}
    <div className={`gallery gallery-${layout} ${assets.length === 1 ? 'gallery-single' : ''}`} tabIndex={layout === 'sequence' ? 0 : undefined} role={layout === 'sequence' ? 'region' : undefined} aria-label={layout === 'sequence' ? `${title}: scrollable image sequence` : undefined}>
      {assets.map((asset, index) => <figure key={`${asset.src}-${index}`} data-format={asset.height > asset.width * 1.4 ? 'portrait' : 'landscape'} data-drawing={asset.src.includes('drawings') || undefined}>
        <button className="image-button" onClick={() => open(index)} aria-label={`Enlarge ${title}, image ${index + 1}`} data-reveal>
          <Image {...asset} alt={`${title} — ${asset.src.includes('drawings') ? 'process drawing' : `project detail ${index + 1}`}`} sizes={layout === 'sequence' ? '(max-width: 700px) 70vw, 35vw' : '(max-width: 700px) 92vw, 65vw'} />
          <span className="image-enlarge label" aria-hidden="true">Inspect ↗</span>
        </button>
        <figcaption className="label"><span>Fig. {String(index + 1).padStart(2, '0')}</span><span>{asset.src.includes('drawings') ? 'Process drawing' : 'A closer look'}</span></figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} className="lightbox" aria-label={`${title} image viewer`} onClose={() => { setSelected(null); setZoomed(false); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => {
      if (zoomed || assets.length < 2) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
      }
    }}>
      <div className="lightbox-toolbar label"><span aria-live="polite">Fig. {(selected ?? 0) + 1} / {assets.length}</span><div><button onClick={() => setZoomed(!zoomed)} aria-pressed={zoomed}>{zoomed ? 'Fit image' : 'Zoom in'} ↗</button><button autoFocus onClick={() => dialog.current?.close()} aria-label="Close image viewer">Close ×</button></div></div>
      <div className={`lightbox-image ${zoomed ? 'is-zoomed' : ''}`} tabIndex={0} aria-label="Image inspection area">
        {selected !== null && <Image {...assets[selected]} alt={`${title} — enlarged detail ${selected + 1}`} sizes="100vw" />}
      </div>
      <div className="lightbox-bottom"><p>{title}</p>{assets.length > 1 && <div className="lightbox-nav label"><button onClick={() => move(-1)}>← Previous</button><button onClick={() => move(1)}>Next →</button></div>}</div>
    </dialog>
  </>;
}
