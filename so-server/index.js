const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database('stackoverfaux.db');
const cors = require('cors');

app.use(cors());

// Middleware to log each request with timestamp, HTTP method, and URL
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Route to get all questions with associated metadata
app.get('/api/questions/all', (req, res) => {
  const query = `SELECT q.id, q.title, q.body, q.creation, q.score, u.name AS username, 
                 COUNT(a.id) AS answer_count 
                 FROM questions q 
                 LEFT JOIN answers a ON q.id = a.question_id 
                 INNER JOIN users u ON q.user_id = u.id 
                 GROUP BY q.id, q.title, q.body, q.creation, q.score, q.user_id`;
                 
  db.all(query, [], (err, rows) => {
    if (err) {
      // Respond with error if query fails
      res.status(400).json({ error: err.message });
      return;
    }
    // Respond with the retrieved questions data
    res.json({
      data: rows,
    });
  });
});

// Route to get all answers for a specific question by question ID
app.get('/api/answers/post/:questionId', (req, res) => {
  const query = `SELECT a.*, u.name AS username 
                 FROM answers a 
                 LEFT JOIN users u ON a.user_id = u.id 
                 WHERE question_id = ${req.params.questionId}`;
                 
  db.all(query, [], (err, rows) => {
    if (err) {
      // Respond with error if query fails
      res.status(400).json({ error: err.message });
      return;
    }
    // Respond with the retrieved answers data
    res.json({
      data: rows,
    });
  });
});

// Route to get all comments for a specific post by parent post ID (question or answer)
app.get('/api/comments/post/:parentId', (req, res) => {
  const query = `SELECT c.*, u.name AS username 
                 FROM comments c 
                 LEFT JOIN users u ON c.user_id = u.id 
                 WHERE post_id = ${req.params.parentId}`;
                 
  db.all(query, [], (err, rows) => {
    if (err) {
      // Respond with error if query fails
      res.status(400).json({ error: err.message });
      return;
    }
    // Respond with the retrieved comments data
    res.json({
      data: rows,
    });
  });
});

// Route to get user information along with their questions and answers by user ID
app.get('/api/user/:userId', (req, res) => {
  const userQuery = `SELECT id, name AS username 
                     FROM users 
                     WHERE id = ${req.params.userId}`;
                     
  const questionsQuery = `SELECT id, title, body, creation, score 
                          FROM questions 
                          WHERE user_id = ${req.params.userId}`;
                          
  const answersQuery = `SELECT id, body, creation, score 
                        FROM answers 
                        WHERE user_id = ${req.params.userId}`;

  // Fetch user information
  db.get(userQuery, [], (err, user) => {
    if (err) {
      // Respond with error if query fails
      res.status(400).json({ error: err.message });
      return;
    }
    if (!user) {
      // Respond with 404 if user is not found
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Fetch user's questions
    db.all(questionsQuery, [], (err, questions) => {
      if (err) {
        // Respond with error if query fails
        res.status(400).json({ error: err.message });
        return;
      }

      // Fetch user's answers
      db.all(answersQuery, [], (err, answers) => {
        if (err) {
          // Respond with error if query fails
          res.status(400).json({ error: err.message });
          return;
        }

        // Respond with user data, including questions and answers
        res.json({
          data: {
            user,
            questions,
            answers
          }
        });
      });
    });
  });
});

// Start the server on port 3087
app.listen(3087, () => {
  console.log('Server is running on port 3087');
});
