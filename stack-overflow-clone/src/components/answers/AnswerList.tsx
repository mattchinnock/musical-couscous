import React from 'react';
import { Typography, Box, Divider } from '@mui/material';
import AnswerItem from './AnswerItem';
import { Answer } from '../../types/Answer';

interface AnswerListProps {
  answers: Answer[];
}

const AnswerList: React.FC<AnswerListProps> = ({ answers }) => {
  return (
    <Box>
      {/* Display the number of answers with proper pluralization */}
      <Typography variant="h5" component="h2" gutterBottom>
        {answers.length} Answer{answers.length !== 1 ? 's' : ''}
      </Typography>
      
      <Divider sx={{ mb: 2 }} />  {/* Divider between the heading and the list of answers */}
      
      {/* Iterate over the answers array and render an AnswerItem for each answer */}
      {answers.map((answer) => (
        <AnswerItem key={answer.id} answer={answer} />
      ))}
    </Box>
  );
};

export default AnswerList;
