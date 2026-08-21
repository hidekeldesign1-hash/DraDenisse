"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (reduce) {
      nodes.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
