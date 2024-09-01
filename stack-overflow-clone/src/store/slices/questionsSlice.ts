import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Question } from '../../types/Question';

export type { Question };

interface QuestionsState {
  allQuestions: Question[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentPage: number;
  questionsPerPage: number;
}

const initialState: QuestionsState = {
  allQuestions: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  questionsPerPage: 10,
};

// Async thunk to fetch all questions
export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3087/api/questions/all');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch questions");
    }
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    // Action to set the current page for pagination
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // Action to set the number of questions displayed per page and reset to the first page
    setQuestionsPerPage: (state, action: PayloadAction<number>) => {
      state.questionsPerPage = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the loading state when fetching questions
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      // Handle the success state and update the questions in the state
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allQuestions = action.payload;
      })
      // Handle the failure state and store the error message
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage, setQuestionsPerPage } = questionsSlice.actions;
export default questionsSlice.reducer;
