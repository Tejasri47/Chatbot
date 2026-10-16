import React, { useState } from 'react';
import {
  Mic,
  Globe,
  Briefcase,
  Award,
  ChevronRight,
  Sparkles,
  Volume2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { translations } from '../data/translations';
import { ARIAAvatar } from '../components/Avatar/ARIAAvatar';
import { WaveformVisualizer } from '../components/AudioControls/WaveformVisualizer';
import { speechSynthesisService } from '../services/speechSynthesis';

interface HomePageProps {
  currentLanguage: SupportedLanguage;
  onStartInterview: () => void;
  onExploreFeatures: () => void;
  englishLocale: 'en-IN' | 'en-US';
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLanguage,
  onStartInterview,
  onExploreFeatures,
  englishLocale,
}) => {
  const t = translations[currentLanguage];
  const [ariaState, setAriaState] = useState<'IDLE' | 'SPEAKING'>('IDLE');

  const handleHearGreeting = () => {
    if (ariaState === 'SPEAKING') {
      speechSynthesisService.stop();
      setAriaState('IDLE');
      return;
    }

    setAriaState('SPEAKING');
    const greeting = t.greetings[currentLanguage];
    speechSynthesisService.speak(greeting, currentLanguage, englishLocale, {
      onEnd: () => setAriaState('IDLE'),
      onError: () => setAriaState('IDLE'),
    });
  };

  const featureCards = [
    {
      icon: Mic,
      title: t.home.voiceInterview.title,
      desc: t.home.voiceInterview.desc,
      color: 'from-cyan to-blue-500',
      badge: 'Real Mic Capture',
    },
    {
      icon: Globe,
      title: t.home.multilingual.title,
      desc: t.home.multilingual.desc,
      color: 'from-violet to-purple-500',
      badge: 'te-IN • hi-IN • en-IN',
    },
    {
      icon: Briefcase,
      title: t.home.roleSpecific.title,
      desc: t.home.roleSpecific.desc,
      color: 'from-amber-400 to-orange-500',
      badge: '5+ Core Domains',
    },
    {
      icon: Award,
      title: t.home.instantFeedback.title,
      desc: t.home.instantFeedback.desc,
      color: 'from-emerald-400 to-teal-500',
      badge: 'Instant Scores',
    },
  ];

  const steps = [
    { num: '01', title: t.home.howItWorks.step1Title, desc: t.home.howItWorks.step1Desc },
    { num: '02', title: t.home.howItWorks.step2Title, desc: t.home.howItWorks.step2Desc },
    { num: '03', title: t.home.howItWorks.step3Title, desc: t.home.howItWorks.step3Desc },
    { num: '04', title: t.home.howItWorks.step4Title, desc: t.home.howItWorks.step4Desc },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow backdrop circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-glow rounded-full blur-[120px] pointer-events-none opacity-40" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-glow rounded-full blur-[100px] pointer-events-none opacity-30" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-light/80 border border-violet/30 text-xs font-semibold text-violet-light shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan" />
              <span>{t.home.heroBadge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
              {t.home.heroTitle.split('one conversation')[0]}
              <span className="bg-gradient-to-r from-violet-light via-cyan to-white bg-clip-text text-transparent">
                one conversation.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.home.heroSubtitle}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                type="button"
                onClick={onStartInterview}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-violet to-violet-dark hover:from-violet-light hover:to-violet text-white font-bold text-base shadow-glow-violet hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <span>{t.home.startInterview}</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={onExploreFeatures}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-surface-light/70 hover:bg-surface-lighter text-text-primary font-semibold text-base border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>{t.home.exploreFeatures}</span>
              </button>
            </div>

            {/* Trust points / Language pills */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-text-subtle">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-status-success" />
                <span>100% Voice-First</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-status-success" />
                <span>Telugu • Hindi • English</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-status-success" />
                <span>Zero Audio Retention</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive ARIA Avatar Preview */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Floating Speech Bubble */}
            <div className="relative mb-4 z-20 animate-float">
              <div className="px-5 py-3 rounded-2xl bg-surface-light/90 border border-violet/30 shadow-glass backdrop-blur-md text-text-primary text-sm font-medium flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
                <span>{t.home.avatarBubble}</span>
                <button
                  type="button"
                  onClick={handleHearGreeting}
                  title="Click to hear ARIA speak"
                  className="p-1.5 rounded-lg bg-violet/20 hover:bg-violet/40 text-violet-light transition-colors"
                >
                  <Volume2 className={`w-4 h-4 ${ariaState === 'SPEAKING' ? 'animate-bounce' : ''}`} />
                </button>
              </div>
              {/* Bubble pointer */}
              <div className="w-3 h-3 bg-surface-light border-r border-b border-violet/30 transform rotate-45 mx-auto -mt-1.5" />
            </div>

            {/* ARIA Avatar */}
            <div className="cursor-pointer" onClick={handleHearGreeting} title="Click to interact with ARIA">
              <ARIAAvatar
                state={ariaState}
                size="hero"
                showStatusBadge={true}
                statusLabel={ariaState === 'SPEAKING' ? t.interview.stateSpeaking : t.home.statusAria}
                languageText={currentLanguage === 'te' ? 'తెలుగు' : currentLanguage === 'hi' ? 'हिंदी' : 'English'}
              />
            </div>

            {/* Waveform below avatar */}
            <div className="mt-6 w-full max-w-xs">
              <WaveformVisualizer state={ariaState} isActive={ariaState === 'SPEAKING'} />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-dark/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
              {t.home.featuresHeading}
            </h2>
            <p className="text-base text-text-muted">
              {t.home.featuresSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-6 rounded-2xl bg-surface/70 border border-white/5 hover:border-violet/40 hover:bg-surface-light/60 transition-all duration-300 shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-background shadow-md`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 text-text-subtle border border-white/5">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-cyan-light transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan font-semibold">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
              {t.home.howItWorks.title}
            </h2>
            <p className="text-base text-text-muted">
              {t.home.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-surface-light/40 border border-white/5 space-y-3"
              >
                <div className="text-3xl font-black font-mono bg-gradient-to-r from-violet to-cyan bg-clip-text text-transparent">
                  {st.num}
                </div>
                <h3 className="text-base font-bold text-text-primary">{st.title}</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-br from-surface-light via-surface to-[#141B33] border border-violet/30 shadow-glow-dual text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-cyan-light text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free Practice Platform</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
            {t.home.ctaTitle}
          </h2>
          <p className="text-base text-text-muted max-w-2xl mx-auto">
            {t.home.ctaSubtitle}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={onStartInterview}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet to-cyan text-background font-black text-base shadow-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <span>{t.home.ctaButton}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
