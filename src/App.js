import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import Academy from './pages/Academy';
import ActionPlans from './pages/ActionPlans';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Quiz from './pages/quiz/Quiz';
import Question from './pages/question/Question';
import Questionnaire from './pages/question/Question'
import Login from './auth/login/login';
import Signup from './auth/register/signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/academy" element={<Academy />} />
      <Route path="/questionnaires" element={<Questionnaire />} />
      <Route path="/action-plans" element={<ActionPlans />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/questionnaire" element={<Question />} />
      <Route path="/logout" element={<Signup />} />
    </Routes>
  );
}
export default App;
