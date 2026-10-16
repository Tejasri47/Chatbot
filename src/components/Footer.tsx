import React from 'react';
import { Bot, Heart, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  currentLanguage: SupportedLanguage;
}

export const Footer: React.FC<FooterProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];

  return (
    <footer className="border-t border-white/10 bg-surface-dark/70 text-text-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet to-cyan flex items-center justify-center text-background font-bold text-sm">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-text-primary text-base">InterVue AI</span>
            <p className="text-xs text-text-subtle">
              Inspired by HCL Berri Bot • Voice-first AI Interview Practice
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-text-subtle">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan" />
            Telugu (te-IN) • English (en-IN) • Hindi (hi-IN)
          </span>
          <span>•</span>
          <span>Web Speech API + Multilingual AI</span>
        </div>

        <div className="text-xs text-text-subtle flex items-center gap-1">
          <span>Engineered for College Demonstration</span>
        </div>
      </div>
    </footer>
  );
};
