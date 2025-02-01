// src/App.jsx
import React from 'react';
import { ThemeProvider } from './components/ThemeContext';
import Navbar from './components/Navbar';
import JobSearch from './components/JobSearch';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen dark:bg-gray-900 dark:text-white">
        <Navbar />
        <JobSearch />
        {/* Add other components here */}
      </div>
    </ThemeProvider>
  );
}

export default App;
