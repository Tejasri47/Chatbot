import React from 'react';
import {
  Award,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Briefcase,
  Home,
  Clock,
  HelpCircle,
  Sparkles,
  ChevronDown,
  History,
} from 'lucide-react';
import { InterviewSession } from '../types';
import { translations } from '../data/translations';

interface ResultsPageProps {
  session: InterviewSession;
  onPracticeAgain: () => void;
  onTryAnotherRole: () => void;
  onViewHistory: () => void;
  onReturnHome: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  session,
  onPracticeAgain,
  onTryAnotherRole,
  onViewHistory,
  onReturnHome,
}) => {
  const t = translations[session.config.language].results;

  const {
    overallScore,
    averageRelevance,
    averageClarity,
    averageTechnical,
    durationSeconds,
    answers,
    config,
  } = session;

  const formatDuration = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Compile unique strengths & improvements across all answered questions
  const allStrengths = Array.from(
    new Set(answers.flatMap((a) => a.evaluation?.strengths || []))
  ).slice(0, 4);

  const allImprovements = Array.from(
    new Set(answers.flatMap((a) => a.evaluation?.improvements || []))
  ).slice(0, 4);

  // Score color helper
  const getScoreColor = (sc: number) => {
    if (sc >= 80) return 'text-status-success from-emerald-400 to-teal-500';
    if (sc >= 60) return 'text-cyan from-cyan to-blue-500';
    if (sc >= 40) return 'text-amber-400 from-amber-400 to-orange-500';
    return 'text-status-danger from-rose-500 to-red-600';
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-status-success/15 border border-status-success/30 text-status-success text-xs font-bold">
          <Award className="w-4 h-4" />
          <span>Evaluation Complete</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Top Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Score Radial Card */}
        <div className="md:col-span-5 p-8 rounded-3xl bg-surface border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet/10 rounded-full blur-2xl pointer-events-none" />

          <span className="text-xs font-mono uppercase tracking-wider text-text-subtle font-semibold">
            {t.overallScore}
          </span>

          {/* Big Score Display */}
          <div className="relative w-44 h-44 rounded-full border-4 border-white/5 flex items-center justify-center p-2 shadow-inner">
            <div
              className={`w-full h-full rounded-full border-4 flex flex-col items-center justify-center bg-gradient-to-tr ${getScoreColor(
                overallScore
              )} text-background shadow-lg`}
            >
              <span className="text-5xl font-black">{overallScore}</span>
              <span className="text-xs uppercase font-extrabold tracking-widest opacity-80">
                / 100
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-text-primary text-lg">
              {config.candidateName}
            </h3>
            <p className="text-xs text-text-muted">
              {config.role === 'Custom Role' ? config.customRoleName : config.role} •{' '}
              {config.difficulty}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-text-subtle pt-2 border-t border-white/5 w-full justify-around font-mono">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan" />
              <span>{formatDuration(durationSeconds)}</span>
            </div>
            <div className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-violet-light" />
              <span>
                {answers.length} {t.questionsCompleted}
              </span>
            </div>
          </div>
        </div>

        {/* Competency Metric Bars */}
        <div className="md:col-span-7 p-8 rounded-3xl bg-surface border border-white/10 shadow-2xl space-y-6 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan" />
            <span>Core Competency Breakdown</span>
          </h3>

          <div className="space-y-4">
            {/* Answer Relevance */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-text-primary">{t.relevance}</span>
                <span className="text-cyan font-mono">{averageRelevance}%</span>
              </div>
              <div className="w-full h-3 bg-surface-light rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-cyan-dark to-cyan transition-all duration-700 rounded-full"
                  style={{ width: `${averageRelevance}%` }}
                />
              </div>
            </div>

            {/* Communication Clarity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-text-primary">{t.communication}</span>
                <span className="text-violet-light font-mono">{averageClarity}%</span>
              </div>
              <div className="w-full h-3 bg-surface-light rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-violet-dark to-violet transition-all duration-700 rounded-full"
                  style={{ width: `${averageClarity}%` }}
                />
              </div>
            </div>

            {/* Technical Depth */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-text-primary">{t.technical}</span>
                <span className="text-status-success font-mono">{averageTechnical}%</span>
              </div>
              <div className="w-full h-3 bg-surface-light rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-status-success transition-all duration-700 rounded-full"
                  style={{ width: `${averageTechnical}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-text-subtle italic border-t border-white/5 pt-3">
            {t.demoNote}
          </p>
        </div>
      </div>

      {/* Strengths & Improvements Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="p-6 rounded-3xl bg-surface/80 border border-status-success/30 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-status-success font-bold text-base">
            <CheckCircle2 className="w-5 h-5" />
            <span>{t.strengths}</span>
          </div>
          <ul className="space-y-2.5">
            {allStrengths.length > 0 ? (
              allStrengths.map((s, idx) => (
                <li
                  key={idx}
                  className="text-xs sm:text-sm text-text-primary flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-status-success mt-1.5 flex-shrink-0" />
                  <span>{s}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-text-muted">Good effort across questions.</li>
            )}
          </ul>
        </div>

        {/* Improvements */}
        <div className="p-6 rounded-3xl bg-surface/80 border border-amber-400/30 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <AlertTriangle className="w-5 h-5" />
            <span>{t.improvements}</span>
          </div>
          <ul className="space-y-2.5">
            {allImprovements.length > 0 ? (
              allImprovements.map((imp, idx) => (
                <li
                  key={idx}
                  className="text-xs sm:text-sm text-text-primary flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                  <span>{imp}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-text-muted">Continue practicing to refine details.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Detailed Question-by-Question Review */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-white/10 shadow-xl space-y-6">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-violet-light" />
          <span>{t.questionReview}</span>
        </h3>

        <div className="space-y-4">
          {answers.map((rec, i) => {
            const evalData = rec.evaluation;
            const score = evalData?.score || 0;

            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-surface-light/50 border border-white/5 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                  <span className="text-xs font-mono font-bold text-cyan">
                    Question {i + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-text-muted">
                      Score: <strong className="text-white">{score}</strong> / 100
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        score >= 75
                          ? 'bg-status-success/20 text-status-success'
                          : score >= 50
                          ? 'bg-cyan/20 text-cyan-light'
                          : 'bg-status-danger/20 text-status-danger'
                      }`}
                    >
                      {score >= 75 ? 'Good' : score >= 50 ? 'Average' : 'Needs Work'}
                    </span>
                  </div>
                </div>

                <p className="text-sm font-semibold text-text-primary">
                  {rec.questionText}
                </p>

                {/* Candidate Answer */}
                <div className="p-3.5 rounded-xl bg-surface-dark border border-white/5 space-y-1">
                  <span className="text-[11px] font-mono text-text-subtle uppercase">
                    {t.candidateAnswer}
                  </span>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {rec.candidateAnswer || '(No answer recorded)'}
                  </p>
                </div>

                {/* ARIA Feedback */}
                {evalData?.feedback && (
                  <div className="p-3.5 rounded-xl bg-violet/10 border border-violet/20 space-y-1">
                    <span className="text-[11px] font-mono text-violet-light uppercase font-bold">
                      {t.ariaFeedback}
                    </span>
                    <p className="text-xs sm:text-sm text-text-primary leading-relaxed">
                      {evalData.feedback}
                    </p>
                  </div>
                )}

                {/* Model Sample Answer */}
                {evalData?.sampleGoodAnswer && (
                  <div className="p-3.5 rounded-xl bg-cyan/10 border border-cyan/20 space-y-1">
                    <span className="text-[11px] font-mono text-cyan-light uppercase font-bold">
                      {t.suggestedAnswer}
                    </span>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {evalData.sampleGoodAnswer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          type="button"
          onClick={onPracticeAgain}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet to-violet-dark hover:from-violet-light hover:to-violet text-white font-bold text-sm shadow-glow-violet flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.practiceAgain}</span>
        </button>

        <button
          type="button"
          onClick={onTryAnotherRole}
          className="px-6 py-3 rounded-2xl bg-surface-light hover:bg-surface-lighter text-text-primary font-semibold text-sm border border-white/10 flex items-center gap-2 transition-colors"
        >
          <Briefcase className="w-4 h-4 text-cyan" />
          <span>{t.tryAnotherRole}</span>
        </button>

        <button
          type="button"
          onClick={onViewHistory}
          className="px-6 py-3 rounded-2xl bg-surface-light hover:bg-surface-lighter text-text-primary font-semibold text-sm border border-white/10 flex items-center gap-2 transition-colors"
        >
          <History className="w-4 h-4 text-violet-light" />
          <span>{t.viewHistory}</span>
        </button>

        <button
          type="button"
          onClick={onReturnHome}
          className="px-6 py-3 rounded-2xl bg-surface-light hover:bg-surface-lighter text-text-primary font-semibold text-sm border border-white/10 flex items-center gap-2 transition-colors"
        >
          <Home className="w-4 h-4 text-text-subtle" />
          <span>{t.returnHome}</span>
        </button>
      </div>
    </div>
  );
};
