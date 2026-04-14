"use client";

import TransitionLink from "./transition-link";

const navLinks = [
  { label: "Work & Expertise", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Beliefs", href: "/beliefs" },
  { label: "Connect", href: "/connect" },
];

export default function Navbar({ accent, light, bg, borderCol, hideLinks }: { accent?: string; light?: boolean; bg?: string; borderCol?: string; hideLinks?: boolean }) {
  const logoFill = light ? "#1e1030" : "#e8e0d4";
  const borderColor = borderCol ?? (light ? "rgba(109,40,217,0.2)" : "rgba(255,255,255,0.07)");
  const bgColor = bg ?? (light ? "rgba(250,247,255,0.88)" : "rgba(15,12,10,0.75)");
  const linkColor = light ? "#1e1030" : "#e8e0d4";
  const linkHoverBg = accent ?? "#6d28d9";
  const linkHoverText = "#ffffff";

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 py-2 flex items-start justify-between pointer-events-none">
      {/* Left — logo + name */}
      <TransitionLink
        href="/"
        className="pointer-events-auto inline-flex items-end gap-2.5 px-3 py-3 rounded-lg transition-opacity opacity-90 hover:opacity-100"
        style={{ border: `1px solid ${borderColor}`, background: bgColor, backdropFilter: "blur(10px)" }}
      >
        <svg viewBox="0 0 831 497" width={30} height={18} fill="none" aria-label="B2 home">
          <path
            d="M313.979 278.458C311.656 278.932 310.5 280.448 310.5 283C310.5 285.542 311.656 286.813 313.979 286.813C352.964 285.427 385.448 270.578 411.438 242.271C419.323 250.62 425.938 258.51 431.271 265.938C436.615 273.37 440.677 282.771 443.458 294.146C446.25 305.51 447.646 321.865 447.646 343.208C447.646 361.323 443.115 379.427 434.063 397.521C425.005 415.62 412.938 432.099 397.854 446.958C382.771 461.807 366.177 473.641 348.083 482.458C329.984 491.281 311.651 495.688 293.083 495.688H109.292C89.8021 495.688 71.7083 490.469 55 480.021C38.2917 469.578 24.9427 455.885 14.9583 438.938C4.98437 421.995 0 403.542 0 383.583V111.375C0 90.5 4.86458 71.8281 14.6042 55.3542C24.3542 38.8698 37.5833 25.7604 54.2917 16.0208C71 6.27084 89.3333 1.39584 109.292 1.39584H284.042C309.094 1.39584 332.297 7.55209 353.646 19.8542C375.005 32.1458 392.068 48.9688 404.833 70.3125C417.594 91.6615 423.979 115.563 423.979 142.021C423.979 163.828 419.104 184.25 409.354 203.292C399.604 222.323 386.484 238.333 370 251.333C353.526 264.323 334.854 273.365 313.979 278.458Z"
            fill={logoFill}
          />
          <path
            d="M499.142 496.375C478.725 496.375 460.043 491.271 443.1 481.063C426.168 470.854 412.71 457.281 402.725 440.333C392.751 423.391 387.767 404.938 387.767 384.979C387.767 368.271 391.361 352.844 398.559 338.688C405.751 324.536 414.454 311.656 424.663 300.042L536.059 189.354C537.902 187.495 538.132 185.641 536.746 183.792C535.356 181.932 533.501 181.469 531.184 182.396L474.079 222.771C452.272 217.677 434.402 208.745 420.475 195.979C406.559 183.219 396.579 168.479 390.538 151.771C384.512 135.063 382.309 117.891 383.934 100.25C385.559 82.6146 390.892 66.1354 399.934 50.8125C408.986 35.4948 421.632 23.1979 437.871 13.9167C454.121 4.64063 473.85 0 497.059 0H668.329C700.814 0 728.309 5.80729 750.809 17.4167C773.319 29.0156 791.08 44.3281 804.08 63.3542C817.08 82.3854 825.205 103.271 828.455 126.021C831.705 148.76 830.423 171.385 824.621 193.896C818.814 216.396 808.251 237.161 792.934 256.188C777.626 275.219 758.022 290.536 734.121 302.146C710.215 313.745 681.788 319.542 648.829 319.542H645.35C667.626 325.583 691.293 326.516 716.35 322.333C741.418 318.156 763.705 309.563 783.205 296.563C799.439 308.177 810.809 320.948 817.309 334.875C823.809 348.792 827.059 365.495 827.059 384.979C827.059 401.229 822.064 418.057 812.08 435.458C802.106 452.865 788.767 467.37 772.059 478.979C755.35 490.578 736.788 496.375 716.371 496.375H499.142Z"
            fill={logoFill}
          />
        </svg>
        <span className="text-xs font-mono font-bold" style={{ color: logoFill }}>
          Esteban Canales
        </span>
        <span className="text-xs font-mono" style={{ color: logoFill, opacity: 0.4 }}>—</span>
        <span className="text-xs font-mono" style={{ color: logoFill }}>
          Great Software Developer
        </span>
      </TransitionLink>

      {/* Right — nav links */}
      {!hideLinks && (
        <div
          className="pointer-events-auto inline-flex items-center gap-1 p-3 rounded-lg"
          style={{ border: `1px solid ${borderColor}`, background: bgColor, backdropFilter: "blur(10px)" }}
        >
          {navLinks.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className="nav-link-slide relative text-xs font-mono px-2 py-0.5 rounded overflow-hidden"
              style={{ color: linkColor, opacity: 0.6 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}
            >
              <span
                className="nav-link-bg absolute inset-0 rounded"
                style={{
                  background: linkHoverBg,
                  transform: "translateX(-101%)",
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                aria-hidden
              />
              <span
                className="nav-link-text relative z-10"
                style={{ "--nav-link-hover-text": linkHoverText } as React.CSSProperties}
              >
                {link.label}
              </span>
            </TransitionLink>
          ))}
        </div>
      )}
    </header>
  );
}
