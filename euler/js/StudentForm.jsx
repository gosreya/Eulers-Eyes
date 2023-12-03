import React, { useState } from 'react';

const StudentForm = () => {
  const [studentName, setStudentName] = useState('');

  const handleChange = (e) => {
    setStudentName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform POST request to the "/addstudent/" endpoint
    try {
      const response = await fetch('/addstudent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentName }),
      });

      if (response.ok) {
        // Handle success, e.g., redirect or show a success message
        console.log('Student added successfully!');
      } else {
        // Handle error, e.g., show an error message
        console.error('Error adding student:', response.status);
      }
    } catch (error) {
      console.error('Error adding student:', error.message);
    }

    setStudentName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Student Name:
        <input
          type="text"
          value={studentName}
          onChange={handleChange}
          placeholder="Enter student name"
          required
        />
      </label>

      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;