import React, { useEffect, useState } from "react";
import '../Style/scores.css'
import axios from "axios";

const Score = () => {
  const [data, setData] = useState([]);
  

  const fetchData = () => {
    axios
      .get('http://localhost:8080/point')
      .then((response) => {
        // Handle success
        console.log('Data Received:', response.data);
        setData(response.data); // Update the data state with the response
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching data from the backend:', error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>{item.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Score;
