import React, { useState, useEffect } from 'react';

const StudentForm = () => {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      // Assuming you have an API endpoint to fetch the list of students
      const response = await fetch('/api/getstudents');
      const data = await response.json();
      console.log(data)
      setStudents(data["students"]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Function to fetch the list of students

    // Fetch students on initial load
    fetchStudents();
  }, []); // The empty dependency array ensures that this effect runs only on mount

  // You can also use useEffect to fetch students on state update
  useEffect(() => {
    // Fetch students whenever the component state updates
    if (studentName === '' )fetchStudents();
  }, [studentName]);

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

  const styles = {
    row: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    column: {
      flex: 1,
      padding: '10px',
      margin: '10px 5px',
    },
    item: {
      borderBottom: '1px solid #ddd', // Added faint line between rows
      padding: '5px 0',
    },
  };

  return (
    <div className="container content">
      <form onSubmit={handleSubmit}>
        <label htmlFor="student name">Student Name:</label>
        <input
          id="student name"
          type="text"
          value={studentName}
          onChange={handleChange}
          placeholder="Enter student name"
          required
        />
        <input type="submit" value="Add Student" className="custom-button"/>
      </form>
      <div>
      <div>
      <h1>Student List</h1>
      <div style={styles.row}>
        <div style={styles.column}>
          <strong>Name</strong>
          {students.map((student, index) => (
            <div key={index} style={styles.item}>
              {student.name}
            </div>
          ))}
        </div>
        <div style={styles.column}>
          <strong>Username</strong>
          {students.map((student, index) => (
            <div key={index} style={styles.item}>
              {student.username}
            </div>
          ))}
        </div>
        <div style={styles.column}>
          <strong>correct / attempted</strong>
          {students.map((student, index) => (
            <div key={index} style={styles.item}>
              {student.num_correct} / {student.num_attempt}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default StudentForm;