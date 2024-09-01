import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import QuestionDetail from './components/questions/QuestionDetail';
import UserProfile from './components/users/UserProfile';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions/:id" element={<QuestionDetail />} />
        <Route path="/users/:userId" element={<UserProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;