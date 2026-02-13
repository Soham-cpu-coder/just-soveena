import React, { useEffect, useMemo } from "react";

const FloatingHearts: React.FC = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 4,
        size: 16 + Math.random() * 24,
        emoji: ["💖", "❤️", "💕", "💗", "💝", "🌹"][Math.floor(Math.random() * 6)],
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animation: `float-heart ${h.duration}s ease-in-out ${h.delay}s infinite`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};

const Confetti: React.FC = () => {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
        color: [
          "hsl(350 80% 55%)",
          "hsl(45 90% 55%)",
          "hsl(340 60% 70%)",
          "hsl(0 80% 65%)",
          "hsl(30 90% 60%)",
          "hsl(320 70% 60%)",
        ][Math.floor(Math.random() * 6)],
        size: 6 + Math.random() * 8,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

const Sparkles: React.FC = () => {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 1.5 + Math.random() * 2,
        size: 8 + Math.random() * 16,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: `${s.size}px`,
            animation: `sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
};

export const CelebrationEffects: React.FC = () => (
  <>
    <FloatingHearts />
    <Confetti />
    <Sparkles />
  </>
);
