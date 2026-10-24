import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Adds `.is-in` to a `.reveal` element once it scrolls into view.
 * A single shared observer keeps the cost low regardless of page length.
 */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
  }
  return observer;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!el.classList.contains("reveal") || el.classList.contains("is-in")) return;

    const io = getObserver();
    if (!io) {
      el.classList.add("is-in");
      return;
    }
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return ref;
}

/** Locks page scroll while an overlay is open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    document.body.classList.add("is-locked");
    return () => document.body.classList.remove("is-locked");
  }, [locked]);
}

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}

/** True once the window has scrolled past `offset` pixels. */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Small artificial delay so loading states are real, not decorative. */
export function useSimulatedLoad(delay = 480, key = "") {
  // Loading is derived from whether the current key has finished loading, so no
  // state has to be reset synchronously when the key changes.
  const [loadedKey, setLoadedKey] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setLoadedKey(key), delay);
    return () => window.clearTimeout(id);
  }, [delay, key]);

  return loadedKey !== key;
}
