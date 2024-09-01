import React from 'react';
import { ListItem, ListItemText, Typography, Box, Avatar } from '@mui/material';
import { Comment } from '../../types/Comment';
import FormattedText from '../FormattedText';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: 'bold', mr: 1 }}
            >
              <Avatar 
                sx={{ width: 19, height: 19, float: 'left', margin: '2px 5px 0px 0px', fontSize: '0.5rem' }}
                alt={comment.username}
              >
                {comment.username[0].toUpperCase()}
              </Avatar>
              {comment.username}
            </Typography>
        </React.Fragment>
        }
        secondary={
          <Box sx={{ mt: 1 }}>
            {/* Display the comment body with formatted text */}
            <FormattedText text={comment.body} />
          </Box>
        }
      />
    </ListItem>
  );
};

export default CommentItem;
