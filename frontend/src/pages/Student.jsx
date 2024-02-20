import React, { useEffect, useState } from "react";
import '../assets/CSS/student.css'; // Import CSS file for styling

function Student() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch the student data from the backend
        fetch("http://localhost:8000/student")
            .then((response) => response.json())
            .then((data) => setStudents(data))
            .catch((error) => console.error(error));
    }, []);

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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Student;
