import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../assets/CSS/studentInformation.css';
import { Link } from "react-router-dom";

function StudentInformation() {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        // Fetch student information from the backend
        axios.get(`http://localhost:8000/student/${studentId}`)
            .then(response => {
                setStudent(response.data);
            })
            .catch(error => {
                console.error('Error fetching student information:', error);
            });
    }, [studentId]);

    return (
        <div className="student-information-container">
            <h1>Student Information</h1>
            {student && (
                <div className="student-info-box">
                    <p><strong>Student ID:</strong> {student.student_id}</p>
                    <p><strong>Full Name:</strong> {student.full_name}</p>
                    <p><strong>Age:</strong> {student.age}</p>
                    <p><strong>Address:</strong> {student.address}</p>
                    <p><strong>Level:</strong> {student.level}</p>
                    <p><strong>Term:</strong> {student.term}</p>
                </div>
            )}
            <Link to={`/updatestudent`} className="view-link">
            <button className="view-button">Update Information</button>
            </Link>
        </div>
    );
}
 
export default StudentInformation;
