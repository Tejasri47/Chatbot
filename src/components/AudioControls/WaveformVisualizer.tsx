import React, { useEffect, useState } from 'react';
import { ARIAState } from '../../types';

interface WaveformVisualizerProps {
  state: ARIAState;
  bars?: number[];
  isActive?: boolean;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  state,
  bars,
  isActive = false,
}) => {
  const [sineWaves, setSineWaves] = useState<number[]>([
    0.2, 0.4, 0.6, 0.8, 1.0, 0.7, 0.5, 0.3, 0.5, 0.8, 0.6, 0.3,
  ]);

  // Synthetic animation when audio input is simulated or speaking
  useEffect(() => {
    if (state === 'IDLE' && !isActive) return;

    const interval = setInterval(() => {
      setSineWaves((prev) =>
        prev.map(() => {
          if (state === 'SPEAKING') {
            return 0.2 + Math.random() * 0.8;
          } else if (state === 'LISTENING') {
            return 0.15 + Math.random() * 0.75;
          } else if (state === 'THINKING') {
            return 0.1 + Math.random() * 0.3;
          }
          return 0.1;
        })
      );
    }, 120);

    return () => clearInterval(interval);
  }, [state, isActive]);

  const activeBars = bars && bars.length > 0 ? bars : sineWaves;

  return (
    <div className="flex items-center justify-center gap-1.5 h-12 px-4 py-2 rounded-xl bg-surface/80 border border-white/5 backdrop-blur-sm">
      {activeBars.map((bar, i) => {
        // Gradient color depending on state
        const barColor =
          state === 'SPEAKING'
            ? 'bg-gradient-to-t from-violet-dark to-violet-light'
            : state === 'LISTENING'
            ? 'bg-gradient-to-t from-cyan-dark to-cyan'
            : state === 'THINKING'
            ? 'bg-gradient-to-t from-amber-600 to-amber-300'
            : 'bg-white/20';

        const heightPercent = Math.max(12, Math.min(100, bar * 100));

        return (
          <div
            key={i}
            className={`w-1.5 rounded-full transition-all duration-100 ${barColor}`}
            style={{
              height: `${heightPercent}%`,
              opacity: state === 'IDLE' && !isActive ? 0.3 : 0.9,
            }}
          />
        );
      })}
    </div>
  );
};
