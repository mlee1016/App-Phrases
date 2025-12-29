import { QuizState } from './quiz-state';

export interface StudyRule {
  onCorrect(state: QuizState): QuizState;
  onWrong(state: QuizState): QuizState;
}
