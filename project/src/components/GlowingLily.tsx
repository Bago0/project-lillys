import { useState } from 'react';

interface GlowingLilyProps {
  size: 'small' | 'medium' | 'large';
  delay: number;
  color: 'pink' | 'white' | 'purple' | 'lavender' | 'rose';
  yOffset?: number;
  xOffset?: number;
  zIndex?: number;
  rotation?: number;
  stemHeightPx?: number;
}

const GlowingLily = ({ size, delay, color, yOffset = 0, xOffset = 0, zIndex = 0, rotation = 0, stemHeightPx }: GlowingLilyProps) => {
  const [isActive, setIsActive] = useState(false);

  const sizeClasses = {
    small: 'w-24 h-24',
    medium: 'w-32 h-32',
    large: 'w-40 h-40'
  };

  const stemHeights = {
    small: '80px',
    medium: '100px',
    large: '120px'
  };

  const colorSchemes = {
    pink: {
      outer: 'from-pink-500 via-pink-300 to-pink-100',
      inner: 'from-pink-300 via-pink-100 to-white',
      center: 'from-yellow-400 via-yellow-200 to-orange-200',
      glow: '#ff69b4',
      shadow: 'rgba(255, 105, 180, 0.6)'
    },
    white: {
      outer: 'from-gray-200 via-white to-gray-50',
      inner: 'from-white via-gray-50 to-white',
      center: 'from-yellow-300 via-yellow-100 to-white',
      glow: '#ffffff',
      shadow: 'rgba(255, 255, 255, 0.8)'
    },
    purple: {
      outer: 'from-purple-600 via-purple-400 to-purple-200',
      inner: 'from-purple-300 via-purple-100 to-white',
      center: 'from-orange-400 via-yellow-300 to-yellow-100',
      glow: '#9333ea',
      shadow: 'rgba(147, 51, 234, 0.6)'
    },
    lavender: {
      outer: 'from-purple-400 via-purple-200 to-purple-100',
      inner: 'from-purple-200 via-purple-50 to-white',
      center: 'from-yellow-300 via-yellow-100 to-white',
      glow: '#c084fc',
      shadow: 'rgba(192, 132, 252, 0.6)'
    },
    rose: {
      outer: 'from-rose-500 via-rose-300 to-rose-100',
      inner: 'from-rose-300 via-rose-100 to-white',
      center: 'from-yellow-400 via-yellow-200 to-orange-100',
      glow: '#f43f5e',
      shadow: 'rgba(244, 63, 94, 0.6)'
    }
  };

  const scheme = colorSchemes[color];

  return (
    <div 
      className={`relative cursor-pointer transform transition-all duration-700 hover:scale-110 ${sizeClasses[size]}`}
      onClick={() => setIsActive(!isActive)}
      style={{
        animation: `gentleFloat 6s ease-in-out infinite ${delay}s`,
        marginTop: yOffset,
        marginLeft: xOffset,
        zIndex,
        transform: `rotate(${rotation}deg)`
      }}
    >
      {/* Main Lily Flower */}
      <div className="relative w-full h-full">
        
        {/* Outer Petals Layer */}
        {[0, 60, 120, 180, 240, 300].map((rotation, index) => (
          <div
            key={`outer-${index}`}
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              transform: `translate(-50%, -85%) rotate(${rotation}deg) rotate(var(--petal-rotate, 0deg)) scale(var(--petal-scale, 1))`,
              animation: `petalSway 8s ease-in-out infinite ${delay + index * 0.2}s`
            }}
          >
            <div 
              className={`bg-gradient-to-t ${scheme.outer} ${isActive ? 'animate-pulse' : ''}`}
              style={{
                width: size === 'large' ? '28px' : size === 'medium' ? '22px' : '18px',
                height: size === 'large' ? '60px' : size === 'medium' ? '48px' : '38px',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                boxShadow: `
                  0 0 25px ${scheme.shadow},
                  0 0 50px ${scheme.shadow}30,
                  inset 0 0 20px rgba(255, 255, 255, 0.3),
                  inset 0 -10px 20px rgba(0, 0, 0, 0.1)
                `,
                transform: 'perspective(100px) rotateX(15deg)'
              }}
            >
              {/* Petal texture lines */}
              <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-white/40 via-white/20 to-transparent transform -translate-x-1/2" />
              <div className="absolute left-1/3 top-0 w-px h-3/4 bg-gradient-to-b from-white/20 to-transparent" />
              <div className="absolute right-1/3 top-0 w-px h-3/4 bg-gradient-to-b from-white/20 to-transparent" />
            </div>
          </div>
        ))}

        {/* Inner Petals Layer */}
        {[30, 90, 150, 210, 270, 330].map((rotation, index) => (
          <div
            key={`inner-${index}`}
            className="absolute left-1/2 top-1/2 origin-bottom z-10"
            style={{
              transform: `translate(-50%, -80%) rotate(${rotation}deg) rotate(var(--petal-rotate, 0deg)) scale(var(--petal-scale, 1))`,
              animation: `petalSway 7s ease-in-out infinite ${delay + index * 0.15}s reverse`
            }}
          >
            <div 
              className={`bg-gradient-to-t ${scheme.inner} ${isActive ? 'animate-pulse' : ''}`}
              style={{
                width: size === 'large' ? '24px' : size === 'medium' ? '18px' : '14px',
                height: size === 'large' ? '50px' : size === 'medium' ? '40px' : '30px',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                boxShadow: `
                  0 0 20px ${scheme.shadow},
                  0 0 40px ${scheme.shadow}20,
                  inset 0 0 15px rgba(255, 255, 255, 0.4),
                  inset 0 -8px 15px rgba(0, 0, 0, 0.08)
                `,
                transform: 'perspective(80px) rotateX(10deg)'
              }}
            >
              <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-white/50 via-white/25 to-transparent transform -translate-x-1/2" />
            </div>
          </div>
        ))}

        {/* Flower Center with Stamens */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          {/* Main center */}
          <div 
            className={`w-6 h-6 bg-gradient-radial ${scheme.center} rounded-full ${isActive ? 'animate-pulse' : ''}`}
            style={{
              boxShadow: `
                0 0 20px ${scheme.glow}80,
                0 0 40px ${scheme.glow}40,
                inset 0 0 10px rgba(255, 255, 255, 0.6),
                inset 0 2px 4px rgba(0, 0, 0, 0.2)
              `,
              animation: `centerGlow 4s ease-in-out infinite alternate ${delay}s`
            }}
          />
          
          {/* Stamens */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <div
              key={`stamen-${i}`}
              className="absolute left-1/2 top-1/2 w-1 h-3 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) rotate(var(--stamen-rotate, 0deg)) scale(var(--stamen-scale, 1)) translateY(-8px)`,
              transformOrigin: 'bottom center',
              animation: `stamenDance 3s ease-in-out infinite ${delay + i * 0.1}s`
            }}
            >
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-orange-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          ))}
        </div>

        {/* Magical Glow Aura */}
        <div 
          className="absolute left-1/2 top-1/2 rounded-full pointer-events-none z-0"
          style={{
            width: size === 'large' ? '160px' : size === 'medium' ? '130px' : '100px',
            height: size === 'large' ? '160px' : size === 'medium' ? '130px' : '100px',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${scheme.shadow} 0%, ${scheme.shadow}20 30%, transparent 70%)`,
            animation: `auraGlow 5s ease-in-out infinite alternate ${delay}s`,
            opacity: isActive ? 1 : 0.7
          }}
        />

        {/* Sparkle Effects */}
        {isActive && (
          <>
            {[...Array(8)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${delay + i * 0.2}s`,
                  boxShadow: '0 0 6px #ffffff'
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Enhanced Stem */}
      <div 
        className="absolute left-1/2 top-full w-3 bg-gradient-to-b from-green-400 via-green-500 to-green-700 transform -translate-x-1/2 rounded-full"
        style={{
          height: stemHeightPx ? `${stemHeightPx}px` : stemHeights[size],
          boxShadow: `
            0 0 15px rgba(34, 197, 94, 0.4),
            inset 2px 0 4px rgba(255, 255, 255, 0.3),
            inset -2px 0 4px rgba(0, 0, 0, 0.2)
          `
        }}
      >
        {/* Stem texture */}
        <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-green-300 to-transparent transform -translate-x-1/2" />
      </div>

      {/* Beautiful Leaves */}
      <div 
        className="absolute bg-gradient-to-br from-green-400 via-green-500 to-green-600 transform -translate-x-1/2"
        style={{
          top: size === 'large' ? '80px' : size === 'medium' ? '65px' : '50px',
          left: '70%',
          width: size === 'large' ? '25px' : size === 'medium' ? '20px' : '16px',
          height: size === 'large' ? '50px' : size === 'medium' ? '40px' : '32px',
          borderRadius: '0 100% 0 100%',
          transform: 'rotate(25deg) rotate(var(--leaf-rotate, 0deg))',
          boxShadow: `
            0 0 15px rgba(34, 197, 94, 0.4),
            inset 0 0 10px rgba(255, 255, 255, 0.2),
            inset 0 -5px 10px rgba(0, 0, 0, 0.1)
          `,
          animation: `leafSway 4s ease-in-out infinite ${delay + 0.5}s`
        }}
      >
        <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-green-300 via-green-200 to-transparent transform -translate-x-1/2" />
      </div>
      
      <div 
        className="absolute bg-gradient-to-bl from-green-400 via-green-500 to-green-600 transform -translate-x-1/2"
        style={{
          top: size === 'large' ? '100px' : size === 'medium' ? '80px' : '65px',
          left: '30%',
          width: size === 'large' ? '22px' : size === 'medium' ? '18px' : '14px',
          height: size === 'large' ? '45px' : size === 'medium' ? '36px' : '28px',
          borderRadius: '100% 0 100% 0',
          transform: 'rotate(-25deg) rotate(var(--leaf-rotate, 0deg))',
          boxShadow: `
            0 0 15px rgba(34, 197, 94, 0.4),
            inset 0 0 10px rgba(255, 255, 255, 0.2),
            inset 0 -5px 10px rgba(0, 0, 0, 0.1)
          `,
          animation: `leafSway 4s ease-in-out infinite ${delay + 1}s reverse`
        }}
      >
        <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-green-300 via-green-200 to-transparent transform -translate-x-1/2" />
      </div>
    </div>
  );
};

export default GlowingLily;