import React, { useState } from 'react';
import {
  User,
  Briefcase,
  Layers,
  BarChart,
  Globe,
  HelpCircle,
  Clock,
  Mic,
  Volume2,
  Sparkles,
  AlertCircle,
  Play,
} from 'lucide-react';
import {
  SupportedLanguage,
  JobRole,
  InterviewType,
  DifficultyLevel,
  InterviewMode,
  TimerOption,
  InterviewConfig,
} from '../types';
import { translations } from '../data/translations';
import { MicTestModal } from '../components/AudioControls/MicTestModal';
import { storageService } from '../services/storageService';

interface SetupPageProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onStartSession: (config: InterviewConfig) => void;
  englishLocale: 'en-IN' | 'en-US';
  onEnglishLocaleChange: (loc: 'en-IN' | 'en-US') => void;
}

const jobRoles: JobRole[] = [
  'Software Developer',
  'Data Analyst',
  'AI/ML Engineer',
  'Web Developer',
  'HR Executive',
  'Custom Role',
];

const interviewTypes: InterviewType[] = ['Technical', 'HR', 'Behavioral', 'Mixed'];
const difficulties: DifficultyLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
const questionCounts = [5, 10, 15];

export const SetupPage: React.FC<SetupPageProps> = ({
  currentLanguage,
  onLanguageChange,
  onStartSession,
  englishLocale,
  onEnglishLocaleChange,
}) => {
  const t = translations[currentLanguage].setup;

  const savedPrefs = storageService.getPreferences();

  const [candidateName, setCandidateName] = useState(savedPrefs.candidateName || '');
  const [role, setRole] = useState<JobRole>('Software Developer');
  const [customRoleName, setCustomRoleName] = useState('');
  const [interviewType, setInterviewType] = useState<InterviewType>('Technical');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [mode, setMode] = useState<InterviewMode>('voice');
  const [timer, setTimer] = useState<TimerOption>('off');
  const [apiKey, setApiKey] = useState(localStorage.getItem('intervue_gemini_key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(Boolean(localStorage.getItem('intervue_gemini_key')));
  const [showMicModal, setShowMicModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!candidateName.trim()) {
      setErrorMessage(t.errors.nameRequired);
      return;
    }

    if (role === 'Custom Role' && !customRoleName.trim()) {
      setErrorMessage(t.errors.customRoleRequired);
      return;
    }

    setErrorMessage(null);

    if (apiKey.trim()) {
      localStorage.setItem('intervue_gemini_key', apiKey.trim());
    }

    // Save candidate name and language preferences
    storageService.savePreferences({
      candidateName: candidateName.trim(),
      preferredLanguage: currentLanguage,
      englishLocale,
    });

    const config: InterviewConfig = {
      candidateName: candidateName.trim(),
      role,
      customRoleName: role === 'Custom Role' ? customRoleName.trim() : undefined,
      interviewType,
      difficulty,
      language: currentLanguage,
      englishLocale,
      questionCount,
      mode,
      timer,
      apiKey: apiKey.trim() || undefined,
    };

    onStartSession(config);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/30 text-xs font-semibold text-violet-light">
            <Sparkles className="w-3.5 h-3.5 text-cyan" />
            <span>Interactive Setup</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Validation Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-status-danger/10 border border-status-danger/30 text-status-danger text-sm flex items-center gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-10 rounded-3xl bg-surface border border-white/10 shadow-2xl space-y-8"
        >
          {/* Candidate Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              <User className="w-4 h-4 text-cyan" />
              <span>{t.candidateName}</span>
              <span className="text-violet">*</span>
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-3 rounded-xl bg-surface-light border border-white/10 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20 text-text-primary placeholder:text-text-subtle text-sm transition-all"
            />
          </div>

          {/* Job Role Selection */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              <Briefcase className="w-4 h-4 text-violet-light" />
              <span>{t.targetRole}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {jobRoles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`p-3 rounded-xl text-xs sm:text-sm font-semibold border text-left transition-all ${
                    role === r
                      ? 'bg-violet/20 border-violet text-white shadow-glow-violet'
                      : 'bg-surface-light/60 border-white/5 text-text-muted hover:text-white hover:bg-surface-light'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Custom Role Input */}
            {role === 'Custom Role' && (
              <div className="pt-2">
                <input
                  type="text"
                  value={customRoleName}
                  onChange={(e) => setCustomRoleName(e.target.value)}
                  placeholder={t.customRolePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-light border border-white/10 focus:border-cyan focus:outline-none text-text-primary placeholder:text-text-subtle text-sm"
                />
              </div>
            )}
          </div>

          {/* Two-Column: Interview Type & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Category / Type */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                <Layers className="w-4 h-4 text-cyan" />
                <span>{t.interviewType}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {interviewTypes.map((it) => (
                  <button
                    key={it}
                    type="button"
                    onClick={() => setInterviewType(it)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                      interviewType === it
                        ? 'bg-cyan/20 border-cyan text-cyan-light shadow-glow-cyan'
                        : 'bg-surface-light/60 border-white/5 text-text-muted hover:text-white'
                    }`}
                  >
                    {it}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Level */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                <BarChart className="w-4 h-4 text-violet-light" />
                <span>{t.difficulty}</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`py-2 px-2 text-center rounded-lg text-xs font-semibold border transition-all ${
                      difficulty === d
                        ? 'bg-violet/20 border-violet text-white shadow-glow-violet'
                        : 'bg-surface-light/60 border-white/5 text-text-muted hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Language Selection & Locale Variant */}
          <div className="space-y-4 p-5 rounded-2xl bg-surface-light/40 border border-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                <Globe className="w-4 h-4 text-cyan" />
                <span>{t.language}</span>
              </label>

              {/* Language Switcher Buttons */}
              <div className="flex items-center gap-2">
                {(['en', 'te', 'hi'] as SupportedLanguage[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => onLanguageChange(lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      currentLanguage === lang
                        ? 'bg-gradient-to-r from-violet to-violet-dark text-white border-violet shadow-glow-violet'
                        : 'bg-surface-light border-white/10 text-text-muted hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? 'English (en)' : lang === 'te' ? 'తెలుగు (te-IN)' : 'हिंदी (hi-IN)'}
                  </button>
                ))}
              </div>
            </div>

            {/* English Locale Variant Option */}
            {currentLanguage === 'en' && (
              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                <span className="text-text-muted">{t.englishVariant}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onEnglishLocaleChange('en-IN')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      englishLocale === 'en-IN'
                        ? 'bg-cyan/20 text-cyan-light border border-cyan/40'
                        : 'text-text-subtle hover:text-white'
                    }`}
                  >
                    Indian (en-IN)
                  </button>
                  <button
                    type="button"
                    onClick={() => onEnglishLocaleChange('en-US')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      englishLocale === 'en-US'
                        ? 'bg-cyan/20 text-cyan-light border border-cyan/40'
                        : 'text-text-subtle hover:text-white'
                    }`}
                  >
                    US (en-US)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Question Count, Mode & Timer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Question Count */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-text-primary">
                <HelpCircle className="w-3.5 h-3.5 text-cyan" />
                <span>{t.questionCount}</span>
              </label>
              <div className="flex items-center gap-2">
                {questionCounts.map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                      questionCount === cnt
                        ? 'bg-violet/20 border-violet text-white shadow-glow-violet'
                        : 'bg-surface-light border-white/5 text-text-muted hover:text-white'
                    }`}
                  >
                    {cnt} Qs
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-text-primary">
                <Mic className="w-3.5 h-3.5 text-violet-light" />
                <span>{t.interviewMode}</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMode('voice')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                    mode === 'voice'
                      ? 'bg-cyan/20 border-cyan text-cyan-light shadow-glow-cyan'
                      : 'bg-surface-light border-white/5 text-text-muted hover:text-white'
                  }`}
                >
                  Voice
                </button>
                <button
                  type="button"
                  onClick={() => setMode('text')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                    mode === 'text'
                      ? 'bg-cyan/20 border-cyan text-cyan-light shadow-glow-cyan'
                      : 'bg-surface-light border-white/5 text-text-muted hover:text-white'
                  }`}
                >
                  Text
                </button>
              </div>
            </div>

            {/* Timer */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-text-primary">
                <Clock className="w-3.5 h-3.5 text-status-warning" />
                <span>{t.timer}</span>
              </label>
              <div className="flex items-center gap-2">
                {[
                  { id: 'off', label: 'Off' },
                  { id: '15', label: '15m' },
                  { id: '30', label: '30m' },
                ].map((tm) => (
                  <button
                    key={tm.id}
                    type="button"
                    onClick={() => setTimer(tm.id as TimerOption)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                      timer === tm.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-surface-light border-white/5 text-text-muted hover:text-white'
                    }`}
                  >
                    {tm.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Optional Gemini AI Key Configuration */}
          <div className="p-4 rounded-2xl bg-surface-light/40 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-text-muted">
                <Sparkles className="w-3.5 h-3.5 text-cyan" />
                <span>Conversational AI Engine</span>
              </div>
              <button
                type="button"
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                className="text-xs text-cyan hover:underline font-medium"
              >
                {showApiKeyInput ? 'Hide Settings' : apiKey ? 'Gemini Key Configured ✓' : '+ Add Gemini API Key (Optional)'}
              </button>
            </div>
            {showApiKeyInput && (
              <div className="pt-2 space-y-1.5 animate-fade-in">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste Google Gemini API Key (optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-dark border border-white/10 focus:border-cyan focus:outline-none text-xs text-text-primary placeholder:text-text-subtle font-mono"
                />
                <p className="text-[11px] text-text-subtle">
                  Leave blank to use the built-in Deep Semantic Answer Understanding Engine (no API key required).
                </p>
              </div>
            )}
          </div>

          {/* Action Row: Test Mic, Preview Voice, Start Interview */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setShowMicModal(true)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-surface-light hover:bg-surface-lighter text-text-primary text-xs font-semibold border border-white/10 flex items-center justify-center gap-2 transition-colors"
              >
                <Mic className="w-4 h-4 text-cyan" />
                <span>{t.testMic}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowMicModal(true)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-surface-light hover:bg-surface-lighter text-text-primary text-xs font-semibold border border-white/10 flex items-center justify-center gap-2 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-violet-light" />
                <span>{t.previewVoice}</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-violet to-violet-dark hover:from-violet-light hover:to-violet text-white font-extrabold text-sm sm:text-base shadow-glow-violet hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t.startMock}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Mic Test Modal */}
      <MicTestModal
        isOpen={showMicModal}
        onClose={() => setShowMicModal(false)}
        language={currentLanguage}
        englishLocale={englishLocale}
      />
    </div>
  );
};
