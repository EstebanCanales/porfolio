"use client";

import { useEffect, useRef } from "react";

interface Ribbon {
  y: number;         // posición base vertical (0-1)
  speed: number;     // velocidad de ondulación
  phase: number;     // fase inicial
  amp: number;       // amplitud de la onda
  freq: number;      // frecuencia de la curva
  width: number;     // grosor del trazo
  opacity: number;   // opacidad máxima
  colorStop: number; // qué tan violeta vs lavanda (0-1)
  offset: number;    // desfase en X para la animación
}

function makeRibbon(i: number, total: number): Ribbon {
  const t = i / total;
  return {
    y: 0.08 + t * 0.84,
    speed: 0.12 + Math.random() * 0.18,
    phase: Math.random() * Math.PI * 2,
    amp: 0.04 + Math.random() * 0.08,
    freq: 1.2 + Math.random() * 1.4,
    width: 1.2 + Math.random() * 2.8,
    opacity: 0.08 + Math.random() * 0.22,
    colorStop: Math.random(),
    offset: Math.random() * 1000,
  };
}

const RIBBON_COUNT = 28;

export default function AuroraRibbons({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const ribbons: Ribbon[] = Array.from({ length: RIBBON_COUNT }, (_, i) =>
      makeRibbon(i, RIBBON_COUNT)
    );

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw(t: number) {
      const W = canvas!.width;
      const H = canvas!.height;
      ctx.clearRect(0, 0, W, H);

      for (const r of ribbons) {
        const time = t * r.speed + r.offset;

        // Puntos de la curva: de izquierda a derecha con ondulaciones verticales
        const x0 = -W * 0.05;
        const x3 = W * 1.05;
        const cx = W * 0.35;
        const cx2 = W * 0.65;

        const baseY = r.y * H;
        const y0 = baseY + Math.sin(time * r.freq + r.phase) * r.amp * H;
        const y1 = baseY + Math.sin(time * r.freq + r.phase + 0.8) * r.amp * H * 1.3;
        const y2 = baseY + Math.sin(time * r.freq + r.phase + 1.6) * r.amp * H * 1.1;
        const y3 = baseY + Math.sin(time * r.freq + r.phase + 2.4) * r.amp * H;

        // Gradiente horizontal: transparent → color → transparent
        const grad = ctx.createLinearGradient(x0, 0, x3, 0);

        // Mezcla entre violeta puro y lavanda según colorStop
        const purple = r.colorStop > 0.6 ? "109,40,217" : r.colorStop > 0.3 ? "139,92,246" : "167,139,250";

        grad.addColorStop(0, `rgba(${purple}, 0)`);
        grad.addColorStop(0.2, `rgba(${purple}, ${r.opacity * 0.6})`);
        grad.addColorStop(0.5, `rgba(${purple}, ${r.opacity})`);
        grad.addColorStop(0.8, `rgba(${purple}, ${r.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(${purple}, 0)`);

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.bezierCurveTo(cx, y1, cx2, y2, x3, y3);

        ctx.strokeStyle = grad;
        ctx.lineWidth = r.width;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
}
