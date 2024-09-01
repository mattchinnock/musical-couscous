import React, { useEffect } from 'react';
import { List, Typography, Box, CircularProgress, Pagination, Select, MenuItem } from '@mui/material';
import QuestionItem from './QuestionItem';
import { useQuestions } from '../../hooks/useQuestions';

const QuestionList: React.FC = () => {
  const {
    questions,
    status,
    error,
    currentPage,
    totalPages,
    questionsPerPage,
    fetchAllQuestions,
    changeCurrentPage,
    changeQuestionsPerPage
  } = useQuestions();

  useEffect(() => {
    console.log("QuestionList mounted, fetching all questions...");
    fetchAllQuestions();
  }, [fetchAllQuestions]);

  console.log("QuestionList render - status:", status, "questions:", questions, "error:", error);

  if (status === 'loading') return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  
  if (status === 'failed') return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Questions
      </Typography>
      
      <List>
        {questions.map(question => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </List>
      
      {/* Pagination controls and items per page selector */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => changeCurrentPage(page)}
        />
        <Select
          value={questionsPerPage}
          onChange={(event) => changeQuestionsPerPage(event.target.value as number)}
          sx={{
            border: 'none',
            '.MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            boxShadow: 'none',
          }}
        >
          <MenuItem value={5}>5 per page</MenuItem>
          <MenuItem value={10}>10 per page</MenuItem>
          <MenuItem value={20}>20 per page</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default QuestionList;
