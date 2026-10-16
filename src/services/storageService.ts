import { InterviewSession, SupportedLanguage, InterviewConfig } from '../types';

const SESSIONS_KEY = 'intervue_ai_sessions';
const PREFS_KEY = 'intervue_ai_prefs';

export interface UserPreferences {
  candidateName: string;
  preferredLanguage: SupportedLanguage;
  englishLocale: 'en-IN' | 'en-US';
}

export const storageService = {
  getSessions(): InterviewSession[] {
    try {
      const data = localStorage.getItem(SESSIONS_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch (e) {
      console.warn('Error reading sessions from localStorage:', e);
      return [];
    }
  },

  getSessionById(id: string): InterviewSession | null {
    const sessions = this.getSessions();
    return sessions.find((s) => s.id === id) || null;
  },

  saveSession(session: InterviewSession) {
    try {
      const sessions = this.getSessions();
      const existingIndex = sessions.findIndex((s) => s.id === session.id);
      if (existingIndex >= 0) {
        sessions[existingIndex] = session;
      } else {
        sessions.unshift(session);
      }
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.warn('Error saving session to localStorage:', e);
    }
  },

  clearHistory() {
    try {
      localStorage.removeItem(SESSIONS_KEY);
    } catch (e) {
      console.warn('Error clearing history:', e);
    }
  },

  getPreferences(): UserPreferences {
    try {
      const data = localStorage.getItem(PREFS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      // ignore
    }
    return {
      candidateName: '',
      preferredLanguage: 'en',
      englishLocale: 'en-IN',
    };
  },

  savePreferences(prefs: Partial<UserPreferences>) {
    try {
      const current = this.getPreferences();
      const updated = { ...current, ...prefs };
      localStorage.setItem(PREFS_KEY, JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  },
};
