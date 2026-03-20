"use client";

import { useId, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  src: string;
  active: boolean;
  delay?: number;
}

export function GlitchReveal({ src, active, delay = 0 }: Props) {
  // useId produces colons which are invalid in SVG IDs
  const uid = useId().replace(/:/g, "");
  const filterId = `gd-${uid}`;

  const turbRef  = useRef<SVGFETurbulenceElement>(null);
  const displRef = useRef<SVGFEDisplacementMapElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const tlRef    = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const turb = turbRef.current;
    const disp = displRef.current;
    const wrap = wrapRef.current;
    if (!turb || !disp || !wrap) return;

    // Build timeline once
    if (!tlRef.current) {
      tlRef.current = gsap
        .timeline({ paused: true })
        // start state
        .set(turb, { attr: { baseFrequency: "0.09 0.06" } })
        .set(disp, { attr: { scale: 180 } })
        .set(wrap, { opacity: 0, scale: 1.04 })
        // animate in
        .to(wrap,  { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }, 0)
        .to(turb,  { attr: { baseFrequency: "0.001 0.001" }, duration: 0.9, ease: "power3.out" }, 0)
        .to(disp,  { attr: { scale: 0 }, duration: 0.9, ease: "power3.out" }, 0);
    }

    if (active) {
      tlRef.current.delay(delay).restart();
    } else {
      tlRef.current.pause(0);
    }
  }, [active, delay]);

  return (
    <div ref={wrapRef} className="absolute inset-0" style={{ opacity: 0 }}>
      {/* SVG filter definition — zero dimensions, just a registry */}
      <svg width="0" height="0" className="absolute overflow-hidden">
        <defs>
          <filter
            id={filterId}
            x="-25%"
            y="-25%"
            width="150%"
            height="150%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbRef}
              type="turbulence"
              baseFrequency="0.09 0.06"
              numOctaves="4"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              ref={displRef}
              in="SourceGraphic"
              in2="noise"
              scale="180"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Regular img — Next/Image can't receive SVG filter via style */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover"
        style={{ filter: `url(#${filterId})` }}
      />
    </div>
  );
}
