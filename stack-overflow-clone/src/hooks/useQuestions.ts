import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchQuestions, setCurrentPage, setQuestionsPerPage } from '../store/slices/questionsSlice';
import { 
  selectPaginatedQuestions, 
  selectQuestionsStatus, 
  selectQuestionsError, 
  selectQuestionById, 
  selectCurrentPage, 
  selectTotalPages, 
  selectQuestionsPerPage 
} from '../store/selectors/questionSelectors';
import { useCallback } from 'react';
import { Question } from '../types/Question';

export const useQuestions = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors to retrieve various pieces of state from the Redux store
  const paginatedQuestions = useSelector(selectPaginatedQuestions);
  const status = useSelector(selectQuestionsStatus);
  const error = useSelector(selectQuestionsError);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const questionsPerPage = useSelector(selectQuestionsPerPage);

  // Memoized callback to get a question by its ID
  const getQuestionById = useCallback(
    (id: number): Question | undefined => {
      return useSelector((state: RootState) => selectQuestionById(state, id));
    },
    []
  );

  // Fetch all questions and update the state
  const fetchAllQuestions = useCallback(() => {
    dispatch(fetchQuestions())
      .unwrap()
      .then(() => console.log("Questions fetched successfully"))
      .catch((error) => console.error("Error fetching questions:", error));
  }, [dispatch]);

  // Change the current page in the pagination
  const changeCurrentPage = useCallback((page: number) => {
    dispatch(setCurrentPage(page));
  }, [dispatch]);

  // Change the number of questions displayed per page
  const changeQuestionsPerPage = useCallback((perPage: number) => {
    dispatch(setQuestionsPerPage(perPage));
  }, [dispatch]);

  return {
    questions: paginatedQuestions, // The list of questions for the current page
    status, 
    error, 
    currentPage, 
    totalPages, 
    questionsPerPage, 
    getQuestionById,
    fetchAllQuestions,
    changeCurrentPage,
    changeQuestionsPerPage,
  };
};
