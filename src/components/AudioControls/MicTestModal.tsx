import React, { useState, useEffect } from 'react';
import { X, Mic, Volume2, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { SupportedLanguage } from '../../types';
import { translations } from '../../data/translations';
import { audioVisualizerService } from '../../services/audioVisualizer';
import { speechSynthesisService } from '../../services/speechSynthesis';

interface MicTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
  englishLocale: 'en-IN' | 'en-US';
}

export const MicTestModal: React.FC<MicTestModalProps> = ({
  isOpen,
  onClose,
  language,
  englishLocale,
}) => {
  const [micActive, setMicActive] = useState<boolean>(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const t = translations[language].micModal;
  const greetings = translations[language].greetings;

  useEffect(() => {
    let animId: number;

    if (isOpen) {
      setMicError(null);
      audioVisualizerService
        .startMicMonitoring()
        .then((success) => {
          if (success) {
            setMicActive(true);
            const checkVolume = () => {
              const data = audioVisualizerService.getAudioData();
              setAudioLevel(data.volume);
              animId = requestAnimationFrame(checkVolume);
            };
            animId = requestAnimationFrame(checkVolume);
          } else {
            setMicError(t.micFailed);
            setMicActive(false);
          }
        })
        .catch(() => {
          setMicError(t.micFailed);
          setMicActive(false);
        });
    }

    return () => {
      cancelAnimationFrame(animId);
      audioVisualizerService.stopMicMonitoring();
      speechSynthesisService.stop();
      setIsPlayingAudio(false);
    };
  }, [isOpen, language, t.micFailed]);

  if (!isOpen) return null;

  const handleTestVoice = () => {
    setIsPlayingAudio(true);
    const greetingText = greetings[language];
    speechSynthesisService.speak(greetingText, language, englishLocale, {
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet/10 text-violet-light border border-violet/20">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary">{t.title}</h3>
              <p className="text-xs text-text-muted">{t.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-subtle hover:text-white hover:bg-surface-light transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-5">
          {/* Microphone Status */}
          <div className="p-4 rounded-xl bg-surface-light/60 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">{t.micStatus}</span>
              {micActive ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-status-success font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Connected
                </span>
              ) : micError ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-status-danger font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Permission Error
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Checking...
                </span>
              )}
            </div>

            {/* Audio Level Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-text-subtle">
                <span>{t.testSpeaking}</span>
                <span>{Math.round(audioLevel * 100)}%</span>
              </div>
              <div className="w-full h-3 bg-surface-dark rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-cyan-dark via-cyan to-violet transition-all duration-75"
                  style={{ width: `${Math.max(5, Math.min(100, audioLevel * 250))}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-text-muted">
              {micActive ? t.micWorking : micError || 'Connecting to audio input...'}
            </p>
          </div>

          {/* Speaker / ARIA Speech Preview */}
          <div className="p-4 rounded-xl bg-surface-light/60 border border-white/5 space-y-3">
            <span className="text-sm font-semibold text-text-primary">{t.hearSampleAria}</span>
            <p className="text-xs text-text-muted italic">"{greetings[language]}"</p>

            <button
              type="button"
              onClick={handleTestVoice}
              disabled={isPlayingAudio}
              className="w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-violet to-violet-dark text-white font-medium text-sm shadow-glow-violet hover:brightness-110 active:scale-98 transition-all disabled:opacity-50"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
              <span>{isPlayingAudio ? t.playingAudio : t.hearSampleAria}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-surface-light text-text-primary hover:bg-surface-lighter font-medium text-sm border border-white/10 transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
