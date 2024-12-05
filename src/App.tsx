import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import SignUpPage from './components/SignupPage'; // Add SignUpPage
import './style.css';

const App: React.FC = () => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  // Function to handle login
  const handleLogin = () => {
    setUserLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setUserLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        <img
          src="https://home.iitk.ac.in/~arverma/images/logo1.png"
          alt="IITK Logo"
          className="app-logo"
        />
        <img
          src="https://apacnewsnetwork.com/wp-content/uploads/2021/07/C3i-Hub-Mentors-20-Cybersecurity-Startups.jpg"
          alt="C3i Logo"
          className="app-logo"
        />
        <h1>Blockchain Course Registration</h1>

        {/* Conditional rendering based on user login state */}
        {!userLoggedIn ? (
          <Routes>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUpPage />} /> {/* Signup route */}
          </Routes>
        ) : (
          <div>
            <RegistrationPage />
            <button onClick={handleLogout} className="logout-btn">
              Log Out
            </button>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
