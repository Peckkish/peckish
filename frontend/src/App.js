import React, { useState } from 'react';

const UserInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [alternateTextIndex, setAlternateTextIndex] = useState(0); // For alternating text

  const alternatingTexts = [
    "Allergies? No worries.",
    "Let me know if you have any dietary requirements!",
    "Try a specific cuisine!",
    "Bulking? Cutting? Make sure to let me know"
  ];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAlternateText = () => {
    setAlternateTextIndex((prevIndex) => (prevIndex + 1) % alternatingTexts.length);
  };

  const handleSubmit = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_input: inputValue }),
    };

    try {
      const res = await fetch('http://localhost:8081/meal-plan', requestOptions);
      const contentType = res.headers.get('Content-Type');
      const text = await res.text();  // Read the response as text

      console.log(text);  // Log the response text

      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }

      if (contentType && contentType.includes('application/json')) {
        const data = JSON.parse(text);  // Parse the text as JSON
        setResponseData(data.answer || data);  // Handle different JSON structures
      } else {
        setResponseData(text);  // Handle raw text response
      }
      setError(null);
    } catch (error) {
      setError('Error: ' + error.message);
      setResponseData(null);
    }
  };

  const formatResponse = () => {
    if (!responseData) return null;
    try {
      const parsedData = JSON.parse(responseData); // Parse JSON response
      return Object.entries(parsedData).map(([key, value]) => (
        <div key={key}>
          <h3>{key}</h3>
          <ul>
            {value.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ));
    } catch (error) {
      return <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{responseData}</pre>;
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div> {/* Overlay for the blur effect */}
        <img src="/cheap_chow_logo.png" alt="Cheap Chow Logo" style={styles.logo} />
      <div style={styles.container}>
        <h1 style={styles.header}>What do you want to make?</h1>
        <p style={styles.alternatingText} onClick={handleAlternateText}>
          {alternatingTexts[alternateTextIndex]}
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter here!"
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.button}>
          Submit
        </button>
      </div>
      {responseData && (
        <div style={styles.responseContainer}>
          <h2>AI:</h2>
          <div style={styles.response}>
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0, overflow: 'auto' }}>
              {formatResponse()}
            </pre>
          </div>
        </div>
      )}
      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url("/bkg.jpg")`,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(180, 180, 180, 0.5)', // Adjust opacity here
  },
  container: {
    position: 'relative', // Ensure the container is above the overlay
    maxWidth: '1200px',
    width: '100%',
    margin: '20px auto',
    padding: '20px',
    textAlign: 'left',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 2,
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  responseContainer: {
    maxWidth: '1200px',
    width: '100%',
    margin: '20px auto',
    padding: '20px',
    textAlign: 'left',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 2,
  },
  response: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  error: {
    marginTop: '20px',
    color: 'red',
  },
  logo: {
    width: '300px', // Adjust size as needed
    height: 'auto', // Maintain aspect ratio
    marginBottom: '20px', // Adjust spacing
  },
  alternatingText: {
    fontSize: '14px', // Adjust size as needed
    color: '#666', // Adjust color
    cursor: 'pointer', // Show pointer on hover
    marginBottom: '10px', // Adjust spacing
  },
};

export default UserInput;
