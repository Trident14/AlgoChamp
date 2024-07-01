import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const FormPage = ({ userScore }) => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false); // State to track form submission

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  

  const fetchData = () => {
    axios
      .get('https://algochampservice.onrender.com/point', { timeout: 1000 }) // Set a timeout of 1000ms (1 second)
      .then((response) => {
        // Handle success
        console.log('Data Received:', response.data);
        setData(response.data); // Update the data state with the response
        setSubmitted(true); // Set the submission state to true
      })
      .catch((error) => {
        // Handle error
        if (error.code === 'ECONNABORTED') {
          toast.error('Request timed out. Please try again later.');
        } else if (error.message.includes('Network Error')) {
          toast.error('Server is not responding. Please try again later.');
        } else {
          toast.error("This didn't work.");
        }
        // console.error('Error sending data to the backend:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      name: name,
      score: userScore,
    };

    axios
      .post('https://algochampservice.onrender.com/AddScore', dataToSend)
      .then((response) => {
        // Handle success
        // console.log('Data sent to the backend:', response.data);
        toast.success('Successfully Submitted!')
        setSubmitted(true); // Set the submission state to true
      })
      .catch((error) => {
        // Handle error
        toast.error("This didn't work.")
        // console.error('Error sending data to the backend:', error);
      });
  };

  return (
    <div>
      <h2>Enter Your Name and Submit Your Score</h2>

      {submitted ? ( // Conditionally render based on the submission state
        <div>
          <p>Form submitted successfully!</p>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={handleNameChange} />
          </div>
          <div>
            <label>Score:</label>
            <span>{userScore}</span>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default FormPage;
