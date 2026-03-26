"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import { Dices } from "lucide-react";

const FaultyTerminal = dynamic(() => import("@/components/faulty-terminal"), { ssr: false });

const BELIEFS = [
  { title: "belief_01.sh", lines: ["$ run --belief constraints", "", "Constraints remembered", "are constraints overcome.", "", "$ _"] },
  { title: "belief_02.sh", lines: ["$ run --belief willpower", "", "A system that requires", "willpower will eventually", "fail.", "", "$ _"] },
  { title: "belief_03.sh", lines: ["$ run --belief shipping", "", "Shipping something", "imperfect is a creative act.", "", "$ _"] },
  { title: "belief_04.sh", lines: ["$ run --belief draft", "", "The draft that embarrasses", "you moves things forward.", "", "$ _"] },
  { title: "belief_05.sh", lines: ["$ run --belief rest", "", "Rest is part of the process,", "not a break from it.", "", "$ _"] },
  { title: "belief_06.sh", lines: ["$ run --belief skip", "", "What you skip", "reveals what you value.", "", "$ _"] },
  { title: "belief_07.sh", lines: ["$ run --belief tool", "", "The tool shapes the thought", "as much as the thought", "shapes the tool.", "", "$ _"] },
  { title: "belief_08.sh", lines: ["$ run --belief feedback", "", "Feedback is data,", "not verdict.", "", "$ _"] },
];

interface TermWindow {
  id: number;
  beliefIdx: number;
  x: number;
  y: number;
  closing: boolean;
}

let nextId = 1;

