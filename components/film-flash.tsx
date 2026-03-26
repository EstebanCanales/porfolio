"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  active: boolean;
}

const SLOTS = [
  { top: "18%", right: "2%",  rotate: "2deg",   w: 480 },
  { top: "48%", right: "10%", rotate: "-1.5deg", w: 420 },
  { top: "28%", right: "34%", rotate: "1.2deg",  w: 360 },
  { top: "65%", right: "1%",  rotate: "-2.5deg", w: 400 },
  { top: "58%", right: "36%", rotate: "2.8deg",  w: 320 },
];

export default function FilmFlash({ images, active }: Props) {
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [visible, setVisible] = useState(false);
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>(
    SLOTS.map(() => ({ x: 0, y: 0 }))
  );
  const drag = useRef<{ idx: number; startX: number; startY: number; origX: number; origY: number } | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (active) {
      setVisible(true);
      setAnimKey((k) => k + 1);
    } else {
      const t = setTimeout(() => setVisible(false), 350);
      return () => clearTimeout(t);
    }
  }, [active, mounted]);

  if (!mounted || !visible) return null;

  const slots = SLOTS.slice(0, images.length);

  return (
    <div
      className="fixed inset-0 z-[15]"
      style={{ opacity: active ? 1 : 0, transition: "opacity 0.35s ease", pointerEvents: "none" }}
    >
      {slots.map((slot, i) => (
        <div
          key={i}
          className="absolute overflow-hidden rounded shadow-2xl"
          style={{
            top: slot.top,
            right: slot.right,
            width: slot.w,
            aspectRatio: "16/10",
            transform: `translate(${offsets[i].x}px, ${offsets[i].y}px) rotate(${slot.rotate})`,
            border: "1px solid rgba(255,255,255,0.08)",
            pointerEvents: "auto",
          }}
        >
          <div
            key={`${i}-${animKey}`}
            style={{
              position: "absolute", inset: 0,
              animation: `flash-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 65}ms both`,
            }}
          >
            <Image src={images[i]} alt="" fill sizes={`${slot.w}px`} className="object-cover" draggable={false} />
          </div>
          <div className="absolute inset-0 z-10 pointer-events-none" style={{
            background: "linear-gradient(135deg, rgba(15,12,10,0.3) 0%, transparent 45%, rgba(15,12,10,0.25) 100%)",
          }} />

          {/* Drag overlay */}
          <div
            className="absolute inset-0 z-20"
            style={{ cursor: "grab" }}
            onPointerDown={e => {
              e.currentTarget.setPointerCapture(e.pointerId);
              drag.current = {
                idx: i,
                startX: e.clientX,
                startY: e.clientY,
                origX: offsets[i].x,
                origY: offsets[i].y,
              };
            }}
            onPointerMove={e => {
              if (!drag.current || drag.current.idx !== i) return;
              const { startX, startY, origX, origY } = drag.current;
              setOffsets(prev => prev.map((o, j) =>
                j === i ? { x: origX + e.clientX - startX, y: origY + e.clientY - startY } : o
              ));
            }}
            onPointerUp={() => { drag.current = null; }}
          />

        </div>
      ))}
    </div>
  );
}
