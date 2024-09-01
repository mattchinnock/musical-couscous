import React from 'react';
import { ListItem, ListItemText, Typography, Box, Divider, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Question } from '../../types/Question';

interface QuestionItemProps {
  question: Question;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        component={RouterLink}
        to={`/questions/${question.id}`}
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          py: 2,
        }}
      >
        {/* Display the question's score */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
          <Typography variant="body1" fontWeight="bold">{question.score}</Typography>
          <Typography variant="caption">votes</Typography>
        </Box>
        {/* Display the number of answers for the question */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
          <Typography variant="body1" fontWeight="bold">{question.answer_count}</Typography>
          <Typography variant="caption">answers</Typography>
        </Box>
        {/* Display the question title and additional information */}
        <ListItemText
          primary={question.title}
          secondary={
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              {/* Display the user's avatar with the first letter of their username */}
              <Avatar 
                sx={{ width: 19, height: 19, mr: 1, fontSize: '0.5rem' }}
                alt={question.username}
              >
                {question.username[0].toUpperCase()}
              </Avatar>
              {/* Display the username and the date the question was asked */}
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {question.username} asked on {new Date(question.creation * 1000).toLocaleDateString()}
              </Typography>
            </Box>
          }
          sx={{ flex: 1 }}
        />
      </ListItem>
      {/* Divider between questions */}
      <Divider component="li" />
    </>
  );
};

export default QuestionItem;
