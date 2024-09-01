import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchComments } from '../store/slices/commentsSlice';
import { selectAllComments, selectCommentsStatus, selectCommentsError, selectCommentsByParent } from '../store/selectors/commentSelectors';
import { useCallback } from 'react';

export const useComments = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Selectors to retrieve comments, status, and error from the Redux store
  const comments = useSelector(selectAllComments);
  const status = useSelector(selectCommentsStatus);
  const error = useSelector(selectCommentsError);

  // Function to get comments by parent ID
  const getCommentsByParent = useCallback(
    (parentId: number) => {
      return useSelector((state: RootState) => selectCommentsByParent(state, parentId));
    },
    []
  );

  // Function to fetch comments for a specific parent ID
  const fetchCommentsForParent = useCallback((parentId: number) => {
    dispatch(fetchComments(parentId))
      .unwrap()
      .then(() => console.log("Comments fetched successfully"))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [dispatch]);

  return {
    comments,
    status,
    error,
    getCommentsByParent,
    fetchCommentsForParent,
  };
};
