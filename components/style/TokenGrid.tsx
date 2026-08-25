"use client";

import { useEffect, useState } from "react";

function lum(r: number, g: number, b: number) {
  const f = (c: number) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(a: string, b: string): number | null {
  const hex = /^#([0-9a-f]{6})$/i;
  if (!hex.test(a) || !hex.test(b)) return null;
  const p = (s: string): [number, number, number] => [
    parseInt(s.slice(1, 3), 16),
    parseInt(s.slice(3, 5), 16),
    parseInt(s.slice(5, 7), 16),
  ];
  const l1 = lum(...p(a));
  const l2 = lum(...p(b));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export type TokenSpec = { token: string; usage: string };

export default function TokenGrid({ tokens }: { tokens: TokenSpec[] }) {
  const [state, setState] = useState<
    Record<string, { value: string; ratio: number | null }>
  >({});

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const cs = getComputedStyle(document.documentElement);
      const porcelain = cs.getPropertyValue("--color-porcelain").trim();
      const next: Record<string, { value: string; ratio: number | null }> = {};
      for (const { token } of tokens) {
        const value = cs.getPropertyValue(token).trim();
        next[token] = {
          value: value || "(unset)",
          ratio: contrast(value, porcelain),
        };
      }
      setState(next);
    });
    return () => cancelAnimationFrame(raf);
  }, [tokens]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tokens.map(({ token, usage }) => {
        const s = state[token];
        const r = s?.ratio;
        return (
          <div
            key={token}
            className="rounded-card border border-titanium/15 bg-porcelain p-4"
          >
            <div
              className="h-14 w-full rounded-card border border-titanium/20"
              style={{ background: `var(${token})` }}
            />
            <p className="mt-3 font-mono text-sm text-navy">{token}</p>
            <p className="mt-0.5 font-mono text-xs text-slate">
              {s ? s.value : "…"}
            </p>
            <p className="mt-2 text-sm text-slate">{usage}</p>
            <p className="mt-2 text-xs text-slate">
              {typeof r !== "number" ? (
                "contrast: n/a (non-hex or unset)"
              ) : (
                <>
                  vs porcelain:{" "}
                  <span
                    className={
                      r >= 4.5
                        ? "font-semibold text-teal-deep"
                        : "font-semibold text-navy"
                    }
                  >
                    {r.toFixed(2)}:1
                  </span>{" "}
                  ({r >= 4.5 ? "AA text" : r >= 3 ? "large text only" : "decoration only"})
                </>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
