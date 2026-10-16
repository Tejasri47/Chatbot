import { SupportedLanguage } from '../types';

export interface SpeechSynthesisCallbacks {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
  onBoundary?: (charIndex: number) => void;
}

class SpeechSynthesisService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isLoaded: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    if (this.voices.length > 0) {
      this.isLoaded = true;
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0 && this.synth) {
      this.voices = this.synth.getVoices();
    }
    return this.voices;
  }

  /**
   * Check if a true native voice exists in the browser for Telugu or Hindi
   */
  public hasNativeVoiceFor(language: SupportedLanguage): boolean {
    const voices = this.getAvailableVoices();
    if (!voices || voices.length === 0) return false;

    if (language === 'te') {
      return Boolean(
        voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith('te') ||
            v.name.toLowerCase().includes('telugu')
        )
      );
    }
    if (language === 'hi') {
      return Boolean(
        voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith('hi') ||
            v.name.toLowerCase().includes('hindi') ||
            v.name.toLowerCase().includes('kalpana') ||
            v.name.toLowerCase().includes('hemant')
        )
      );
    }
    return true;
  }

  public getBestVoice(
    language: SupportedLanguage,
    englishLocale: 'en-IN' | 'en-US' = 'en-IN'
  ): SpeechSynthesisVoice | null {
    const voices = this.getAvailableVoices();
    if (!voices || voices.length === 0) return null;

    let targetLocalePrefix = 'en';
    let targetExact: string = englishLocale;

    if (language === 'te') {
      targetLocalePrefix = 'te';
      targetExact = 'te-IN';
    } else if (language === 'hi') {
      targetLocalePrefix = 'hi';
      targetExact = 'hi-IN';
    }

    // 1. Try exact match
    let match = voices.find((v) => v.lang.toLowerCase() === targetExact.toLowerCase());
    if (match) return match;

    // 2. Try prefix match
    match = voices.find((v) => v.lang.toLowerCase().startsWith(targetLocalePrefix.toLowerCase()));
    if (match) return match;

    // 3. Try matching voice name
    if (language === 'te') {
      match = voices.find((v) => v.name.toLowerCase().includes('telugu'));
      if (match) return match;
    } else if (language === 'hi') {
      match = voices.find(
        (v) =>
          v.name.toLowerCase().includes('hindi') ||
          v.name.toLowerCase().includes('kalpana') ||
          v.name.toLowerCase().includes('hemant')
      );
      if (match) return match;
    }

    // For English: Indian English or default voice
    if (language === 'en') {
      const indianEn = voices.find(
        (v) => v.lang.toLowerCase().includes('en-in') || v.name.toLowerCase().includes('india')
      );
      if (indianEn) return indianEn;
      return voices.find((v) => v.default) || voices[0] || null;
    }

    // For Telugu / Hindi: NEVER assign an English voice, return null so online TTS handles it!
    return null;
  }

  /**
   * Speak using high-definition Google TTS audio stream
   */
  private speakViaAudioStream(
    text: string,
    language: SupportedLanguage,
    callbacks?: SpeechSynthesisCallbacks
  ): boolean {
    try {
      this.stop();

      const encodedText = encodeURIComponent(text.trim());
      const audioUrl = `/api/tts?text=${encodedText}&lang=${language}`;
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;

      audio.onplay = () => {
        callbacks?.onStart?.();
      };

      audio.onended = () => {
        this.currentAudio = null;
        callbacks?.onEnd?.();
      };

      audio.onerror = (e) => {
        console.warn('Audio TTS stream error, trying browser fallback:', e);
        this.currentAudio = null;
        this.speakViaBrowserSynth(text, language, 'en-IN', callbacks);
      };

      audio.play().catch((err) => {
        console.warn('Audio play failed, falling back:', err);
        this.speakViaBrowserSynth(text, language, 'en-IN', callbacks);
      });

      return true;
    } catch (err) {
      console.warn('Failed to stream TTS audio:', err);
      return this.speakViaBrowserSynth(text, language, 'en-IN', callbacks);
    }
  }

  /**
   * Speak using browser SpeechSynthesis
   */
  private speakViaBrowserSynth(
    text: string,
    language: SupportedLanguage,
    englishLocale: 'en-IN' | 'en-US' = 'en-IN',
    callbacks?: SpeechSynthesisCallbacks
  ): boolean {
    if (!this.synth) {
      callbacks?.onError?.('SpeechSynthesis not supported');
      return false;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      const voice = this.getBestVoice(language, englishLocale);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : englishLocale;
      }

      utterance.rate = language === 'te' ? 0.95 : language === 'hi' ? 0.95 : 1.0;
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        callbacks?.onStart?.();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        callbacks?.onEnd?.();
      };

      utterance.onerror = (e) => {
        if (e.error !== 'interrupted') {
          console.warn('Speech synthesis error:', e);
          callbacks?.onError?.(e);
        }
        this.currentUtterance = null;
        callbacks?.onEnd?.();
      };

      utterance.onboundary = (e) => {
        callbacks?.onBoundary?.(e.charIndex);
      };

      this.synth.speak(utterance);
      return true;
    } catch (e) {
      console.error('SpeechSynthesis.speak failed:', e);
      callbacks?.onError?.(e);
      callbacks?.onEnd?.();
      return false;
    }
  }

  /**
   * Main Speak Entry:
   * Uses high-quality /api/tts audio for Telugu and Hindi to ensure flawless native pronunciation.
   * Uses browser speech synthesis for English (or /api/tts as fallback).
   */
  public speak(
    text: string,
    language: SupportedLanguage,
    englishLocale: 'en-IN' | 'en-US' = 'en-IN',
    callbacks?: SpeechSynthesisCallbacks
  ): boolean {
    // Cancel any ongoing speech or audio
    this.stop();

    if (!text || text.trim().length === 0) {
      callbacks?.onEnd?.();
      return true;
    }

    // For Telugu and Hindi, Windows browsers lack native voices and read English words only.
    // Use the verified HD TTS audio stream!
    if (language === 'te' || language === 'hi') {
      return this.speakViaAudioStream(text, language, callbacks);
    }

    // For English: use browser voice if available
    return this.speakViaBrowserSynth(text, language, englishLocale, callbacks);
  }

  public stop() {
    // Stop audio element
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio.src = '';
      } catch (e) {
        // ignore
      }
      this.currentAudio = null;
    }

    // Stop browser synthesis
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        // ignore
      }
    }
    this.currentUtterance = null;
  }

  public isSpeaking(): boolean {
    const isAudioPlaying = Boolean(
      this.currentAudio && !this.currentAudio.paused && !this.currentAudio.ended
    );
    const isSynthSpeaking = Boolean(this.synth && this.synth.speaking);
    return isAudioPlaying || isSynthSpeaking;
  }
}

export const speechSynthesisService = new SpeechSynthesisService();
