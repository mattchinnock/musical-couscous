import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchAnswers } from '../store/slices/answersSlice';
import { selectAllAnswers, selectAnswersStatus, selectAnswersError, selectAnswersByQuestionId } from '../store/selectors/answerSelectors';
import { useCallback } from 'react';

export const useAnswers = () => {
  const dispatch = useDispatch<AppDispatch>();

  const answers = useSelector(selectAllAnswers);  // Get all answers from the Redux store
  const status = useSelector(selectAnswersStatus);  // Get the current status of answer fetching
  const error = useSelector(selectAnswersError);  // Get any errors related to answer fetching

  // Function to fetch answers for a specific question
  const fetchAnswersForQuestion = useCallback((questionId: number) => {
    console.log("Fetching answers...");
    dispatch(fetchAnswers(questionId))
      .unwrap()
      .then(() => console.log("Answers fetched successfully"))
      .catch((error) => console.error("Error fetching answers:", error));
  }, [dispatch]);

  // Function to get answers for a specific question by its ID
  const getAnswersByQuestionId = useCallback(
    (questionId: number) => {
      return useSelector((state: RootState) => selectAnswersByQuestionId(state, questionId));
    },
    []
  );

  return {
    answers, 
    status,
    error,
    getAnswersByQuestionId, 
    fetchAnswersForQuestion,
  };
};
