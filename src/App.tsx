import React, { useState, useEffect } from 'react';
import {
  SupportedLanguage,
  InterviewConfig,
  InterviewSession,
  QuestionItem,
} from './types';
import { storageService } from './services/storageService';
import { getQuestionsForSession } from './data/questions';
import { aiService } from './services/aiService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SetupPage } from './pages/SetupPage';
import { InterviewPage } from './pages/InterviewPage';
import { ResultsPage } from './pages/ResultsPage';
import { HistoryPage } from './pages/HistoryPage';

type AppPage = 'home' | 'setup' | 'interview' | 'results' | 'history';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [englishLocale, setEnglishLocale] = useState<'en-IN' | 'en-US'>('en-IN');
  const [isBackendOnline, setIsBackendOnline] = useState<boolean>(true);

  // Active session data
  const [activeConfig, setActiveConfig] = useState<InterviewConfig | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<QuestionItem[]>([]);
  const [completedSession, setCompletedSession] = useState<InterviewSession | null>(null);

  // Load saved preferences on mount
  useEffect(() => {
    const prefs = storageService.getPreferences();
    if (prefs.preferredLanguage) {
      setCurrentLanguage(prefs.preferredLanguage);
    }
    if (prefs.englishLocale) {
      setEnglishLocale(prefs.englishLocale);
    }

    // Check backend health
    aiService.checkBackendHealth().then((health) => {
      setIsBackendOnline(health.isOnline);
    });
  }, []);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setCurrentLanguage(newLang);
    storageService.savePreferences({ preferredLanguage: newLang });
  };

  const handleStartSession = (config: InterviewConfig) => {
    setActiveConfig(config);
    // Get appropriate questions from question bank
    const qs = getQuestionsForSession(
      config.role,
      config.interviewType,
      config.difficulty,
      config.questionCount
    );
    setActiveQuestions(qs);
    setCurrentPage('interview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInterviewComplete = (session: InterviewSession) => {
    setCompletedSession(session);
    setCurrentPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistorySession = (session: InterviewSession) => {
    setCompletedSession(session);
    setCurrentPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-violet selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        activePage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isBackendOnline={isBackendOnline}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            currentLanguage={currentLanguage}
            onStartInterview={() => setCurrentPage('setup')}
            onExploreFeatures={() => {
              const featEl = document.getElementById('features');
              if (featEl) {
                featEl.scrollIntoView({ behavior: 'smooth' });
              } else {
                setCurrentPage('setup');
              }
            }}
            englishLocale={englishLocale}
          />
        )}

        {currentPage === 'setup' && (
          <SetupPage
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            onStartSession={handleStartSession}
            englishLocale={englishLocale}
            onEnglishLocaleChange={setEnglishLocale}
          />
        )}

        {currentPage === 'interview' && activeConfig && activeQuestions.length > 0 && (
          <InterviewPage
            config={activeConfig}
            questions={activeQuestions}
            onComplete={handleInterviewComplete}
            onExit={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'results' && completedSession && (
          <ResultsPage
            session={completedSession}
            onPracticeAgain={() => setCurrentPage('setup')}
            onTryAnotherRole={() => setCurrentPage('setup')}
            onViewHistory={() => setCurrentPage('history')}
            onReturnHome={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'history' && (
          <HistoryPage
            currentLanguage={currentLanguage}
            onSelectSession={handleSelectHistorySession}
            onBackToHome={() => setCurrentPage('home')}
            onStartNew={() => setCurrentPage('setup')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer currentLanguage={currentLanguage} />
    </div>
  );
};
