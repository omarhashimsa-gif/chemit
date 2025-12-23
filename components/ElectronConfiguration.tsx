
import React from 'react';

interface Props {
  shells: number[];
  symbol: string;
}

const ElectronConfiguration: React.FC<Props> = ({ shells, symbol }) => {
  const maxRadius = 140;
  const padding = 20;
  const size = (maxRadius + padding) * 2;
  const center = size / 2;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl border border-white/10">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="max-w-full h-auto">
        {/* Nucleus */}
        <circle cx={center} cy={center} r="15" className="fill-cyan-500 shadow-lg" />
        <text x={center} y={center + 5} textAnchor="middle" className="fill-white font-bold text-xs">
          {symbol}
        </text>

        {/* Orbitals and Electrons */}
        {shells.map((count, shellIndex) => {
          const radius = 35 + (shellIndex * 20);
          return (
            <g key={shellIndex}>
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-slate-400/30"
              />
              {[...Array(count)].map((_, electronIndex) => {
                const angle = (electronIndex / count) * 2 * Math.PI;
                const ex = center + radius * Math.cos(angle);
                const ey = center + radius * Math.sin(angle);
                return (
                  <circle
                    key={electronIndex}
                    cx={ex}
                    cy={ey}
                    r="3.5"
                    className="fill-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ElectronConfiguration;
