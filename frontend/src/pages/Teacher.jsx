import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/CSS/teacher.css";

function Teacher() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/teacher')
            .then(response => response.json())
            .then(data => setTeachers(data))
            .catch(error => console.error(error));
    }, []);

    // Function to handle the click event of the "View Information" button
    const handleViewInformation = (teacherId) => {
        // Log the studentId in the console
        console.log("Teacher ID:", teacherId);
    };

    return (
        <div className="teacher-container">
            <h1>Teacher List</h1>
            <table className="teacher-table">
                <thead>
                    <tr>
                        <th>Teacher ID</th>
                        <th>Full Name</th>
                        <th>Department Name</th>
                        <th className="actions-column">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((teacher, index) => (
                        <tr key={index}>
                            <td>{teacher.teacher_id}</td>
                            <td>{teacher.full_name}</td>
                            <td>{teacher.department_name}</td>
                            <td className="actions-column">
                                <Link to={`/teacher/${teacher.teacher_id}`} className="view-link">
                                    <button className="view-button" onClick={() => handleViewInformation(teacher.teacher_id)}>Teacher Details</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Teacher;
