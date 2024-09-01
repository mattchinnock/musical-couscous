import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../types/Comment';

interface CommentsState {
  byParentId: {
    [parentId: number]: Comment[];
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CommentsState = {
  byParentId: {},
  status: 'idle',
  error: null,
};

// Async thunk to fetch comments for a specific parent ID (e.g., question or answer)
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (parentId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3087/api/comments/post/${parentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const result = await response.json();
      const data: Comment[] = result.data;
      return { parentId, comments: data };
    } catch (error) {
      return rejectWithValue("Failed to fetch comments");
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {}, //reducers for add/remove etc would go here
  extraReducers: (builder) => {
    builder
      // Handle the loading state when fetching comments
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      // Handle the success state and store the fetched comments under the appropriate parent ID
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { parentId, comments } = action.payload;
        state.byParentId[parentId] = comments;
      })
      // Handle the failure state and store the error message
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const {} = commentsSlice.actions;
export default commentsSlice.reducer;
