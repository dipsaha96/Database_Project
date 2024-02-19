import React from "react";
import { useEffect, useState } from "react";

function Teacher() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {

        fetch('http://localhost:8000/teacher')
            .then(response => response.json())
            .then(data => setTeachers(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <center>
                <h1>Teacher List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Teacher ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Department Name</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher, index) => (
                            <tr key={index}>
                                <td>{teacher.teacher_id}</td>
                                <td>{teacher.full_name}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.address}</td>
                                <td>{teacher.department_name}</td>
                                <td>{teacher.phone_number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default Teacher;