import React from 'react';

const leafGradients = [
  'linear-gradient(135deg, #facc15 0%, #f59e0b 55%, #ef4444 100%)', // Gold/Red
  'linear-gradient(135deg, #fbbf24 0%, #d97706 60%, #92400e 100%)', // Amber/Brown
  'linear-gradient(135deg, #a3e635 0%, #65a30d 55%, #3f6212 100%)', // Lime/Green
  'linear-gradient(135deg, #f87171 0%, #dc2626 55%, #991b1b 100%)', // Red/Crimson
  'linear-gradient(135deg, #fb923c 0%, #ea580c 60%, #9a3412 100%)', // Orange/Rust
  'linear-gradient(135deg, #fde047 0%, #eab308 55%, #a16207 100%)'  // Yellow/Olive
];

const leaves = Array.from({ length: 45 }, (_, index) => {
  const seed = index + 1;
  return {
    x: (seed * 13.7) % 100,
    size: 7 + (seed % 8),
    fall: 12 + (seed % 8),
    sway: 3 + ((seed * 0.45) % 2.5),
    delay: -seed * 0.9,
    opacity: 0.35 + ((seed % 5) * 0.07),
    blur: 0.5 + (seed % 3) * 0.4,
    gradient: leafGradients[seed % leafGradients.length]
  };
});

const FallingLeaves = () => {
  return (
    <div className="leaf-fall-layer" aria-hidden="true">
      {leaves.map((leaf, index) => (
        <span
          key={`leaf-${index}`}
          className="leaf-particle"
          style={{
            left: `${leaf.x}%`,
            width: `${leaf.size}px`,
            height: `${Math.round(leaf.size * 0.7)}px`,
            opacity: leaf.opacity,
            filter: `blur(${leaf.blur}px) drop-shadow(0 1px 1px rgba(120, 38, 12, 0.15))`,
            background: leaf.gradient,
            animationDuration: `${leaf.fall}s, ${leaf.sway}s`,
            animationDelay: `${leaf.delay}s, ${leaf.delay / 2}s`
          }}
        />
      ))}
    </div>
  );
};

export default FallingLeaves;