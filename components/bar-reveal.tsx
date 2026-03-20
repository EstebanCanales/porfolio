"use client";

import { useEffect, useState } from "react";

interface Props {
  src: string;
  active: boolean;
  baseDelay?: number;
}

const COLS = 26;
const STAGGER = Array.from({ length: COLS }, (_, i) => (i * 137 + 11) % COLS);

export function BarReveal({ src, active, baseDelay = 0 }: Props) {
  // One-frame delay so the browser sees scaleY(0) BEFORE active=true arrives.
  // Without this, the component mounts already with active=true and no transition fires.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const show = ready && active && !!src;

  return (
    <div className="absolute inset-0">
      {Array.from({ length: COLS }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${(i / COLS) * 100}%`,
            bottom: 0,
            width: `calc(${100 / COLS}% + 0.6px)`,
            height: "100%",
            backgroundImage: src ? `url(${src})` : "none",
            backgroundSize: `${COLS * 100}% 100%`,
            backgroundPosition: `${COLS === 1 ? 0 : (i / (COLS - 1)) * 100}% 50%`,
            transformOrigin: "bottom",
            transform: show ? "scaleY(1)" : "scaleY(0)",
            transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: show
              ? `${baseDelay + STAGGER[i] * 20}ms`
              : `${(COLS - 1 - STAGGER[i]) * 5}ms`,
          }}
        />
      ))}
    </div>
  );
}
