const DEFAULT_HINTS: [string, string][] = [
  ["click", "ripple"],
  ["hold + drag", "paint"],
  ["B", "burst"],
];

export default function Footer({
  accent,
  light,
  hints,
}: {
  accent?: string;
  light?: boolean;
  hints?: [string, string][];
}) {
  const color = accent ?? (light ? "#1a0f08" : "#e8e0d4");
  const borderColor = light ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.07)";
  const bgColor = light ? "rgba(245,240,235,0.85)" : "rgba(15,12,10,0.75)";
  const rows = hints ?? DEFAULT_HINTS;

  if (rows.length === 0) return null;

  return (
    <footer className="relative z-10 flex justify-end px-3 pb-3">
      <div
        className="inline-flex flex-col gap-1.5 px-3 py-2.5 rounded-lg"
        style={{
          border: `1px solid ${borderColor}`,
          background: bgColor,
          backdropFilter: "blur(10px)",
        }}
      >
        {rows.map(([key, action]) => (
          <span key={key} className="text-xs font-mono whitespace-nowrap" style={{ color, opacity: 0.6 }}>
            <span className="font-bold" style={{ opacity: 1 }}>{key}</span>
            <span style={{ opacity: 0.4 }}> → </span>
            {action}
          </span>
        ))}
      </div>
    </footer>
  );
}
