import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Chip, Divider, Container, Avatar } from '@mui/material';
import AnswerList from '../answers/AnswerList';
import CommentList from '../comments/CommentList';
import { useQuestions } from '../../hooks/useQuestions';
import { useAnswers } from '../../hooks/useAnswers';
import { useComments } from '../../hooks/useComments';
import FormattedText from '../FormattedText';

const QuestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Get the question ID from the URL parameters
  const { getQuestionById, fetchAllQuestions, status: questionStatus } = useQuestions();
  const { getAnswersByQuestionId, fetchAnswersForQuestion, status: answersStatus } = useAnswers();
  const { getCommentsByParent, fetchCommentsForParent } = useComments();

  const question = getQuestionById(Number(id));  // Retrieve the question details based on ID
  const answers = getAnswersByQuestionId(Number(id));  // Retrieve the answers associated with the question
  const comments = getCommentsByParent(Number(id));  // Retrieve the comments associated with the question

  useEffect(() => {
    if (id) {
      fetchAllQuestions(); 
      fetchAnswersForQuestion(Number(id));
      fetchCommentsForParent(Number(id));
    }
  }, [fetchAllQuestions, fetchAnswersForQuestion, fetchCommentsForParent, id]);

  // Handle loading and error states
  if (questionStatus === 'loading' || answersStatus === 'loading') return <div>Loading...</div>;
  if (questionStatus === 'failed' || answersStatus === 'failed') return <div>Error: Unable to load data</div>;
  if (!question) return <div>Question not found</div>;

  const getChipColor = (score: number) => {
    if (score > 0) return 'success';
    if (score < 0) return 'error';
    return 'default';
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {question.title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle1">
            <Avatar
              sx={{ width: 19, height: 19, float: 'left', margin: '3px 5px 0px 0px', fontSize: '0.5rem' }}
              alt={question.username}
            >
              {question.username[0].toUpperCase()}
            </Avatar>
            Asked by {question.username} on {new Date(question.creation * 1000).toLocaleDateString()}
          </Typography>
          <Box>
            <Chip 
              label={`${question.score} votes`} 
              color={getChipColor(question.score)}
              sx={{ mr: 1 }} 
            />
            <Chip 
            label={`${question.answer_count} answers`} 
            color={getChipColor(question.answer_count)}
            />
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" component="p">
          <FormattedText text={question.body} />
        </Typography>
        <CommentList comments={comments} />
        <Box sx={{ mt: 4 }}>
          <AnswerList answers={answers} />
        </Box>
      </Box>
    </Container>
  );
};

export default QuestionDetail;
