import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Answer } from '../../types/Answer';

export type { Answer };

interface AnswersState {
  answers: Answer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AnswersState = {
  answers: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch answers for a specific question
export const fetchAnswers = createAsyncThunk(
  'answers/fetchAnswers',
  async (questionId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3087/api/answers/post/${questionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch answers');
      }
      const result = await response.json();
      const data: Answer[] = result.data;
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch answers");
    }
  }
);

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {}, //reducers for add/remove etc would go here
  extraReducers: (builder) => {
    builder
      // Handle pending state when fetching answers
      .addCase(fetchAnswers.pending, (state) => {
        state.status = 'loading';
      })
      // Handle fulfilled state and update the answers in the state
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.answers = action.payload;
      })
      // Handle rejected state and store the error message
      .addCase(fetchAnswers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const {} = answersSlice.actions;
export default answersSlice.reducer;
