// src/App.jsx
import React from 'react';
import { ThemeProvider } from './components/ThemeContext';
import Navbar from './components/Navbar';
import JobContainer from './components/JobContainer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen  bg-white dark:bg-gray-900 dark:text-white">
        <Navbar />
        <JobContainer />
        
        {/* Add other components here */}
      </div>
    </ThemeProvider>
  );
}

export default App;
