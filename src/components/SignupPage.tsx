import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // API call to save user data in backend
    const isSuccess = await registerUser({ name, course, dob, email, password });

    if (isSuccess) {
      navigate('./LoginPage.tsx');  
            }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Course:</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          >
            <option value="">Select Course</option>
            <option value="BTech">BTech</option>
            <option value="MTech">MTech</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

// API call to register user
const registerUser = async (userData: { name: string; course: string; dob: string; email: string; password: string }) => {
  try {
    const response = await fetch('http://localhost:5000/api/register-user', {  // Ensure full URL to the backend API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    if (response.ok) {
      return true;
    } else {
      console.error(result.message);
      return false;
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return false;
  }
};

export default SignupPage;