export default function BeliefsPage() {
  const [terms, setTerms] = useState<TermWindow[]>([]);
  const [diceRolling, setDiceRolling] = useState(false);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const resetTimer = (id: number) => {
    const old = timers.current.get(id);
    if (old) clearTimeout(old);
    const timer = setTimeout(() => dismiss(id), 5000);
    timers.current.set(id, timer);
  };

  const dismiss = (id: number) => {
    setTerms(prev => prev.map(t => t.id === id ? { ...t, closing: true } : t));
    setTimeout(() => setTerms(prev => prev.filter(t => t.id !== id)), 480);
    const timer = timers.current.get(id);
    if (timer) { clearTimeout(timer); timers.current.delete(id); }
  };

  const MAX_TERMS = 15;

  const handleDiceClick = () => {
    setDiceRolling(true);
    setTimeout(() => setDiceRolling(false), 560);
    spawnTerminal();
  };

  const spawnTerminal = () => {
    const id = nextId++;
    const beliefIdx = Math.floor(Math.random() * BELIEFS.length);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const x = 80 + Math.random() * (vw - 660);
    const y = 80 + Math.random() * (vh - 380);
    setTerms(prev => {
      const next = [...prev, { id, beliefIdx, x, y, closing: false }];
      if (next.length > MAX_TERMS) {
        const oldest = next[0];
        dismiss(oldest.id);
        return next.slice(1);
      }
      return next;
    });
    const timer = setTimeout(() => dismiss(id), 5000);
    timers.current.set(id, timer);
  };

  useEffect(() => {
    const t = timers.current;
    return () => { t.forEach(clearTimeout); };
  }, []);

  const drag = useRef<{ id: number; startX: number; startY: number; origX: number; origY: number } | null>(null);

  const onTitlePointerDown = (e: React.PointerEvent, id: number) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const t = terms.find(t => t.id === id)!;
    drag.current = { id, startX: e.clientX, startY: e.clientY, origX: t.x, origY: t.y };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const { id, startX, startY, origX, origY } = drag.current;
    resetTimer(id);
    setTerms(prev => prev.map(t =>
      t.id !== id ? t : { ...t, x: origX + e.clientX - startX, y: origY + e.clientY - startY }
    ));
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "#ffffff" }} onPointerMove={onPointerMove} onPointerUp={() => { drag.current = null; }}>
      <style>{`
        @keyframes crt-on {
          0%   { clip-path: inset(50% 0 50% 0); filter: brightness(5); }
          35%  { clip-path: inset(5% 0 5% 0);  filter: brightness(2); }
          100% { clip-path: inset(0% 0 0% 0);  filter: brightness(1); }
        }
        @keyframes crt-off {
          0%   { clip-path: inset(0% 0 0% 0);  filter: brightness(1); }
          65%  { clip-path: inset(45% 0 45% 0); filter: brightness(3); }
          100% { clip-path: inset(50% 0 50% 0); filter: brightness(0); opacity: 0; }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .terminal-cursor { animation: blink 1s step-start infinite; }
        @keyframes dice-roll {
          0%   { transform: rotate(0deg) scale(1); }
          15%  { transform: rotate(-25deg) scale(0.85) translateY(4px); }
          40%  { transform: rotate(200deg) scale(1.25) translateY(-8px); }
          65%  { transform: rotate(320deg) scale(0.9) translateY(2px); }
          82%  { transform: rotate(380deg) scale(1.08); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .dice-rolling { animation: dice-roll 0.55s cubic-bezier(0.36,0.07,0.19,0.97) forwards; }
      `}</style>

      {useMemo(() => (
        <div className="absolute inset-0">
          <FaultyTerminal
            scale={3} gridMul={[2, 1]} digitSize={2} timeScale={0.4}
            scanlineIntensity={0.4} glitchAmount={1} flickerAmount={0.8}
            noiseAmp={1} curvature={0} tint="#7c3aed"
            mouseReact mouseStrength={1.2} pageLoadAnimation brightness={0.8}
          />
        </div>
      ), [])}

      <Navbar light accent="#6d28d9" bg="rgba(255,255,255,0.92)" borderCol="rgba(109,40,217,0.2)" />

      {/* Dice icon — bottom left */}
      <button
        onClick={handleDiceClick}
        className="fixed bottom-4 left-4 z-50 flex items-center justify-center rounded-2xl overflow-hidden"
        style={{
          background: "#6d28d9",
          border: "1px solid rgba(109,40,217,0.4)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 28px rgba(109,40,217,0.4)",
          width: 88,
          height: 88,
        }}
        title="roll belief"
      >
        <Dices
          className={diceRolling ? "dice-rolling" : ""}
          style={{ width: 44, height: 44, color: "#ffffff" }}
          strokeWidth={1.5}
        />
      </button>

      {/* Terminal windows */}
      {terms.map(t => {
        const b = BELIEFS[t.beliefIdx];
        return (
          <div
            key={t.id}
            onMouseEnter={() => {
              const old = timers.current.get(t.id);
              if (old) { clearTimeout(old); timers.current.delete(t.id); }
            }}
            onMouseLeave={() => resetTimer(t.id)}
            style={{
              position: "fixed", left: t.x, top: t.y,
              width: 560, zIndex: 50,
              borderRadius: 8, overflow: "hidden",
              border: "1px solid rgba(109,40,217,0.18)",
              boxShadow: "0 8px 40px rgba(109,40,217,0.25), 0 2px 8px rgba(0,0,0,0.08)",
              animation: t.closing ? "crt-off 0.48s ease-in forwards" : "crt-on 0.55s ease-out forwards",
            }}
          >
            <div style={{ background: "#f0ebff", borderBottom: "1px solid rgba(109,40,217,0.12)", padding: "10px 12px", display: "flex", alignItems: "center", gap: 6, cursor: "grab" }} onPointerDown={e => onTitlePointerDown(e, t.id)}>
              <span
                style={{ width: 12, height: 12, borderRadius: "50%", background: "#6d28d9", display: "inline-block", cursor: "pointer" }}
                onPointerDown={e => { e.stopPropagation(); dismiss(t.id); }}
              />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#a78bfa", display: "inline-block" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ddd6fe", display: "inline-block" }} />
              <span style={{ marginLeft: 8, fontSize: 11, fontFamily: "monospace", color: "#6d28d9", opacity: 0.6 }}>{b.title}</span>
            </div>
            <div style={{ background: "#ffffff", padding: "18px 22px" }}>
              {b.lines.map((line, j) => (
                <div key={j} style={{ fontFamily: "monospace", fontSize: 18, color: line.startsWith("$") ? "#6d28d9" : "#1e1030", lineHeight: 2, opacity: line.startsWith("$") ? 1 : 0.7 }}>
                  {line === "$ _" ? <><span>$ </span><span className="terminal-cursor">_</span></> : (line || "\u00A0")}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
