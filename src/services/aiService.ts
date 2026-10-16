import { SupportedLanguage, JobRole, InterviewType, DifficultyLevel } from '../types';

export interface EvaluationPayload {
  question: string;
  candidateAnswer: string;
  role: JobRole;
  interviewType: InterviewType;
  difficulty: DifficultyLevel;
  language: SupportedLanguage;
  previousContext?: Array<{ question: string; answer: string }>;
  apiKey?: string;
}

export interface EvaluationResponse {
  score: number;
  relevanceScore: number;
  clarityScore: number;
  technicalScore: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  sampleGoodAnswer?: string;
  isEvaluationEstimate: boolean;
  model?: string;
}

import { deepSemanticEvaluate } from './semanticEvaluator';

/**
 * Client-side semantic evaluator fallback if backend is unreachable
 */
function localClientEvaluation(payload: EvaluationPayload): EvaluationResponse {
  const { question, candidateAnswer, role, difficulty, language } = payload;
  return deepSemanticEvaluate(question, candidateAnswer, role, difficulty, language);
}

export const aiService = {
  /**
   * Evaluate candidate answer via backend or local semantic engine
   */
  async evaluateAnswer(payload: EvaluationPayload): Promise<EvaluationResponse> {
    try {
      const response = await fetch('/api/ai/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.warn('Backend evaluation returned non-200, falling back to local semantic evaluation.');
        return localClientEvaluation(payload);
      }

      const data = await response.json();
      return {
        score: Number(data.score) || 75,
        relevanceScore: Number(data.relevanceScore) || 75,
        clarityScore: Number(data.clarityScore) || 75,
        technicalScore: Number(data.technicalScore) || 75,
        feedback: data.feedback || 'Answer recorded successfully.',
        strengths: Array.isArray(data.strengths) ? data.strengths : ['Clear articulation'],
        improvements: Array.isArray(data.improvements) ? data.improvements : ['Add practical examples'],
        sampleGoodAnswer: data.sampleGoodAnswer,
        isEvaluationEstimate: Boolean(data.isEvaluationEstimate),
        model: data.model,
      };
    } catch (err) {
      console.warn('Network error reaching backend AI evaluation, using local engine:', err);
      return localClientEvaluation(payload);
    }
  },

  /**
   * Check backend health and status
   */
  async checkBackendHealth(): Promise<{ isOnline: boolean; geminiConfigured: boolean }> {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        return { isOnline: true, geminiConfigured: Boolean(data.geminiConfigured) };
      }
      return { isOnline: false, geminiConfigured: false };
    } catch (e) {
      return { isOnline: false, geminiConfigured: false };
    }
  },
};
