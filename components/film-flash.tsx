"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  active: boolean;
}

const SLOTS = [
  { top: "5%",  right: "2%",  rotate: "2deg",   w: 480 },
  { top: "38%", right: "10%", rotate: "-1.5deg", w: 420 },
  { top: "15%", right: "34%", rotate: "1.2deg",  w: 360 },
  { top: "58%", right: "1%",  rotate: "-2.5deg", w: 400 },
  { top: "50%", right: "36%", rotate: "2.8deg",  w: 320 },
];

export default function FilmFlash({ images, active }: Props) {
  const [mounted, setMounted] = useState(false);
  // Increments on every hover-enter — forces animation to replay via key change
  const [animKey, setAnimKey] = useState(0);
  // Keeps thumbnails in DOM during fade-out
  const [visible, setVisible] = useState(false);

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
      className="fixed inset-0 z-[5] pointer-events-none"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 0.35s ease",
      }}
    >
      {slots.map((slot, i) => (
        // Outer: stable rotation wrapper (never remounts, no border flicker)
        <div
          key={i}
          className="absolute overflow-hidden rounded shadow-2xl"
          style={{
            top: slot.top,
            right: slot.right,
            width: slot.w,
            aspectRatio: "16/10",
            transform: `rotate(${slot.rotate})`,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Inner: keyed with animKey → remounts on each hover → replays animation */}
          <div
            key={`${i}-${animKey}`}
            style={{
              position: "absolute",
              inset: 0,
              animation: `flash-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 65}ms both`,
            }}
          >
            <Image
              src={images[i]}
              alt=""
              fill
              sizes={`${slot.w}px`}
              className="object-cover"
            />
          </div>

          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,12,10,0.3) 0%, transparent 45%, rgba(15,12,10,0.25) 100%)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
