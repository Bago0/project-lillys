import { useMemo } from 'react';
import GlowingLily from './components/GlowingLily';
import NameSignature from './components/NameSignature';

function App() {
  return (
    <div className="min-h-screen overflow-hidden relative" style={{ backgroundColor: '#40E0D0' }}>
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-0">
        <NameSignature />
        {/* Lily Field */}
        <LilyField />
      </div>
    </div>
  );
}

export default App;

type LilyConfig = {
  id: number;
  leftPercent: number;
  bottomPx: number;
  size: 'small' | 'medium' | 'large';
  color: 'pink' | 'white' | 'purple' | 'lavender' | 'rose';
  rotation: number;
  stemHeightPx: number;
  delay: number;
  zIndex: number;
};

function LilyField() {
  const lilies = useMemo<LilyConfig[]>(() => {
    const colors: LilyConfig['color'][] = ['pink', 'white', 'purple', 'lavender', 'rose'];
    const sizes: LilyConfig['size'][] = ['small', 'medium', 'large'];
    const items: LilyConfig[] = [];
    const totalCount = 42;
    const edgePerSide = 3; // place a few on each edge, not too many
    const normalCount = totalCount - edgePerSide * 2;

    // Normal distributed lilies (allow closer to edges but mostly center)
    for (let i = 0; i < normalCount; i++) {
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const leftPercent = 2 + Math.random() * 96; // include edges lightly
      const bottomPx = 40 + Math.random() * 140;
      const rotation = -12 + Math.random() * 24;
      const baseStem = size === 'large' ? 150 : size === 'medium' ? 130 : 110;
      const stemHeightPx = baseStem + Math.floor(Math.random() * 40);
      const delay = Math.round(Math.random() * 20) / 10;
      const zIndex = Math.floor(bottomPx);
      items.push({ id: i, leftPercent, bottomPx, size, color, rotation, stemHeightPx, delay, zIndex });
    }

    // Edge lilies on left and right with slight jitter
    const leftEdgeTargets = [1.5, 3.5, 5.5];
    const rightEdgeTargets = [94.5, 96.5, 98.5];
    let id = normalCount;
    for (let t = 0; t < edgePerSide; t++) {
      const jitterL = (Math.random() - 0.5) * 1.5;
      const jitterR = (Math.random() - 0.5) * 1.5;
      const sizeL = sizes[Math.floor(Math.random() * sizes.length)];
      const colorL = colors[Math.floor(Math.random() * colors.length)];
      const leftPercentL = Math.max(0.5, Math.min(99.5, leftEdgeTargets[t] + jitterL));
      const bottomPxL = 40 + Math.random() * 140;
      const rotationL = -10 + Math.random() * 20;
      const baseStemL = sizeL === 'large' ? 150 : sizeL === 'medium' ? 130 : 110;
      const stemHeightPxL = baseStemL + Math.floor(Math.random() * 40);
      const delayL = Math.round(Math.random() * 20) / 10;
      const zIndexL = Math.floor(bottomPxL);
      items.push({ id: id++, leftPercent: leftPercentL, bottomPx: bottomPxL, size: sizeL, color: colorL, rotation: rotationL, stemHeightPx: stemHeightPxL, delay: delayL, zIndex: zIndexL });

      const sizeR = sizes[Math.floor(Math.random() * sizes.length)];
      const colorR = colors[Math.floor(Math.random() * colors.length)];
      const leftPercentR = Math.max(0.5, Math.min(99.5, rightEdgeTargets[t] + jitterR));
      const bottomPxR = 40 + Math.random() * 140;
      const rotationR = -10 + Math.random() * 20;
      const baseStemR = sizeR === 'large' ? 150 : sizeR === 'medium' ? 130 : 110;
      const stemHeightPxR = baseStemR + Math.floor(Math.random() * 40);
      const delayR = Math.round(Math.random() * 20) / 10;
      const zIndexR = Math.floor(bottomPxR);
      items.push({ id: id++, leftPercent: leftPercentR, bottomPx: bottomPxR, size: sizeR, color: colorR, rotation: rotationR, stemHeightPx: stemHeightPxR, delay: delayR, zIndex: zIndexR });
    }
    return items.sort((a, b) => a.bottomPx - b.bottomPx); // back-to-front layering
  }, []);

  return (
    <div className="relative w-full" style={{ height: '100vh' }}>
      {/* ground */}
      <div className="absolute inset-x-0 bottom-0" style={{ height: 140 }}>
        <div className="absolute inset-x-0 bottom-0 h-full" style={{
          background: 'linear-gradient(180deg, rgba(16,185,129,0.25) 0%, rgba(5,150,105,0.55) 60%, rgba(6,95,70,0.8) 100%)'
        }} />
        <div className="absolute inset-x-0 bottom-0" style={{ height: 18, background: 'linear-gradient(180deg, rgba(6,95,70,0.9) 0%, rgba(4,78,61,1) 100%)' }} />
      </div>
      {lilies.map((lily, i) => (
        <div
          key={lily.id}
          className="absolute"
          style={{
            left: `${lily.leftPercent}%`,
            bottom: lily.bottomPx,
            zIndex: lily.zIndex,
            pointerEvents: 'auto',
            transform: 'translateZ(0) scale(var(--grow-scale, 1))',
            transformOrigin: 'bottom center',
            animation: `growFromBase 1.2s ease-out both ${0.04 * i}s`
          }}
        >
          {/* ground contact shadow to anchor the stem */}
          <div
            className="absolute left-1/2"
            style={{
              width: 28,
              height: 6,
              bottom: -4,
              transform: 'translateX(-50%)',
              borderRadius: 9999,
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 70%, rgba(0,0,0,0) 100%)',
              filter: 'blur(1px)',
              opacity: 0.7
            }}
          />
          <GlowingLily
            size={lily.size}
            delay={lily.delay}
            color={lily.color}
            rotation={lily.rotation}
            stemHeightPx={lily.stemHeightPx}
            yOffset={0}
            xOffset={0}
            zIndex={lily.zIndex}
          />
        </div>
      ))}
    </div>
  );
}