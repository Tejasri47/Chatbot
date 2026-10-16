export type SupportedLanguage = 'en' | 'te' | 'hi';

export type JobRole =
  | 'Software Developer'
  | 'Data Analyst'
  | 'AI/ML Engineer'
  | 'Web Developer'
  | 'HR Executive'
  | 'Custom Role';

export type InterviewType = 'HR' | 'Technical' | 'Behavioral' | 'Mixed';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type InterviewMode = 'voice' | 'text';

export type TimerOption = 'off' | '15' | '30';

export type ARIAState = 'IDLE' | 'SPEAKING' | 'LISTENING' | 'THINKING' | 'COMPLETED';

export interface QuestionItem {
  id: string;
  role: JobRole;
  type: InterviewType;
  difficulty: DifficultyLevel;
  question: {
    en: string;
    te: string;
    hi: string;
  };
  sampleAnswer?: {
    en: string;
    te: string;
    hi: string;
  };
  keywords?: string[];
}

export interface AnswerRecord {
  questionId: string;
  questionText: string;
  candidateAnswer: string;
  audioDurationSeconds?: number;
  timestamp: string;
  evaluation?: {
    score: number;
    relevanceScore: number;
    clarityScore: number;
    technicalScore: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
    sampleGoodAnswer?: string;
    isEvaluationEstimate?: boolean;
  };
}

export interface InterviewConfig {
  candidateName: string;
  role: JobRole;
  customRoleName?: string;
  interviewType: InterviewType;
  difficulty: DifficultyLevel;
  language: SupportedLanguage;
  englishLocale: 'en-IN' | 'en-US';
  questionCount: number;
  mode: InterviewMode;
  timer: TimerOption;
  apiKey?: string;
}

export interface InterviewSession {
  id: string;
  createdAt: string;
  config: InterviewConfig;
  questions: string[]; // actual text asked
  answers: AnswerRecord[];
  currentQuestionIndex: number;
  isCompleted: boolean;
  overallScore: number;
  averageRelevance: number;
  averageClarity: number;
  averageTechnical: number;
  durationSeconds: number;
}
