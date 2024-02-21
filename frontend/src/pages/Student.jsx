import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../assets/CSS/student.css';

function Student() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch the student data from the backend
        fetch("http://localhost:8000/student")
            .then((response) => response.json())
            .then((data) => setStudents(data))
            .catch((error) => console.error(error));
    }, []);

    // Function to handle the click event of the "View Information" button
    const handleViewInformation = (studentId) => {
        // Log the studentId in the console
        console.log("Student ID:", studentId);
    };

    return (
        <div className="student-container">
            <h1 className="student-heading">Student</h1>
            <table className="student-table">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Full Name</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Level</th>
                        <th>Term</th>
                        <th className="actions-column">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.student_id}</td>
                            <td>{student.full_name}</td>
                            <td>{student.age}</td>
                            <td>{student.address}</td>
                            <td>{student.level}</td>
                            <td>{student.term}</td>
                            <td className="actions-column">
                                <Link to={`/students/${student.student_id}`} className="view-link">
                                    <button className="view-button" onClick={() => handleViewInformation(student.student_id)}>View Information</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Student;
