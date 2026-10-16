import React from 'react';
import { Globe } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  className?: string;
  size?: 'sm' | 'md';
}

const languages: Array<{ code: SupportedLanguage; label: string; native: string; flag: string }> = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  className = '',
  size = 'md',
}) => {
  return (
    <div className={`inline-flex items-center p-1 rounded-xl bg-surface-light/80 border border-white/10 backdrop-blur-md ${className}`}>
      <div className="px-2 text-text-subtle hidden sm:flex items-center">
        <Globe className="w-4 h-4" />
      </div>
      <div className="flex items-center gap-1">
        {languages.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onLanguageChange(lang.code)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-violet to-violet-dark text-white shadow-glow-violet'
                  : 'text-text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{lang.native}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
