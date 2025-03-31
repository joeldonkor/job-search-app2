import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Changed here

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import { ThemeProvider } from './components/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#F8F8FA] dark:bg-gray-900 dark:text-white">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;