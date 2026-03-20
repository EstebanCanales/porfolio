import {Github, Mail, Linkedin } from "lucide-react";

export default function Footer({ accent }: { accent?: string }) {
  const linkColor = accent ? `${accent}90` : undefined;

  return (
    <footer className="relative z-10 px-6 md:px-10 lg:px-16 py-10 border-t border-border/15">
<div className="relative flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <p
            className="text-l font-mono font-medium tracking-tight"
            style={{ color: accent ?? "#e8e0d4" }}
          >
            Esteban Canales Monge
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/80 status-dot" />
            <span className="text-[10px] text-muted-foreground/60 font-mono">
              Available for work
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/EstebanCanales"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[16px] font-mono transition-opacity hover:opacity-100 opacity-60 flex items-center gap-1.5"
            style={{ color: linkColor ?? "#e8e0d4" }}
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
            <span>github</span>
          </a>
          <span className="text-muted-foreground/20">|</span>
          <a
            href="https://www.linkedin.com/in/esteban-canale-monge-21417a32a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[16px] font-mono transition-opacity hover:opacity-100 opacity-60 flex items-center gap-1.5"
            style={{ color: linkColor ?? "#e8e0d4" }}
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
            <span>linkedin</span>
          </a>
          <span className="text-muted-foreground/20">|</span>
          <a
            href="mailto:ecanalesm@outlook.es"
            className="text-[16px] font-mono transition-opacity hover:opacity-100 opacity-60 flex items-center gap-1.5"
            style={{ color: linkColor ?? "#e8e0d4" }}
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
            <span>email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
