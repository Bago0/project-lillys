import React from 'react';

const NameSignature: React.FC = () => {
  return (
    <div className="pointer-events-none select-none" style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 50 }}>
      <svg width="640" height="120" viewBox="0 0 640 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sigGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffe9f2" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        <g>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="signature-stroke"
            style={{
              fontFamily: 'Great Vibes, cursive',
              fontSize: 72,
              letterSpacing: 1,
              stroke: 'url(#sigGrad)',
              strokeWidth: 1.8,
              fill: 'transparent'
            }}
          >
            For Batato
          </text>

          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="signature-fill"
            style={{
              fontFamily: 'Great Vibes, cursive',
              fontSize: 72,
              letterSpacing: 1,
              fill: 'url(#sigGrad)',
              opacity: 0
            }}
          >
            For Batato
          </text>

          {/* small flourish */}
          <path
            d="M480 82 C 520 62, 560 102, 600 76"
            stroke="#ffe4ec"
            strokeWidth="2"
            fill="none"
            className="signature-flourish"
          />
        </g>
      </svg>
    </div>
  );
};

export default NameSignature;


