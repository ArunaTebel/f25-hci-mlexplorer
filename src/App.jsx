import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeProgress } from './utils/progressTracker';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CourseLearning from './pages/CourseLearning';
import Assessment from './pages/Assessment';
import Certificate from './pages/Certificate';
import Labs from './pages/Labs';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';

function App() {
  useEffect(() => {
    // Initialize progress tracking on app load
    initializeProgress();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course/:courseId" element={<CourseLearning />} />
        <Route path="/course/:courseId/:moduleId/:lessonId" element={<CourseLearning />} />
        <Route path="/course/:courseId/quiz/:quizId" element={<Assessment />} />
        <Route path="/certificates" element={<Certificate />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/contact" element={<Contact />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

