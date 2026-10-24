import { useState } from "react";
import { cn } from "../../lib/format";

type SafeImageProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  /** Load immediately and hint high priority — use for the first hero image. */
  eager?: boolean;
  sizes?: string;
};

/**
 * Image with a graceful fallback: if a photograph fails to load or is slow on
 * a poor connection, the layout keeps its shape and shows a labelled panel
 * instead of a broken image icon.
 */
export function SafeImage({ src, alt, className, width, height, eager, sizes }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={cn("img-fallback", className)} role="img" aria-label={alt}>
        <span>Photograph unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      onError={() => setFailed(true)}
    />
  );
}
