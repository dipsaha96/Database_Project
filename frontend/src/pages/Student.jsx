import React from "react";
import { useEffect, useState } from "react";

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
        <div>
            <center>
                <h1>Student</h1>
                <table>
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
            </center>
        </div>
    );
}

export default Student;
