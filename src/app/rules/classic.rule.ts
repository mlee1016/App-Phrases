import { StudyRule } from './s-rules';
import { QuizState } from './quiz-state';

export class ClassicRule implements StudyRule {

  onCorrect(state: QuizState): QuizState {
    const remaining = [...state.remaining];
    remaining.splice(state.index, 1); // remove card

    return {
      remaining,
      index: state.index % (remaining.length || 1),
      streak: state.streak + 1
    };
  }

  onWrong(state: QuizState): QuizState {
    return {
      ...state,
      index: (state.index + 1) % state.remaining.length,
      streak: 0
    };
  }
}
