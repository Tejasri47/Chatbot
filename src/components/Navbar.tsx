import React from 'react';
import { Bot, History, Sparkles, PlayCircle } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { LanguageSelector } from './LanguageSelector';
import { translations } from '../data/translations';

interface NavbarProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  activePage: 'home' | 'setup' | 'interview' | 'results' | 'history';
  onNavigate: (page: 'home' | 'setup' | 'interview' | 'results' | 'history') => void;
  isBackendOnline?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  activePage,
  onNavigate,
  isBackendOnline = true,
}) => {
  const t = translations[currentLanguage];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-violet to-cyan flex items-center justify-center shadow-glow-dual group-hover:scale-105 transition-transform">
            <Bot className="w-5 h-5 text-background" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-status-success animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-status-success" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-text-primary to-cyan-light bg-clip-text text-transparent">
                InterVue AI
              </span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-violet/20 text-violet-light border border-violet/30 hidden sm:inline-block">
                HCL Berri Bot Inspired
              </span>
            </div>
            <p className="text-[11px] text-text-muted hidden md:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Center / Right Navigation & Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden md:flex items-center gap-1 bg-surface/50 p-1 rounded-xl border border-white/5">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activePage === 'home'
                  ? 'bg-surface-light text-cyan-light'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('setup')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activePage === 'setup' || activePage === 'interview'
                  ? 'bg-surface-light text-cyan-light'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>{t.nav.practice}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('history')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activePage === 'history'
                  ? 'bg-surface-light text-cyan-light'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>{t.nav.history}</span>
            </button>
          </nav>

          {/* Multilingual Selector */}
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            size="sm"
          />

          {/* Quick CTA button for mobile or direct access */}
          <button
            type="button"
            onClick={() => onNavigate('setup')}
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet to-violet-dark text-white text-xs font-bold shadow-glow-violet hover:brightness-110 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.home.startInterview}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
