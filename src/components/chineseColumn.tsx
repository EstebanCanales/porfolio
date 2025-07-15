"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const chineseChars = [
  "人",
  "大",
  "小",
  "日",
  "月",
  "山",
  "水",
  "火",
  "木",
  "空",
];

interface ChineseColumnProps {
  fontSize?: number;
  textColor?: string;
  glowColor?: string;
  direction?: "up" | "down" | "left" | "right";
  speed?: number;
  spacing?: number;
  className?: string;
}

export default function ChineseColumn({
  fontSize = 40,
  textColor = "#e6e6e6",
  glowColor = "#e6e6e6",
  direction = "down",
  speed = 1,
  spacing = 0,
  className = "",
}: ChineseColumnProps) {
  const [characters, setCharacters] = useState<string[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    const isHorizontal = direction === "left" || direction === "right";
    const screenSize = isHorizontal ? window.innerWidth : window.innerHeight;
    const charSize = fontSize + spacing;
    const numChars = Math.ceil((screenSize * 2) / charSize);

    const newChars = Array.from(
      { length: numChars },
      () => chineseChars[Math.floor(Math.random() * chineseChars.length)],
    );
    setCharacters(newChars);
  }, [fontSize, spacing, direction]);

  useEffect(() => {
    if (characters.length === 0) return;

    const totalSize = characters.length * (fontSize + spacing);

    const animation = {
      transition: {
        duration: totalSize / (speed * 100),
        ease: "linear",
        repeat: Infinity,
      },
    };

    switch (direction) {
      case "up":
        (animation as any).y = [totalSize, 0];
        break;
      case "down":
        (animation as any).y = [0, -totalSize];
        break;
      case "left":
        (animation as any).x = [totalSize, 0];
        break;
      case "right":
        (animation as any).x = [0, -totalSize];
        break;
    }

    controls.start(animation);
  }, [characters, controls, direction, fontSize, spacing, speed]);

  const getFlexDirection = () => {
    switch (direction) {
      case "up":
        return "column-reverse";
      case "down":
        return "column";
      case "left":
        return "row-reverse";
      case "right":
        return "row";
      default:
        return "column";
    }
  };

  const isHorizontal = direction === "left" || direction === "right";

  return (
    <div
      className={`absolute inset-0 overflow-hidden flex items-center ${className}`}>
      <motion.div
        className="flex"
        style={{ flexDirection: getFlexDirection() as any }}
        animate={controls}
      >
        {[...Array(2)].map((_, groupIndex) => (
          <div
            key={groupIndex}
            className="flex"
            style={{ flexDirection: getFlexDirection() as any }}
          >
            {characters.map((char, index) => (
              <div
                key={`${groupIndex}-${index}`}
                className="font-mono select-none flex-shrink-0 flex items-center justify-center"
                style={{
                  fontSize: `${fontSize}px`,
                  color: textColor,
                  textShadow: `0 0 15px ${glowColor}, 0 0 25px ${glowColor}`,
                  [isHorizontal ? "width" : "height"]:
                    `${fontSize + spacing}px`,
                  [isHorizontal ? "height" : "width"]: "auto",
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}