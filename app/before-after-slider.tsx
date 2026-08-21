"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type BeforeAfterSliderProps = {
  antes: string;
  despues: string;
  tratamiento: string;
};

export function BeforeAfterSlider({ antes, despues, tratamiento }: BeforeAfterSliderProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [position, setPosition] = useState(50);
  const labelId = useId();

  const updateFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(92, Math.max(8, next)));
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return;
      updateFromClientX(event.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [updateFromClientX]);

  return (
    <article className="result-card rounded-2xl" data-reveal>
      <span className="result-tag">{tratamiento}</span>
      <div
        ref={frameRef}
        className="result-slider rounded-2xl"
        role="group"
        aria-labelledby={labelId}
        onPointerDown={(event) => {
          dragging.current = true;
          frameRef.current?.setPointerCapture(event.pointerId);
          updateFromClientX(event.clientX);
        }}
      >
        <span id={labelId} className="sr-only">
          Comparador antes y después de {tratamiento}. Arrastra la línea para comparar.
        </span>

        <div className="result-layer result-layer--antes">
          <Image
            src={antes}
            alt={`Antes — ${tratamiento}`}
            fill
            sizes="(max-width: 900px) 100vw, 480px"
            className="result-photo"
            draggable={false}
          />
          <span className="result-label result-label--antes">Antes</span>
        </div>

        <div
          className="result-layer result-layer--despues"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          <Image
            src={despues}
            alt={`Después — ${tratamiento}`}
            fill
            sizes="(max-width: 900px) 100vw, 480px"
            className="result-photo"
            draggable={false}
          />
          <span className="result-label result-label--despues">Después</span>
        </div>

        <div className="result-handle" style={{ left: `${position}%` }} aria-hidden="true">
          <span className="result-handle-line" />
          <span className="result-handle-knob">
            <span />
            <span />
          </span>
        </div>

        <input
          className="result-range"
          type="range"
          min={8}
          max={92}
          value={Math.round(position)}
          aria-label={`Posición del comparador de ${tratamiento}`}
          onChange={(event) => setPosition(Number(event.target.value))}
        />
      </div>
    </article>
  );
}
