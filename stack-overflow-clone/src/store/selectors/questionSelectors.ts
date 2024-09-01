import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectQuestionsState = (state: RootState) => state.questions;

export const selectAllQuestions = createSelector(
  selectQuestionsState,
  (questionsState) => questionsState.allQuestions
);

export const selectQuestionsStatus = createSelector(
  selectQuestionsState,
  (questionsState) => questionsState.status
);

export const selectQuestionsError = createSelector(
  selectQuestionsState,
  (questionsState) => questionsState.error
);

export const selectCurrentPage = createSelector(
  selectQuestionsState,
  (questionsState) => questionsState.currentPage
);

export const selectQuestionsPerPage = createSelector(
  selectQuestionsState,
  (questionsState) => questionsState.questionsPerPage
);

export const selectPaginatedQuestions = createSelector(
  [selectAllQuestions, selectCurrentPage, selectQuestionsPerPage],
  (allQuestions, currentPage, questionsPerPage) => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    return allQuestions.slice(startIndex, endIndex);
  }
);

export const selectTotalPages = createSelector(
  [selectAllQuestions, selectQuestionsPerPage],
  (allQuestions, questionsPerPage) => Math.ceil(allQuestions.length / questionsPerPage)
);

export const selectQuestionById = createSelector(
  [selectAllQuestions, (_state: RootState, questionId: number) => questionId],
  (questions, questionId) => questions.find(question => question.id === questionId)
);