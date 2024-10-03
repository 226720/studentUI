import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // States for adding a student
  const [name, setName] = useState('');
  const [classes, setClasses] = useState('');
  const [division, setDivision] = useState('');
  const [school, setSchool] = useState('');
  
  // States for getting a student by ID
  const [studentId, setStudentId] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle adding a student
  const addStudent = async () => {
    try {
      const newStudent = {
        name: name,
        classes: classes,
        division: division,
        school: school,
        id: studentId
      };

      const response = await axios.post('http://localhost:8080/student', newStudent);
      alert('Student added successfully!');
      clearAddStudentForm();
    } catch (error) {
      console.error("Error adding student", error);
      alert('Failed to add student.');
    }
  };

  // Function to handle fetching student details by ID
  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/student/${studentId}`);
      setStudentDetails(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error("Error fetching student details", error);
      setErrorMessage('Student not found or an error occurred');
      setStudentDetails(null);
    }
  };

  // Clear form after adding a student
  const clearAddStudentForm = () => {
    setName('');
    setClasses('');
    setDivision('');
    setSchool('');
    setStudentId('');
  };

  return (
    <div>
      <h1>Student Management</h1>
      
      {/* Section to Add a Student */}
      <div>
        <h2>Add Student</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter student name"
        />
        <input
          type="text"
          value={classes}
          onChange={(e) => setClasses(e.target.value)}
          placeholder="Enter class"
        />
        <input
          type="text"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          placeholder="Enter division"
        />
        <input
          type="text"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          placeholder="Enter school"
        />
         <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Id"
        />
        <button onClick={addStudent}>Add Student</button>
      </div>

      {/* Section to Get Student Details by ID */}
      <div>
        <h2>Get Student Details</h2>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter student ID"
        />
        <button onClick={fetchStudentDetails}>Fetch Student</button>

        {/* Show fetched student details */}
        {studentDetails && (
          <div>
            <h3>Student Details</h3>
            <p>Name: {studentDetails.name}</p>
            <p>Class: {studentDetails.classes}</p>
            <p>Division: {studentDetails.division}</p>
            <p>School: {studentDetails.school}</p>
          </div>
        )}

        {/* Show error message if any */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default App;
