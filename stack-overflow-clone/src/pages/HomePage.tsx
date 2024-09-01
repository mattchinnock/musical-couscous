import React from 'react';
import { Container } from '@mui/material';
import QuestionList from '../components/questions/QuestionList';

const HomePage: React.FC = () => {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <QuestionList />
      </Container>
    );
};

export default HomePage;