import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCcw,
  SkipForward,
  LogOut,
  Volume2,
  Check,
  AlertCircle,
  Clock,
  Sparkles,
  Send,
  MessageSquare,
  Edit3,
} from 'lucide-react';
import {
  InterviewConfig,
  InterviewSession,
  ARIAState,
  QuestionItem,
  AnswerRecord,
} from '../types';
import { translations } from '../data/translations';
import { ARIAAvatar } from '../components/Avatar/ARIAAvatar';
import { WaveformVisualizer } from '../components/AudioControls/WaveformVisualizer';
import { MicrophoneButton } from '../components/AudioControls/MicrophoneButton';
import { speechRecognitionService } from '../services/speechRecognition';
import { speechSynthesisService } from '../services/speechSynthesis';
import { audioVisualizerService } from '../services/audioVisualizer';
import { aiService } from '../services/aiService';
import { storageService } from '../services/storageService';

interface InterviewPageProps {
  config: InterviewConfig;
  questions: QuestionItem[];
  onComplete: (session: InterviewSession) => void;
  onExit: () => void;
}

export const InterviewPage: React.FC<InterviewPageProps> = ({
  config,
  questions,
  onComplete,
  onExit,
}) => {
  const t = translations[config.language].interview;
  const greetings = translations[config.language].greetings;

  // Session state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ariaState, setAriaState] = useState<ARIAState>('IDLE');
  const [isRecording, setIsRecording] = useState(false);
  const [candidateTranscript, setCandidateTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [recordedAnswers, setRecordedAnswers] = useState<AnswerRecord[]>([]);

  // Timer state
  const [secondsLeft, setSecondsLeft] = useState<number | null>(
    config.timer === '15' ? 15 * 60 : config.timer === '30' ? 30 * 60 : null
  );

  // Audio energy for visualizer
  const [audioBars, setAudioBars] = useState<number[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Session start time tracking
  const sessionStartTimeRef = useRef<number>(Date.now());

  // Conversation history chat log
  const [chatLog, setChatLog] = useState<
    Array<{ sender: 'aria' | 'candidate'; text: string; time: string }>
  >([]);

  const currentQ = questions[currentIndex];
  const questionText = currentQ
    ? currentQ.question[config.language] || currentQ.question.en
    : '';

  // Timer countdown
  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft <= 0) {
      handleFinishSession();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((s) => (s !== null ? s - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Visualizer loop when recording
  useEffect(() => {
    if (isRecording) {
      const updateVis = () => {
        const { bars } = audioVisualizerService.getAudioData();
        setAudioBars(bars);
        animFrameRef.current = requestAnimationFrame(updateVis);
      };
      animFrameRef.current = requestAnimationFrame(updateVis);
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setAudioBars([]);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isRecording]);

  // Initial Question and ARIA Greeting
  useEffect(() => {
    if (!currentQ) return;

    let initialTimer: any;

    if (currentIndex === 0) {
      // First question: Speak greeting, then speak first question
      setAriaState('SPEAKING');
      const greetingMsg = greetings[config.language];
      const fullIntro = `${greetingMsg} ${questionText}`;

      setChatLog([
        {
          sender: 'aria',
          text: fullIntro,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      initialTimer = setTimeout(() => {
        speechSynthesisService.speak(fullIntro, config.language, config.englishLocale, {
          onEnd: () => {
            setAriaState('IDLE');
          },
          onError: () => {
            setAriaState('IDLE');
          },
        });
      }, 500);
    } else {
      // Subsequent questions: Speak the question with a clear intro in the target language
      setAriaState('SPEAKING');
      const nextIntro =
        config.language === 'te'
          ? `తదుపరి ప్రశ్న: ${questionText}`
          : config.language === 'hi'
          ? `अगला प्रश्न: ${questionText}`
          : `Next question: ${questionText}`;

      setChatLog((prev) => [
        ...prev,
        {
          sender: 'aria',
          text: nextIntro,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      initialTimer = setTimeout(() => {
        speechSynthesisService.speak(nextIntro, config.language, config.englishLocale, {
          onEnd: () => {
            setAriaState('IDLE');
          },
          onError: () => {
            setAriaState('IDLE');
          },
        });
      }, 400);
    }

    return () => {
      clearTimeout(initialTimer);
      speechSynthesisService.stop();
      speechRecognitionService.stop();
      audioVisualizerService.stopMicMonitoring();
    };
  }, [currentIndex]);

  // Start Voice Recording (Zero Latency)
  const handleStartRecording = () => {
    setErrorFeedback(null);
    speechSynthesisService.stop(); // Stop ARIA if she's speaking
    setAriaState('LISTENING');

    speechRecognitionService.setLanguage(config.language, config.englishLocale);

    const started = speechRecognitionService.start({
      onStart: () => {
        setIsRecording(true);
      },
      onInterimResult: (text) => {
        // Update immediately on every syllable/word
        setCandidateTranscript(text);
      },
      onFinalResult: (text) => {
        setCandidateTranscript(text);
      },
      onError: (err, code) => {
        setIsRecording(false);
        setAriaState('IDLE');
        audioVisualizerService.stopMicMonitoring();
        if (code === 'not-allowed') {
          setErrorFeedback(t.micPermissionDenied);
        } else if (code === 'no-speech') {
          setErrorFeedback(t.noSpeechDetected);
        } else {
          setErrorFeedback(err);
        }
      },
      onEnd: () => {
        setIsRecording(false);
      },
    });

    if (started) {
      // Start mic monitoring for waveform asynchronously without blocking recognition start
      audioVisualizerService.startMicMonitoring().catch(() => {});
    } else {
      setAriaState('IDLE');
    }
  };

  // Stop Recording
  const handleStopRecording = () => {
    speechRecognitionService.stop();
    audioVisualizerService.stopMicMonitoring();
    setIsRecording(false);
    setAriaState('IDLE');
  };

  // Clear & Retry Recording
  const handleRetryRecording = () => {
    handleStopRecording();
    setCandidateTranscript('');
    setInterimText('');
    setErrorFeedback(null);
  };

  // Repeat Question aloud
  const handleRepeatQuestion = () => {
    handleStopRecording();
    setAriaState('SPEAKING');
    speechSynthesisService.speak(questionText, config.language, config.englishLocale, {
      onEnd: () => setAriaState('IDLE'),
      onError: () => setAriaState('IDLE'),
    });
  };

  // Submit Answer & Process AI Evaluation
  const handleSubmitAnswer = async () => {
    const finalAnswer = candidateTranscript.trim();

    if (!finalAnswer) {
      setErrorFeedback('Please provide or speak your answer before submitting.');
      return;
    }

    handleStopRecording();
    setIsProcessing(true);
    setAriaState('THINKING');

    // Add candidate response to chat
    setChatLog((prev) => [
      ...prev,
      {
        sender: 'candidate',
        text: finalAnswer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);

    try {
      const evaluation = await aiService.evaluateAnswer({
        question: questionText,
        candidateAnswer: finalAnswer,
        role: config.role,
        interviewType: config.interviewType,
        difficulty: config.difficulty,
        language: config.language,
        apiKey: config.apiKey,
      });

      const newRecord: AnswerRecord = {
        questionId: currentQ.id,
        questionText,
        candidateAnswer: finalAnswer,
        timestamp: new Date().toISOString(),
        evaluation,
      };

      const updatedAnswers = [...recordedAnswers, newRecord];
      setRecordedAnswers(updatedAnswers);

      // Reset candidate input for next question
      setCandidateTranscript('');
      setInterimText('');

      // Check if this was the last question
      if (currentIndex + 1 >= questions.length) {
        setAriaState('COMPLETED');
        // Speak brief congratulatory closing in language
        const completionMsg =
          config.language === 'te'
            ? 'అభినందనలు! మీరు అన్ని ప్రశ్నలను పూర్తి చేశారు. మీ ఫలితాలను సమీక్షిద్దాం.'
            : config.language === 'hi'
            ? 'बधाई हो! आपने सभी प्रश्नों को पूरा कर लिया है। चलिए आपके परिणाम देखते हैं।'
            : 'Congratulations! You have completed all interview questions. Let us review your performance report.';

        speechSynthesisService.speak(completionMsg, config.language, config.englishLocale, {
          onEnd: () => {
            finalizeInterview(updatedAnswers);
          },
          onError: () => {
            finalizeInterview(updatedAnswers);
          },
        });
      } else {
        // ARIA speaks constructive feedback, then advances to next question
        setAriaState('SPEAKING');
        const feedbackSpeech =
          evaluation.feedback ||
          (config.language === 'te'
            ? 'మీ సమాధానం నమోదు చేయబడింది. ధన్యవాదాలు.'
            : config.language === 'hi'
            ? 'आपका उत्तर दर्ज कर लिया गया है। धन्यवाद।'
            : 'Thank you for your answer.');

        setChatLog((prev) => [
          ...prev,
          {
            sender: 'aria',
            text: feedbackSpeech,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);

        speechSynthesisService.speak(feedbackSpeech, config.language, config.englishLocale, {
          onEnd: () => {
            setIsProcessing(false);
            setAriaState('IDLE');
            setCurrentIndex((idx) => idx + 1);
          },
          onError: () => {
            setIsProcessing(false);
            setAriaState('IDLE');
            setCurrentIndex((idx) => idx + 1);
          },
        });
      }
    } catch (err) {
      console.error('Answer processing failed:', err);
      setIsProcessing(false);
      setAriaState('IDLE');
      setCurrentIndex((idx) => idx + 1);
    }
  };

  // Skip Current Question
  const handleSkipQuestion = () => {
    handleStopRecording();
    const skippedRecord: AnswerRecord = {
      questionId: currentQ.id,
      questionText,
      candidateAnswer: '(Skipped by candidate)',
      timestamp: new Date().toISOString(),
      evaluation: {
        score: 0,
        relevanceScore: 0,
        clarityScore: 0,
        technicalScore: 0,
        feedback:
          config.language === 'te'
            ? 'ఈ ప్రశ్న దాటవేయబడింది.'
            : config.language === 'hi'
            ? 'यह प्रश्न छोड़ दिया गया।'
            : 'This question was skipped.',
        strengths: [],
        improvements: ['Attempt answering all questions to maximize score'],
        isEvaluationEstimate: true,
      },
    };

    const updated = [...recordedAnswers, skippedRecord];
    setRecordedAnswers(updated);
    setCandidateTranscript('');
    setInterimText('');

    if (currentIndex + 1 >= questions.length) {
      finalizeInterview(updated);
    } else {
      setCurrentIndex((idx) => idx + 1);
    }
  };

  // Finalize interview session & calculate aggregate metrics
  const finalizeInterview = (finalAnswers: AnswerRecord[]) => {
    const elapsedSeconds = Math.round((Date.now() - sessionStartTimeRef.current) / 1000);

    const validAnswers = finalAnswers.filter((a) => a.evaluation);
    const avgScore = validAnswers.length
      ? Math.round(
          validAnswers.reduce((sum, a) => sum + (a.evaluation?.score || 0), 0) /
            validAnswers.length
        )
      : 0;
    const avgRelevance = validAnswers.length
      ? Math.round(
          validAnswers.reduce((sum, a) => sum + (a.evaluation?.relevanceScore || 0), 0) /
            validAnswers.length
        )
      : 0;
    const avgClarity = validAnswers.length
      ? Math.round(
          validAnswers.reduce((sum, a) => sum + (a.evaluation?.clarityScore || 0), 0) /
            validAnswers.length
        )
      : 0;
    const avgTech = validAnswers.length
      ? Math.round(
          validAnswers.reduce((sum, a) => sum + (a.evaluation?.technicalScore || 0), 0) /
            validAnswers.length
        )
      : 0;

    const session: InterviewSession = {
      id: `session_${Date.now()}`,
      createdAt: new Date().toISOString(),
      config,
      questions: questions.map((q) => q.question[config.language] || q.question.en),
      answers: finalAnswers,
      currentQuestionIndex: currentIndex,
      isCompleted: true,
      overallScore: avgScore,
      averageRelevance: avgRelevance,
      averageClarity: avgClarity,
      averageTechnical: avgTech,
      durationSeconds: elapsedSeconds,
    };

    storageService.saveSession(session);
    onComplete(session);
  };

  const handleFinishSession = () => {
    if (window.confirm(t.endConfirm)) {
      finalizeInterview(recordedAnswers);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getStatusText = () => {
    switch (ariaState) {
      case 'SPEAKING':
        return t.stateSpeaking;
      case 'LISTENING':
        return t.stateListening;
      case 'THINKING':
        return t.stateThinking;
      case 'COMPLETED':
        return t.stateCompleted;
      case 'IDLE':
      default:
        return t.stateIdle;
    }
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Top Header Bar: Progress, Timer, Language Tag, End Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-surface border border-white/10 mb-6 shadow-md">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-base text-text-primary">
            {t.questionOf} {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet/20 text-violet-light border border-violet/30">
            {config.role === 'Custom Role' ? config.customRoleName : config.role}
          </span>
          <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-surface-light border border-white/5 text-text-subtle">
            {config.language === 'te' ? 'తెలుగు' : config.language === 'hi' ? 'हिंदी' : 'English'}
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {secondsLeft !== null && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono">
              <Clock className="w-4 h-4" />
              <span>{formatTimer(secondsLeft)}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleFinishSession}
            className="px-3.5 py-1.5 rounded-xl bg-status-danger/10 hover:bg-status-danger/20 text-status-danger border border-status-danger/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.endInterview}</span>
          </button>
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">
        {/* LEFT PANEL: ARIA Avatar, Status Badge, Waveform, Live Listening Halo */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-surface border border-white/10 shadow-2xl relative overflow-hidden space-y-6">
          {/* Subtle backdrop glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet/10 rounded-full blur-3xl pointer-events-none" />

          {/* ARIA Digital Human */}
          <ARIAAvatar
            state={ariaState}
            size="lg"
            showStatusBadge={true}
            statusLabel={getStatusText()}
            languageText={config.language === 'te' ? 'తెలుగు (te-IN)' : config.language === 'hi' ? 'हिंदी (hi-IN)' : 'English (en-IN)'}
          />

          {/* Dynamic Waveform Visualizer */}
          <div className="w-full max-w-xs">
            <WaveformVisualizer
              state={ariaState}
              bars={audioBars}
              isActive={isRecording || ariaState === 'SPEAKING'}
            />
          </div>

          {/* Quick Repeat Audio Trigger */}
          <button
            type="button"
            onClick={handleRepeatQuestion}
            disabled={ariaState === 'SPEAKING' || isProcessing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-light text-text-muted hover:text-white text-xs font-medium border border-white/5 hover:border-violet/30 transition-colors disabled:opacity-40"
          >
            <Volume2 className="w-4 h-4 text-cyan" />
            <span>{t.repeatQuestion}</span>
          </button>
        </div>

        {/* RIGHT PANEL: Question Card, Transcript Stream, Microphone & Answer Controls */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-surface-light h-2 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-violet via-cyan to-status-success transition-all duration-500 rounded-full"
              style={{
                width: `${Math.round(((currentIndex + 1) / questions.length) * 100)}%`,
              }}
            />
          </div>

          {/* Current Question Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-surface to-surface-light border border-violet/30 shadow-xl space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Question {currentIndex + 1}</span>
              </span>
              <span className="text-xs text-text-subtle font-mono">
                {currentQ?.type} • {currentQ?.difficulty}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-text-primary leading-snug">
              {questionText}
            </h2>
          </div>

          {/* Error / Alert feedback */}
          {errorFeedback && (
            <div className="p-3.5 rounded-xl bg-status-danger/15 border border-status-danger/30 text-status-danger text-xs sm:text-sm flex items-center gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorFeedback}</span>
            </div>
          )}

          {/* Candidate Answer Box / Live Transcription */}
          <div className="p-6 rounded-3xl bg-surface border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-text-muted">
              <span className="flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-cyan" />
                <span>Candidate Response (Speech to Text)</span>
              </span>
              <span className="text-[11px] text-text-subtle">
                {t.editTranscriptHint}
              </span>
            </div>

            {/* Editable / Live Transcript Area */}
            <div className="relative">
              <textarea
                value={candidateTranscript}
                onChange={(e) => setCandidateTranscript(e.target.value)}
                placeholder={
                  isRecording
                    ? t.listeningFeedback
                    : t.transcriptPlaceholder
                }
                rows={4}
                className="w-full p-4 rounded-2xl bg-surface-light border border-white/10 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/20 text-text-primary placeholder:text-text-subtle text-sm sm:text-base leading-relaxed resize-none transition-all font-sans"
              />

              {/* Live interim indicator badge */}
              {isRecording && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan/20 text-cyan-light text-xs font-mono animate-pulse border border-cyan/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                  <span>Listening & Transcribing...</span>
                </div>
              )}
            </div>

            {/* Voice Controls: Mic button, Stop, Clear, Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              {/* Central Mic Button */}
              <MicrophoneButton
                isRecording={isRecording}
                disabled={ariaState === 'SPEAKING' || isProcessing}
                onStartRecording={handleStartRecording}
                onStopRecording={handleStopRecording}
                languageText={config.language}
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleRetryRecording}
                  disabled={isProcessing || (!candidateTranscript && !interimText)}
                  className="px-4 py-2.5 rounded-xl bg-surface-light hover:bg-surface-lighter text-text-muted hover:text-white text-xs font-semibold border border-white/5 flex items-center gap-1.5 transition-colors disabled:opacity-40"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.retryRecording}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSkipQuestion}
                  disabled={isProcessing}
                  className="px-4 py-2.5 rounded-xl bg-surface-light hover:bg-surface-lighter text-text-muted hover:text-white text-xs font-semibold border border-white/5 flex items-center gap-1.5 transition-colors disabled:opacity-40"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  <span>{t.skipQuestion}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={
                    isProcessing ||
                    (!candidateTranscript.trim() && !interimText.trim())
                  }
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet to-cyan hover:brightness-110 text-background font-black text-xs sm:text-sm shadow-glow-cyan flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isProcessing ? t.processingAnswer : t.submitAnswer}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Conversation Transcript Stream / Accordion */}
          {chatLog.length > 0 && (
            <div className="p-4 rounded-2xl bg-surface/60 border border-white/5 space-y-3 max-h-48 overflow-y-auto">
              <div className="text-xs font-mono uppercase text-text-subtle flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-violet-light" />
                <span>Transcript Log</span>
              </div>
              <div className="space-y-2.5">
                {chatLog.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'aria'
                        ? 'bg-violet/10 text-text-primary border border-violet/20'
                        : 'bg-cyan/10 text-cyan-light border border-cyan/20 ml-6'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 font-semibold text-[10px] opacity-75">
                      <span>{msg.sender === 'aria' ? 'ARIA' : config.candidateName}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
