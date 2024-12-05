import React, { useState } from 'react';
import { registerCourse } from '../registrationLogic'; // Import registerCourse function
import { connectWallet } from '../web3'; // Import connectWallet function

const RegistrationPage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [elective, setElective] = useState('');
  const [researchProposal, setResearchProposal] = useState<File | null>(null);
  const [researchField, setResearchField] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle course selection
  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(event.target.value);
    setElective(''); // Reset elective when course is changed
  };

  // Handle elective selection
  const handleElectiveChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setElective(event.target.value);
  };

  // Handle file upload (research proposal)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setResearchProposal(event.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (selectedCourse === "PhD" && !researchProposal) {
      setFeedbackMessage("Please upload your research proposal and SOP.");
      return;
    }

    // Connect to wallet
    const walletAddress = await connectWallet();  // Get the user's wallet address
    if (!walletAddress) {
      setFeedbackMessage("Failed to connect wallet. Please try again.");
      return;
    }

    setLoading(true);
    setFeedbackMessage("");

    // Prepare the courses to register
    const selectedCourses = [selectedCourse, elective].filter(Boolean); // Ensure we don't have empty strings

    // Call registerCourse function to interact with blockchain, pass walletAddress as the second argument
    const result = await registerCourse(selectedCourses, walletAddress);  // <-- Pass walletAddress here!

    // Provide feedback based on the result
    if (result.success) {
      setFeedbackMessage("Congratulations! You are successfully registered.");
    } else {
      setFeedbackMessage(result.message); // Error message
    }

    setLoading(false); // Stop loading indicator
  };

  return (
    <div className="registration-container">
      <h2>Select Your Course</h2>
      <select value={selectedCourse} onChange={handleCourseChange}>
        <option value="">Select a course</option>
        <option value="BTech">BTech</option>
        <option value="MTech">MTech</option>
        <option value="PhD">PhD</option>
      </select>

      {selectedCourse && (
        <>
          <h3>Compulsory Courses</h3>
          {selectedCourse === 'BTech' && (
            <div>
              <input type="checkbox" id="math" />
              <label htmlFor="math">Mathematics</label><br />
              <input type="checkbox" id="phy" />
              <label htmlFor="phy">Physics</label>
            </div>
          )}
          {selectedCourse === 'MTech' && (
            <div>
              <input type="checkbox" id="cloud" />
              <label htmlFor="cloud">Cloud Architecture</label><br />
              <input type="checkbox" id="blockchain" />
              <label htmlFor="blockchain">Blockchain</label>
            </div>
          )}

          <h3>Select Elective</h3>
          <select value={elective} onChange={handleElectiveChange}>
            <option value="">Select an elective</option>
            {selectedCourse === 'BTech' && (
              <>
                <option value="BigData">Big Data</option>
                <option value="AI">AI</option>
              </>
            )}
            {selectedCourse === 'MTech' && (
              <>
                <option value="DataScience">Data Science</option>
                <option value="DigitalForensics">Digital Forensics</option>
              </>
            )}
            {selectedCourse === 'PhD' && (
              <>
                <option value="MachineLearning">Machine Learning</option>
                <option value="DataScience">Data Science</option>
                <option value="Cryptocurrency">Cryptocurrency</option>
                <option value="CyberCrimes">Cyber Crimes</option>
              </>
            )}
          </select>

          {selectedCourse === 'PhD' && (
            <>
              <h3>Upload Research Proposal and SOP</h3>
              <input type="file" onChange={handleFileChange} />
              <input
                type="text"
                placeholder="Research Field"
                value={researchField}
                onChange={(e) => setResearchField(e.target.value)}
              />
              <input
                type="text"
                placeholder="Select Professor"
                value={selectedProfessor}
                onChange={(e) => setSelectedProfessor(e.target.value)}
              />
            </>
          )}

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Registering..." : "Submit Registration"}
          </button>

          {/* Display feedback message */}
          {feedbackMessage && <p>{feedbackMessage}</p>}
        </>
      )}
    </div>
  );
};

export default RegistrationPage;
