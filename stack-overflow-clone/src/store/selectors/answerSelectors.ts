import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectAnswersState = (state: RootState) => state.answers;

export const selectAllAnswers = createSelector(
  selectAnswersState,
  (answersState) => answersState.answers
);

export const selectAnswersStatus = createSelector(
  selectAnswersState,
  (answersState) => answersState.status
);

export const selectAnswersError = createSelector(
  selectAnswersState,
  (answersState) => answersState.error
);

export const selectAnswersByQuestionId = createSelector(
  [selectAllAnswers, (_state: RootState, questionId: number) => questionId],
  (answers, questionId) => answers.filter(answer => answer.question_id === questionId)
);