import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './slices/questionsSlice';
import answersReducer from './slices/answersSlice';
import commentsReducer from './slices/commentsSlice';

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    answers: answersReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;