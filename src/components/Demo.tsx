"use client";

import { useState } from "react";
import ChineseColumn from "./chineseColumn";

export default function Demo() {
  const [fontSize, setFontSize] = useState(40);
  const [textColor, setTextColor] = useState("#00ff00");
  const [glowColor, setGlowColor] = useState("#00ff00");
  const [speed, setSpeed] = useState(1);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Controles */}
      <div className="absolute top-4 left-4 z-10 bg-gray-900 p-4 rounded-lg border border-gray-700 max-w-xs">
        <h3 className="text-white text-lg font-bold mb-4">Controles</h3>

        {/* Tamaño de fuente */}
        <div className="mb-4">
          <label className="text-white text-sm block mb-2">
            Tamaño: {fontSize}px
          </label>
          <input
            type="range"
            min="20"
            max="80"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Velocidad */}
        <div className="mb-4">
          <label className="text-white text-sm block mb-2">
            Velocidad: {speed}
          </label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Color del texto */}
        <div className="mb-4">
          <label className="text-white text-sm block mb-2">
            Color del texto
          </label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-8 rounded"
          />
        </div>

        {/* Color del brillo */}
        <div className="mb-4">
          <label className="text-white text-sm block mb-2">
            Color del brillo
          </label>
          <input
            type="color"
            value={glowColor}
            onChange={(e) => setGlowColor(e.target.value)}
            className="w-full h-8 rounded"
          />
        </div>
      </div>

      {/* Columna de caracteres */}
      <ChineseColumn
        fontSize={fontSize}
        textColor={textColor}
        glowColor={glowColor}
        direction="up"
        speed={speed}
        className="absolute inset-0"
      />
    </div>
  );
}
