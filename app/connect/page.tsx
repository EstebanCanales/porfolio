"use client";

import Navbar from "@/components/navbar";

const H = 6;
const C = "#6d28d9";

const handles: { style: React.CSSProperties }[] = [
  // esquinas
  { style: { top: -H/2,     left: -H/2     } },
  { style: { top: -H/2,     right: -H/2    } },
  { style: { bottom: -H/2,  left: -H/2     } },
  { style: { bottom: -H/2,  right: -H/2    } },
  // centros de lado
  { style: { top: -H/2,     left: "calc(50% - 3px)" } },
  { style: { bottom: -H/2,  left: "calc(50% - 3px)" } },
  { style: { top: "calc(50% - 3px)", left: -H/2     } },
  { style: { top: "calc(50% - 3px)", right: -H/2    } },
];

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-[#faf7ff] flex flex-col">
      <Navbar light accent="#6d28d9" bg="rgba(250,247,255,0.92)" borderCol="rgba(109,40,217,0.2)" />
      <div className="flex-1 flex items-center justify-center">

        <div style={{ position: "relative", padding: "14px 22px", display: "inline-block" }}>

          {/* Borde de selección */}
          <span style={{
            position: "absolute", inset: 0,
            border: `1px solid rgba(109,40,217,0.45)`,
            pointerEvents: "none",
          }} />

          {/* Handles */}
          {handles.map((h, i) => (
            <span key={i} style={{
              position: "absolute",
              width: H, height: H,
              background: C,
              pointerEvents: "none",
              ...h.style,
            }} />
          ))}

          <a
            href="https://github.com/EstebanCanales"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono font-light"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 4rem)",
              color: C,
              lineHeight: 1,
              display: "block",
              position: "relative",
              zIndex: 1,
              transition: "transform 0.25s cubic-bezier(0.34,1.4,0.64,1), color 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              (e.currentTarget as HTMLElement).style.color = "#4c1d95";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.color = C;
            }}
          >
            @EstebanCanales
          </a>
        </div>

      </div>
    </div>
  );
}
