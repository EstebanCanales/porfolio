"use client";
import React, { useEffect, useRef } from "react";

export default function GameOfLifeBackground({
  cellSize = 6,
  color = "#e8e0d4",
  updateInterval = 80,
  initialDensity = 0.28,
  cellsTriggerRef,
  shipsTriggerRef,
  clickEnabledRef,
  dragEnabledRef,
}: {
  cellSize?: number;
  color?: string;
  updateInterval?: number;
  initialDensity?: number;
  cellsTriggerRef?: React.MutableRefObject<((positions: { nx: number; ny: number }[]) => void) | null>;
  shipsTriggerRef?: React.MutableRefObject<(() => void) | null>;
  clickEnabledRef?: React.MutableRefObject<boolean>;
  dragEnabledRef?: React.MutableRefObject<boolean>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0, rows = 0;
    let grid: Uint8Array, next: Uint8Array;
    let display: Float32Array;
    let raf = 0;
    let lastUpdate = 0;
    let stopped = false;
    const intervalRef = { current: updateInterval };
    let shipMode = 0; // 0=normal, 1=gliders, 2=lwss

    const initGrid = () => {
      cols = Math.ceil(canvas.width / cellSize);
      rows = Math.ceil(canvas.height / cellSize);
      grid    = new Uint8Array(cols * rows);
      next    = new Uint8Array(cols * rows);
      display = new Float32Array(cols * rows);
      for (let i = 0; i < grid.length; i++) {
        grid[i]    = Math.random() < initialDensity ? 1 : 0;
        display[i] = grid[i];
      }
    };

    let prevCols = 0, prevRows = 0;
    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width  = parent ? parent.clientWidth  : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : window.innerHeight;
      const newCols = Math.ceil(canvas.width  / cellSize);
      const newRows = Math.ceil(canvas.height / cellSize);
      if (newCols !== prevCols || newRows !== prevRows) {
        prevCols = newCols;
        prevRows = newRows;
        initGrid();
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);

    // Parse color once
    const tmp = document.createElement("canvas");
    tmp.width = tmp.height = 1;
    const tmpCtx = tmp.getContext("2d")!;
    tmpCtx.fillStyle = color;
    tmpCtx.fillRect(0, 0, 1, 1);
    const [r, g, b] = tmpCtx.getImageData(0, 0, 1, 1).data;

    // Add cells around a grid coordinate
    const addCellsAt = (gx: number, gy: number, radius = 2) => {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (Math.random() < 0.45) continue;
          const x = (gx + dx + cols) % cols;
          const y = (gy + dy + rows) % rows;
          grid[y * cols + x]    = 1;
          display[y * cols + x] = 1;
        }
      }
    };

    const step = () => {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let n = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              n += grid[((y + dy + rows) % rows) * cols + ((x + dx + cols) % cols)];
            }
          }
          const alive = grid[y * cols + x];
          next[y * cols + x] = alive ? (n === 2 || n === 3 ? 1 : 0) : (n === 3 ? 1 : 0);
        }
      }

      const tmp2 = grid; grid = next; next = tmp2;

      // Fade display
      for (let i = 0; i < display.length; i++) {
        if (grid[i]) display[i] = Math.min(1, display[i] + 0.3);
        else         display[i] = Math.max(0, display[i] - 0.12);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const half = (cellSize - 1) * 0.5;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v = display[y * cols + x];
          if (v <= 0) continue;
          ctx.fillStyle = `rgba(${r},${g},${b},${(v * 0.72).toFixed(3)})`;
          const cx = x * cellSize + cellSize * 0.5;
          const cy = y * cellSize + cellSize * 0.5;
          ctx.beginPath();
          ctx.moveTo(cx,        cy - half);
          ctx.lineTo(cx + half, cy       );
          ctx.lineTo(cx,        cy + half);
          ctx.lineTo(cx - half, cy       );
          ctx.closePath();
          ctx.fill();
        }
      }
    };

    const animate = (now: number) => {
      if (stopped) return;
      raf = requestAnimationFrame(animate);
      if (now - lastUpdate >= intervalRef.current) {
        step();
        lastUpdate = now;
      }
      draw();
    };

    raf = requestAnimationFrame(animate);

    // Pointer brush
    let pointerDown = false;
    let lastBrushGX = 0, lastBrushGY = 0;
    const BRUSH_SPACING = 1; // grid cells between brush stamps

    const toGrid = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        gx: Math.floor((e.clientX - rect.left) / cellSize),
        gy: Math.floor((e.clientY - rect.top)  / cellSize),
      };
    };

    const onPointerDown = (e: PointerEvent) => {
      if (clickEnabledRef && !clickEnabledRef.current) return;
      const { gx, gy } = toGrid(e);
      pointerDown  = true;
      lastBrushGX  = gx;
      lastBrushGY  = gy;
      addCellsAt(gx, gy);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointerDown) return;
      if (dragEnabledRef && !dragEnabledRef.current) return;
      const { gx, gy } = toGrid(e);
      const dx = gx - lastBrushGX;
      const dy = gy - lastBrushGY;
      if (dx * dx + dy * dy >= BRUSH_SPACING * BRUSH_SPACING) {
        addCellsAt(gx, gy);
        lastBrushGX = gx;
        lastBrushGY = gy;
      }
    };

    const onPointerUp    = () => { pointerDown = false; };
    const onPointerLeave = () => { pointerDown = false; };

    canvas.addEventListener("pointerdown",  onPointerDown,  { passive: true });
    canvas.addEventListener("pointermove",  onPointerMove,  { passive: true });
    canvas.addEventListener("pointerup",    onPointerUp,    { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });

    // Ship patterns — verified from LifeWiki, all travel East or SE
    const GLIDER_SE = [[1,0],[2,1],[0,2],[1,2],[2,2]];
    // LWSS — 9 cells, moves East, period 4
    const LWSS_E    = [[1,0],[4,0],[0,1],[0,2],[4,2],[0,3],[1,3],[2,3],[3,3]];
    // HWSS — 15 cells, moves East, period 4 (LifeWiki RLE b4ob$o4bo$6bo$o5bo$b6o)
    const HWSS_E    = [[1,0],[2,0],[3,0],[4,0],[0,1],[5,1],[6,2],[0,3],[6,3],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4]];

    const placePattern = (pattern: number[][], gx: number, gy: number) => {
      for (const [dx, dy] of pattern) {
        const x = gx + dx; const y = gy + dy;
        if (x >= 0 && x < cols && y >= 0 && y < rows) {
          grid[y * cols + x] = 1;
          display[y * cols + x] = 1;
        }
      }
    };

    const spawnNormal = () => {
      for (let i = 0; i < grid.length; i++) {
        grid[i] = Math.random() < initialDensity ? 1 : 0;
        display[i] = grid[i];
      }
      intervalRef.current = updateInterval;
    };

    // Full grid fill with safe padding so ships never spawn touching a border
    const spawnGrid = (pattern: number[][], stepX: number, stepY: number) => {
      grid.fill(0); display.fill(0);
      intervalRef.current = updateInterval;
      let row = 0;
      for (let gy = 0; gy < rows; gy += stepY, row++) {
        const xOffset = (row * Math.floor(stepX / 2)) % stepX;
        for (let gx = xOffset - stepX; gx < cols + stepX; gx += stepX) {
          placePattern(pattern, gx, gy);
        }
      }
    };

    if (shipsTriggerRef) {
      shipsTriggerRef.current = () => {
        shipMode = (shipMode + 1) % 3;
        if      (shipMode === 1) spawnGrid(GLIDER_SE,  8,  9);
        else if (shipMode === 2) spawnGrid(LWSS_E,    12,  9);
        else                     spawnNormal();
      };
    }

    // External trigger (B key burst)
    if (cellsTriggerRef) {
      cellsTriggerRef.current = (positions) => {
        positions.forEach(({ nx, ny }) => {
          addCellsAt(Math.floor(nx * cols), Math.floor(ny * rows), 3);
        });
      };
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (cellsTriggerRef) cellsTriggerRef.current = null;
      if (shipsTriggerRef) shipsTriggerRef.current = null;
    };
  }, [cellSize, color, updateInterval, initialDensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block", cursor: "crosshair" }}
    />
  );
}
