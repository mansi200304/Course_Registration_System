import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the App component
import './style.css'; // Import global styles

// Get the root element where React will mount
const rootElement = document.getElementById('root');

// Ensure root element exists before proceeding with React rendering
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  // Render the App component inside the 'root' element
  root.render(
    <React.StrictMode>
      <App /> {/* App component will be rendered here */}
    </React.StrictMode>
  );
} else {
  // Log an error if the root element is not found in the HTML
  console.error("Root element not found! Please check your HTML structure.");
}
