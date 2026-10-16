import React, { useState, useEffect } from 'react';
import {
  History as HistoryIcon,
  Trash2,
  Calendar,
  Briefcase,
  Globe,
  Award,
  ChevronRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { InterviewSession, SupportedLanguage } from '../types';
import { storageService } from '../services/storageService';
import { translations } from '../data/translations';

interface HistoryPageProps {
  currentLanguage: SupportedLanguage;
  onSelectSession: (session: InterviewSession) => void;
  onBackToHome: () => void;
  onStartNew: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  currentLanguage,
  onSelectSession,
  onBackToHome,
  onStartNew,
}) => {
  const t = translations[currentLanguage].history;
  const [sessions, setSessions] = useState<InterviewSession[]>([]);

  useEffect(() => {
    setSessions(storageService.getSessions());
  }, []);

  const handleClear = () => {
    if (window.confirm(t.clearConfirm)) {
      storageService.clearHistory();
      setSessions([]);
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan uppercase tracking-wider">
            <HistoryIcon className="w-3.5 h-3.5" />
            <span>Practice Records</span>
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary">{t.title}</h1>
          <p className="text-sm text-text-muted">{t.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {sessions.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 rounded-xl bg-status-danger/10 hover:bg-status-danger/20 text-status-danger border border-status-danger/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearHistory}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onStartNew}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet to-violet-dark text-white text-xs font-bold shadow-glow-violet hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start New Interview</span>
          </button>
        </div>
      </div>

      {/* Sessions List */}
      {sessions.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-surface border border-white/10 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-surface-light mx-auto flex items-center justify-center text-text-subtle">
            <HistoryIcon className="w-8 h-8 opacity-40" />
          </div>
          <h3 className="text-lg font-bold text-text-primary">{t.noHistory}</h3>
          <p className="text-sm text-text-muted max-w-sm mx-auto">{t.noHistoryDesc}</p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onStartNew}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet to-cyan text-background font-black text-xs shadow-glow-dual hover:brightness-110 transition-all"
            >
              Take First Practice Interview
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              onClick={() => onSelectSession(sess)}
              className="group p-5 rounded-2xl bg-surface border border-white/5 hover:border-violet/40 hover:bg-surface-light transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-text-primary text-base group-hover:text-cyan-light transition-colors">
                    {sess.config.role === 'Custom Role'
                      ? sess.config.customRoleName
                      : sess.config.role}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-violet/20 text-violet-light border border-violet/30">
                    {sess.config.interviewType}
                  </span>
                  <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-surface-light border border-white/10 text-text-subtle">
                    {sess.config.language === 'te'
                      ? 'తెలుగు'
                      : sess.config.language === 'hi'
                      ? 'हिंदी'
                      : 'English'}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-text-subtle">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(sess.createdAt)}</span>
                  </span>
                  <span>•</span>
                  <span>
                    {sess.answers.length} Questions Answered
                  </span>
                </div>
              </div>

              {/* Right Side: Score & Action */}
              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="text-right">
                  <div className="text-2xl font-black font-mono text-cyan">
                    {sess.overallScore}%
                  </div>
                  <span className="text-[10px] text-text-subtle uppercase">
                    Overall Score
                  </span>
                </div>

                <div className="w-8 h-8 rounded-full bg-surface-light group-hover:bg-violet group-hover:text-white flex items-center justify-center text-text-muted transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to Home */}
      <div className="pt-4">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};
