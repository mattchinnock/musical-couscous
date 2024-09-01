import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Typography, 
  Box, 
  Container, 
  Avatar, 
  Grid, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  CircularProgress 
} from '@mui/material';
import { User } from '../../types/User';
import { Question } from '../../types/Question';
import { Answer } from '../../types/Answer';

interface UserProfileData {
  user: User;
  questions: Question[];
  answers: Answer[];
}

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile data when the component mounts or when userId changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3087/api/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setProfileData(data.data);  // Set the fetched data to state
      } catch (err) {
        setError('Error fetching user profile');  // Handle any errors during fetch
        console.error(err);
      } finally {
        setLoading(false);  // Ensure loading is set to false after fetch completes
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return <CircularProgress />;  // Display loading spinner while data is being fetched
  if (error) return <Typography color="error">{error}</Typography>;  // Display error message if fetch fails
  if (!profileData) return <Typography>No user data found</Typography>;  // Display message if no data is found

  const { user, questions, answers } = profileData;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            {/* User profile section */}
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <Avatar 
                sx={{ width: 100, height: 100, mx: 'auto', my: 2 }}
                alt={user.username}
              />
              <Typography variant="h5" gutterBottom>{user.username}</Typography>
              <Typography variant="body2" color="text.secondary">
                Member since 07/20/2021
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Reputation: 1012
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            {/* User questions section */}
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Questions ({questions.length})</Typography>
              <List>
                {questions.map((question) => (
                  <ListItem key={question.id}>
                    <ListItemText 
                      primary={question.title}
                      secondary={`Votes: ${question.score} | Created: ${new Date(question.creation * 1000).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
            {/* User answers section */}
            <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
              <Typography variant="h6" gutterBottom>Answers ({answers.length})</Typography>
              <List>
                {answers.map((answer) => (
                  <ListItem key={answer.id}>
                    <ListItemText 
                      primary={answer.body.substring(0, 100) + "..."}  // Display the first 100 characters of the answer
                      secondary={`Votes: ${answer.score} | Accepted: ${answer.accepted ? 'Yes' : 'No'} | Created: ${new Date(answer.creation * 1000).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserProfile;
