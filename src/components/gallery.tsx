'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Asset } from '@/data/projects';

export function Gallery({ assets, title }: { assets: Asset[]; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  function open(index: number) {
    setSelected(index);
    setZoomed(false);
    dialog.current?.showModal();
  }
  return <>
    <div className={`gallery ${assets.length === 1 ? 'gallery-single' : ''}`}>
      {assets.map((asset, index) => <figure key={`${asset.src}-${index}`}>
        <button className="image-button" onClick={() => open(index)} aria-label={`Enlarge ${title}, image ${index + 1}`}>
          <Image {...asset} alt={`${title} — ${index === 0 ? 'project overview' : `detail ${index + 1}`}`} sizes="(max-width: 700px) 100vw, 65vw" />
          <span className="image-enlarge" aria-hidden="true">↗</span>
        </button>
        <figcaption><span>{title}</span><span>{String(index + 1).padStart(2, '0')}</span></figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} className="lightbox" aria-label={`${title} image viewer`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="lightbox-toolbar">
        <span>{selected + 1} / {assets.length}</span>
        <div><button onClick={() => setZoomed(!zoomed)}>{zoomed ? 'Fit image' : 'Zoom in'} <span aria-hidden="true">↗</span></button><button autoFocus onClick={() => dialog.current?.close()} aria-label="Close image viewer">Close ×</button></div>
      </div>
      <div className={`lightbox-image ${zoomed ? 'is-zoomed' : ''}`} tabIndex={0} aria-label="Image inspection area">
        <Image {...assets[selected]} alt={`${title} — enlarged detail ${selected + 1}`} sizes="100vw" />
      </div>
      {assets.length > 1 && <div className="lightbox-nav"><button onClick={() => {setSelected((selected + assets.length - 1) % assets.length); setZoomed(false);}}>← Previous</button><button onClick={() => {setSelected((selected + 1) % assets.length); setZoomed(false);}}>Next →</button></div>}
    </dialog>
  </>;
}
