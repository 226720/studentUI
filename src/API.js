import axios from 'axios';

const API_URL = 'http://localhost:8080/student';  // Your Spring Boot API URL

// Function to POST new student data
export const addStudent = async (student) => {
  try {
    const response = await axios.post(API_URL, student);
    return response.data;  // Return the added student
  } catch (error) {
    console.error("Error adding student", error);
    return null;  // Handle errors (e.g., return null if the request fails)
  }
};
