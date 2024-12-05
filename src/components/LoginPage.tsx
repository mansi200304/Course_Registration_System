import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectWallet } from '../web3';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle MetaMask connection
  const handleMetamaskConnect = async () => {
    try {
      const walletAddress = await connectWallet();
      if (walletAddress) {
        onLogin();  // Call onLogin to proceed to the next page
      }
    } catch (error) {
      console.error("MetaMask connection error:", error);
    }
  };

  // Handle Coinbase connection (for now showing an alert)
  const handleCoinbaseConnect = () => {
    alert("Coinbase Wallet connection is not yet implemented.");
    onLogin();  // For now, proceed to the registration page without connecting a wallet
  };

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simulate an API call to authenticate the user
    const isAuthenticated = await authenticateUser(email, password);
    if (isAuthenticated) {
      onLogin();  // Call onLogin to proceed to the next page
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  // Simulated user authentication (replace with actual API call)
  const authenticateUser = async (email: string, password: string) => {
    // Replace with actual API call for authentication (backend check)
    const registeredUsers = [
      { email: 'user1@example.com', password: 'password123' },
      { email: 'user2@example.com', password: 'password456' },
    ];
    return registeredUsers.some(user => user.email === email && user.password === password);
  };

  return (
    <div className="login-page-container">
      <h2>Login</h2>
      
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="login-button">Login</button>
      </form>

      <div className="signup-link">
        <p>New User? <a href="/signup" onClick={() => navigate('/signup')}>Sign up here</a></p>
      </div>

      <div className="wallet-connect-buttons">
        <button onClick={handleMetamaskConnect}>Connect MetaMask</button>
        <button onClick={handleCoinbaseConnect}>Connect Coinbase Wallet</button>
      </div>
    </div>
  );
};

export default LoginPage;
