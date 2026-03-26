"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";

const GameOfLife = dynamic(() => import("@/components/game-of-life-background"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

export default function AboutPage() {
  const cellsTriggerRef = useRef<((positions: { nx: number; ny: number }[]) => void) | null>(null);
  const shipsTriggerRef = useRef<(() => void) | null>(null);
  const [open, setOpen]       = useState(false);
  const [imgHover, setImgHover] = useState(false);
  const [clickOn, setClickOn] = useState(true);
  const [dragOn, setDragOn]   = useState(true);
  const clickEnabledRef = useRef(true);
  const dragEnabledRef  = useRef(true);

  const toggleClick = () => { const v = !clickOn; setClickOn(v); clickEnabledRef.current = v; };
  const toggleDrag  = () => { const v = !dragOn;  setDragOn(v);  dragEnabledRef.current  = v; };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.key.toLowerCase() !== "b") return;
      shipsTriggerRef.current?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      <div className="absolute inset-0 z-0">
        <GameOfLife
          color="#6d28d9"
          cellSize={16}
          updateInterval={90}
          initialDensity={0.6}
          cellsTriggerRef={cellsTriggerRef}
          shipsTriggerRef={shipsTriggerRef}
          clickEnabledRef={clickEnabledRef}
          dragEnabledRef={dragEnabledRef}
        />
      </div>
      <Navbar light accent="#6d28d9" bg="rgba(255,255,255,0.92)" borderCol="rgba(109,40,217,0.2)" />
      <main className="flex-1 relative z-10 pointer-events-none" />

      {/* Bottom bar — info left, hints right */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between">
        {/* About card — expands upward */}
        <div
          className="inline-flex flex-col-reverse rounded-2xl overflow-hidden pointer-events-auto"
          style={{
            border: "2px solid rgba(109,40,217,0.25)",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(14px)",
            width: open ? 420 : 110,
            transition: "width 0.45s cubic-bezier(0.34,1.2,0.64,1)",
          }}
        >
          {/* Image — only shown when open */}
          <button
            onClick={() => setOpen((o) => !o)}
            onMouseEnter={() => setImgHover(true)}
            onMouseLeave={() => setImgHover(false)}
            className="block text-left flex-shrink-0"
            style={{
              cursor: "pointer",
              padding: "8px",
            }}
          >
            <div
              className="relative overflow-hidden rounded-xl"
              style={{
                width: "100%",
                height: open ? 180 : 94,
                transition: "height 0.45s cubic-bezier(0.34,1.2,0.64,1)",
              }}
            >
              {/* Normal photo — visible when collapsed */}
              <Image
                src="/esteban.JPG"
                alt="Esteban Canales"
                width={420}
                height={180}
                className="absolute inset-0 object-cover w-full h-full"
                style={{
                  opacity: open ? 0 : 1,
                  transition: "opacity 0.4s ease",
                }}
              />
              {/* Pixel photo — visible when expanded */}
              <Image
                src="/esteban2.png"
                alt="Esteban Canales"
                width={420}
                height={180}
                className="absolute inset-0 object-cover w-full h-full"
                style={{
                  filter: "sepia(1) hue-rotate(240deg) saturate(2.5) brightness(0.85)",
                  opacity: open ? 1 : 0,
                  transform: imgHover ? "scale(1.03)" : "scale(1)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              />
            </div>
          </button>

          {/* Expandable text — slides up above the image */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: open ? "1fr" : "0fr",
              transition: "grid-template-rows 0.45s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <div
                className="flex flex-col gap-3 px-4 pt-4 pb-3"
                style={{
                  opacity: open ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  transitionDelay: open ? "0.18s" : "0s",
                }}
              >
                {/* Name + close button */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold" style={{ color: "#1e1030" }}>Esteban Canales</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                    className="text-[10px] font-mono leading-none px-1.5 py-0.5 rounded"
                    style={{
                      color: "#6d28d9",
                      opacity: 0.5,
                      border: "1px solid rgba(109,40,217,0.2)",
                      transition: "opacity 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ height: "1px", background: "rgba(109,40,217,0.12)" }} />

                <p className="text-[11px] font-mono leading-relaxed" style={{ color: "#1e1030", opacity: 0.6 }}>
                  Hey there. Esteban here. I&apos;m a software developer with a deep obsession for things that feel right — interfaces that have a heartbeat, and code clean enough to be proud of.
                </p>
                <p className="text-[11px] font-mono leading-relaxed" style={{ color: "#1e1030", opacity: 0.6 }}>
                  I believe great software isn&apos;t just functional. It&apos;s the difference between a tool and an experience — something that earns attention through craft, not just utility.
                </p>
                <p className="text-[11px] font-mono leading-relaxed" style={{ color: "#1e1030", opacity: 0.6 }}>
                  Off-screen, I&apos;m chasing fast cars, obsessing over music, or down a rabbit hole of something that just shouldn&apos;t work but does.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hints */}
        <div
          className="inline-flex flex-col gap-1 px-3 py-2.5 rounded-xl"
          style={{
            border: "2px solid rgba(109,40,217,0.2)",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(14px)",
          }}
        >
          {([
            { key: "click",       action: "cells", toggle: toggleClick, active: clickOn },
            { key: "hold + drag", action: "paint", toggle: toggleDrag,  active: dragOn  },
          ] as const).map(({ key, action, toggle, active }) => (
            <button
              key={key}
              onClick={toggle}
              className="text-xs font-mono whitespace-nowrap text-left"
              style={{ opacity: active ? 1 : 0.3, transition: "opacity 0.2s ease" }}
            >
              <span className="font-bold" style={{ color: "#6d28d9" }}>{key}</span>
              <span style={{ color: "#1e1030", opacity: 0.35 }}> → </span>
              <span style={{ color: "#1e1030" }}>{action}</span>
            </button>
          ))}
          <span className="text-xs font-mono whitespace-nowrap" style={{ color: "#1e1030", opacity: 0.5 }}>
            <span className="font-bold" style={{ color: "#6d28d9" }}>B</span>
            <span style={{ opacity: 0.35 }}> → </span>
            ships
          </span>
        </div>
      </div>
    </div>
  );
}
