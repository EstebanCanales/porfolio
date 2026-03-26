"use client";

import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const TransitionCtx = createContext<{ navigate: (href: string) => void }>({ navigate: () => {} });

export function usePageTransition() {
  return useContext(TransitionCtx);
}

const JOKES = [
  "reticulating splines...",
  "touching grass. please wait.",
  "asking the intern.",
  "loading personality...",
  "pretending to be busy.",
  "vibes compiling.",
  "404: chill not found.",
  "turning it off and on again.",
  "deploying sarcasm...",
  "running on caffeine and regret.",
  "this is fine. 🔥",
  "git push --force (uh oh)",
  "have you tried rubber duck debugging?",
  "npm install feelings",
];

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const [joke, setJoke] = useState("");
  const pendingHref = useRef<string>("");
  const overlayRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback((href: string) => {
    if (href === window.location.pathname) return;
    pendingHref.current = href;
    setJoke(JOKES[Math.floor(Math.random() * JOKES.length)]);
    setPhase("in");
  }, []);

  useEffect(() => {
    if (phase !== "in") return;
    const t = setTimeout(() => {
      router.push(pendingHref.current);
    }, 1200);
    return () => clearTimeout(t);
  }, [phase, router]);

  useEffect(() => {
    if (phase === "in") {
      setPhase("out");
      const t = setTimeout(() => setPhase("idle"), 550);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "#ffffff",
    zIndex: 9999,
    pointerEvents: phase !== "idle" ? "all" : "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform:
      phase === "in"  ? "translateY(0%)"   :
      phase === "out" ? "translateY(-100%)" :
      "translateY(100%)",
    transition:
      phase === "in"  ? "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)"  :
      phase === "out" ? "transform 0.55s cubic-bezier(0.76, 0, 0.24, 1)" :
      "none",
  };

  return (
    <TransitionCtx.Provider value={{ navigate }}>
      {children}
      <div ref={overlayRef} style={overlayStyle} aria-hidden>
        <p style={{
          fontFamily: "monospace",
          fontSize: 13,
          color: "#6d28d9",
          opacity: phase === "in" ? 0.7 : 0,
          transition: "opacity 0.3s ease",
          transitionDelay: phase === "in" ? "0.3s" : "0s",
          letterSpacing: "0.01em",
        }}>
          {joke}
        </p>
      </div>
    </TransitionCtx.Provider>
  );
}
