import React from 'react';
import { List, Typography, Box } from '@mui/material';
import CommentItem from './CommentItem';
import { Comment } from '../../types/Comment';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Comments ({comments.length})
      </Typography>
      
      <List>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </List>
    </Box>
  );
};

export default CommentList;
