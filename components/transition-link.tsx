"use client";

import { usePageTransition } from "./page-transition";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function TransitionLink({ href, children, className, style, onMouseEnter, onMouseLeave }: Props) {
  const { navigate } = usePageTransition();

  return (
    <a
      href={href}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}
