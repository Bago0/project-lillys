import { useMemo } from 'react';
import GlowingLily from './components/GlowingLily';

function App() {
  return (
    <div className="min-h-screen overflow-hidden relative" style={{ backgroundColor: '#40E0D0' }}>
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-0">
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
    const count = 60;
    for (let i = 0; i < count; i++) {
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const leftPercent = 5 + Math.random() * 90; // avoid edges
      const bottomPx = 40 + Math.random() * 140; // ground band
      const rotation = -12 + Math.random() * 24;
      const baseStem = size === 'large' ? 150 : size === 'medium' ? 130 : 110;
      const stemHeightPx = baseStem + Math.floor(Math.random() * 40);
      const delay = Math.round(Math.random() * 20) / 10;
      const zIndex = Math.floor(bottomPx); // deeper bottom closer to viewer
      items.push({ id: i, leftPercent, bottomPx, size, color, rotation, stemHeightPx, delay, zIndex });
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