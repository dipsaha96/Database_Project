import React, { useEffect, useState } from "react";
import '../assets/CSS/department.css';

function Department() {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/department")
            .then(response => response.json())
            .then(data => setDepartments(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="department-container">
            <h1 className="department-heading">Department</h1>
            <table className="department-table">
                <thead>
                    <tr>
                        <th>Department Name</th>
                        <th>Department ID</th>
                        <th>Total Teachers</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((department, index) => (
                        <tr key={index}>
                            <td>{department.department_name}</td>
                            <td>{department.department_id}</td>
                            <td>{department.total_teachers}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Department;
