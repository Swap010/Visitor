import { useCallback, useEffect, useState } from "react";
import type { PhotoKey } from "../../data/images";
import { photo } from "../../data/images";
import { useScrollLock } from "../../lib/hooks";
import { SafeImage } from "../ui/SafeImage";

export type GalleryShot = { key: PhotoKey; caption: string };

type GalleryProps = { shots: GalleryShot[]; name: string };

export function Gallery({ shots, name }: GalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useScrollLock(lightbox);

  const step = useCallback(
    (delta: number) => setActive((i) => (i + delta + shots.length) % shots.length),
    [shots.length],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, step]);

  const shot = shots[active];

  return (
    <div className="gal">
      <figure className="gal__main plate">
        <button
          type="button"
          className="gal__open"
          onClick={() => setLightbox(true)}
          aria-label={`Open larger view of ${shot.caption}`}
        >
          <SafeImage
            className="plate__img"
            src={photo(shot.key, "landscape_16_9")}
            alt={`${shot.caption} at ${name}`}
            width={1600}
            height={900}
            eager
          />
          <span className="gal__expand" aria-hidden="true">
            View larger
          </span>
        </button>
        <figcaption className="gal__caption">{shot.caption}</figcaption>
        <span className="gal__count" aria-live="polite">
          {active + 1} / {shots.length}
        </span>
      </figure>

      <ul className="gal__thumbs" role="tablist" aria-label={`Photographs of ${name}`}>
        {shots.map((s, i) => (
          <li key={s.key}>
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              className={i === active ? "is-active" : undefined}
              onClick={() => setActive(i)}
            >
              <SafeImage
                src={photo(s.key, "square")}
                alt={`Show ${s.caption}`}
                width={200}
                height={200}
              />
            </button>
          </li>
        ))}
      </ul>

      {lightbox ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} — photograph viewer`}
          onClick={(e) => e.target === e.currentTarget && setLightbox(false)}
        >
          <div className="lightbox__bar">
            <p>
              {shot.caption} · {active + 1} of {shots.length}
            </p>
            <button type="button" onClick={() => setLightbox(false)}>
              Close <span aria-hidden="true">&#10005;</span>
            </button>
          </div>
          <div className="lightbox__stage">
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={() => step(-1)}
              aria-label="Previous photograph"
            >
              &#8592;
            </button>
            <SafeImage
              className="lightbox__img"
              src={photo(shot.key, "landscape_16_9")}
              alt={`${shot.caption} at ${name}`}
              width={1800}
              height={1012}
            />
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={() => step(1)}
              aria-label="Next photograph"
            >
              &#8594;
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
