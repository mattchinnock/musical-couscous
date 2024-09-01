import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectCommentsState = (state: RootState) => state.comments;

export const selectAllComments = createSelector(
  selectCommentsState,
  (commentsState) => Object.values(commentsState.byParentId).flat()
);

export const selectCommentsStatus = createSelector(
  selectCommentsState,
  (commentsState) => commentsState.status
);

export const selectCommentsError = createSelector(
  selectCommentsState,
  (commentsState) => commentsState.error
);

export const selectCommentsByParent = createSelector(
  [selectCommentsState, (_state: RootState, parentId: number) => parentId],
  (commentsState, parentId) => commentsState.byParentId[parentId] || []
);