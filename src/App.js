import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Questionnaire from './pages/questionnaire/Questionnaire';
import Dashboard from './pages/dashboard/dashboard';
import Academy from './pages/Academy';
import ActionPlans from './pages/ActionPlans';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Quiz from './pages/quiz/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/questionnaires" element={<Questionnaire />} />
        <Route path="/action-plans" element={<ActionPlans />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
