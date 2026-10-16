import { SupportedLanguage } from '../types';

export interface SpeechRecognitionCallbacks {
  onInterimResult: (transcript: string) => void;
  onFinalResult: (transcript: string) => void;
  onError: (error: string, code?: string) => void;
  onStart: () => void;
  onEnd: () => void;
}

// Window type extension for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

class SpeechRecognitionService {
  private recognition: any = null;
  private isListening: boolean = false;
  private currentLanguage: SupportedLanguage = 'en';
  private englishLocale: 'en-IN' | 'en-US' = 'en-IN';
  private callbacks: SpeechRecognitionCallbacks | null = null;
  private finalTranscriptAccumulated: string = '';
  private explicitlyStopped: boolean = false;

  constructor() {
    this.initRecognition();
  }

  private initRecognition(): boolean {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('SpeechRecognition API is not supported in this browser.');
      return false;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.callbacks?.onStart();
      };

      this.recognition.onresult = (event: any) => {
        let finalAccumulated = '';
        let interimAccumulated = '';

        // Iterate through all results for instantaneous live transcript
        for (let i = 0; i < event.results.length; ++i) {
          const res = event.results[i];
          const text = res[0].transcript;
          if (res.isFinal) {
            finalAccumulated += (finalAccumulated ? ' ' : '') + text.trim();
          } else {
            interimAccumulated += (interimAccumulated ? ' ' : '') + text.trim();
          }
        }

        const liveCombined = [finalAccumulated, interimAccumulated].filter(Boolean).join(' ');

        // Update live interim transcript immediately
        if (liveCombined) {
          this.callbacks?.onInterimResult(liveCombined);
        }

        if (finalAccumulated) {
          this.finalTranscriptAccumulated = finalAccumulated;
          this.callbacks?.onFinalResult(finalAccumulated);
        }
      };

      this.recognition.onerror = (event: any) => {
        const err = event.error;
        console.warn('Speech recognition error event:', err);

        if (err === 'no-speech') {
          this.callbacks?.onError('No speech detected. Please speak into your microphone.', 'no-speech');
        } else if (err === 'not-allowed' || err === 'service-not-allowed') {
          this.callbacks?.onError(
            'Microphone access denied. Please allow microphone permissions in your browser.',
            'not-allowed'
          );
          this.stop();
        } else if (err === 'network') {
          this.callbacks?.onError('Network error during speech recognition. Please check your internet connection.', 'network');
        } else if (err === 'language-not-supported') {
          this.callbacks?.onError(
            `Speech recognition for locale ${this.getLocaleString()} is not supported by your browser engine.`,
            'language-not-supported'
          );
        } else if (err !== 'aborted') {
          this.callbacks?.onError(`Speech recognition error: ${err}`, err);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.callbacks?.onEnd();
      };

      return true;
    } catch (e) {
      console.error('Failed to initialize speech recognition:', e);
      return false;
    }
  }

  public isSupported(): boolean {
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  public setLanguage(lang: SupportedLanguage, englishLocale: 'en-IN' | 'en-US' = 'en-IN') {
    this.currentLanguage = lang;
    this.englishLocale = englishLocale;
    if (this.recognition) {
      this.recognition.lang = this.getLocaleString();
    }
  }

  public getLocaleString(): string {
    switch (this.currentLanguage) {
      case 'te':
        return 'te-IN'; // Telugu (India)
      case 'hi':
        return 'hi-IN'; // Hindi (India)
      case 'en':
      default:
        return this.englishLocale; // en-IN or en-US
    }
  }

  public start(callbacks: SpeechRecognitionCallbacks): boolean {
    if (!this.isSupported()) {
      callbacks.onError(
        'Speech recognition is not supported in this browser. Please use Google Chrome, MS Edge, or enter text.',
        'unsupported'
      );
      return false;
    }

    if (this.isListening) {
      this.stop();
    }

    this.callbacks = callbacks;
    this.finalTranscriptAccumulated = '';
    this.explicitlyStopped = false;

    try {
      if (!this.recognition) {
        this.initRecognition();
      }
      this.recognition.lang = this.getLocaleString();
      this.recognition.start();
      return true;
    } catch (err: any) {
      console.error('Error starting recognition:', err);
      if (err.name === 'InvalidStateError') {
        return true;
      }
      callbacks.onError(`Could not start speech recognition: ${err.message || err}`, 'start_failed');
      return false;
    }
  }

  public stop() {
    this.explicitlyStopped = true;
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (err) {
        console.warn('Error while stopping recognition:', err);
      }
    }
    this.isListening = false;
  }

  public abort() {
    this.explicitlyStopped = true;
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (err) {
        console.warn('Error while aborting recognition:', err);
      }
    }
    this.isListening = false;
  }

  public getIsListening(): boolean {
    return this.isListening;
  }
}

export const speechRecognitionService = new SpeechRecognitionService();
