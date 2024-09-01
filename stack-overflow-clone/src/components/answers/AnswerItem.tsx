import React, { useEffect } from 'react';
import { Typography, Box, Chip, Card, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Answer } from '../../types/Answer';
import CommentList from '../comments/CommentList';
import { useComments } from '../../hooks/useComments';
import FormattedText from '../FormattedText';

interface AnswerItemProps {
  answer: Answer;
}

const AnswerItem: React.FC<AnswerItemProps> = ({ answer }) => {
  const { getCommentsByParent, fetchCommentsForParent } = useComments();
  const comments = getCommentsByParent(answer.id);

  // Function to determine the color of the Chip based on the answer's score
  const getChipColor = (score: number) => {
    if (score > 0) return 'success';
    if (score < 0) return 'error';
    return 'default';
  };

  // Fetch comments related to the answer when the component mounts or answer ID changes
  useEffect(() => {
    if (answer && answer.id) {
      fetchCommentsForParent(answer.id);
    }
  }, [fetchCommentsForParent, answer]);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          {/* Display the username of the answerer and the date the answer was created */}
          <Typography variant="body2" color="text.secondary">
            Answered by {answer.username} on {new Date(answer.creation * 1000).toLocaleDateString()}
          </Typography>
          <Box>
            {/* Chip displaying the score of the answer with a conditional icon for accepted answers */}
            <Chip 
              icon={answer.accepted ? <CheckCircleIcon /> : undefined} 
              label={`${answer.score} votes`} 
              color={getChipColor(answer.score)}
              sx={{ mr: 1 }} 
            />
            {/* Additional Chip to indicate if the answer is accepted */}
            {answer.accepted && <Chip label="Accepted" color="success" />}
          </Box>
        </Box>
        {/* Render the answer body using the FormattedText component */}
        <Typography variant="body1">
          <FormattedText text={answer.body} />
        </Typography>
        {/* Render the list of comments associated with the answer */}
        <CommentList comments={comments} />
      </CardContent>
    </Card>
  );
};

export default AnswerItem;
