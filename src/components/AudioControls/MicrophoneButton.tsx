import React, { useEffect, useState } from 'react';
import { Mic, MicOff, Square } from 'lucide-react';

interface MicrophoneButtonProps {
  isRecording: boolean;
  disabled?: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  languageText?: string;
}

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  isRecording,
  disabled = false,
  onStartRecording,
  onStopRecording,
  languageText,
}) => {
  const [seconds, setSeconds] = useState(0);

  // Recording timer
  useEffect(() => {
    let timer: any;
    if (isRecording) {
      setSeconds(0);
      timer = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }

    return () => clearInterval(timer);
  }, [isRecording]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleClick = () => {
    if (disabled) return;
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center">
        {/* Pulsing rings when recording */}
        {isRecording && (
          <>
            <span className="absolute -inset-3 rounded-full bg-cyan/20 animate-ping opacity-75" />
            <span className="absolute -inset-6 rounded-full border border-cyan/40 animate-pulse" />
          </>
        )}

        <button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
          className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform active:scale-95 ${
            isRecording
              ? 'bg-gradient-to-tr from-cyan-dark to-cyan text-background shadow-glow-cyan scale-105'
              : disabled
              ? 'bg-surface-light text-text-subtle opacity-50 cursor-not-allowed'
              : 'bg-gradient-to-tr from-violet-dark to-violet text-white shadow-glow-violet hover:scale-105 hover:brightness-110'
          }`}
        >
          {isRecording ? (
            <Square className="w-8 h-8 fill-current text-background" />
          ) : (
            <Mic className="w-9 h-9" />
          )}
        </button>
      </div>

      {/* Recording status timer */}
      {isRecording ? (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan-light text-xs font-mono animate-pulse">
          <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
          <span>Recording: {formatTime(seconds)}</span>
        </div>
      ) : (
        <span className="text-xs text-text-subtle font-medium">
          {disabled ? 'Wait for question...' : 'Click to Speak'}
        </span>
      )}
    </div>
  );
};
