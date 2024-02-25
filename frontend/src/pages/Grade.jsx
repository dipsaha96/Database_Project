import React from "react";
import { useEffect, useState } from "react";

function Grade() {
    const [grades, setGrades] = useState([]);

    useEffect(() => {

        fetch('http://localhost:8000/grade')
            .then(response => response.json())
            .then(data => setGrades(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <center>
                <h1>Grade List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student Name</th>
                            <th>Term Result</th>
                            <th>Total CGPA</th>
                            <th>Grades</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((grade, index) => (
                            <tr key={index}>
                                <td>{grade.id}</td>
                                <td>{grade.student_name}</td>
                                <td>{grade.recent_term_cgpa}</td>
                                <td>{grade.overall_cgpa}</td>
                                <td>{grade.grades}</td>       
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default Grade;