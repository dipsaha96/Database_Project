// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../assets/CSS/teacher.css";

// function Teacher() {
//     const [teachers, setTeachers] = useState([]);

//     useEffect(() => {
//         fetch('http://localhost:8000/teacher')
//             .then(response => response.json())
//             .then(data => setTeachers(data))
//             .catch(error => console.error(error));
//     }, []);

//     // Function to handle the click event of the "View Information" button
//     const handleViewInformation = (teacherId) => {
//         // Log the studentId in the console
//         console.log("Teacher ID:", teacherId);
//     };

//     return (
//         <div className="teacher-container">
//             <h1>Teacher List</h1>
//             <table className="teacher-table">
//                 <thead>
//                     <tr>
//                         <th>Teacher ID</th>
//                         <th>Full Name</th>
//                         <th>Department Name</th>
//                         <th className="actions-column">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {teachers.map((teacher, index) => (
//                         <tr key={index}>
//                             <td>{teacher.teacher_id}</td>
//                             <td>{teacher.full_name}</td>
//                             <td>{teacher.department_name}</td>
//                             <td className="actions-column">
//                                 <Link to={`/teacher/${teacher.teacher_id}`} className="view-link">
//                                     <button className="view-button" onClick={() => handleViewInformation(teacher.teacher_id)}>Teacher Details</button>
//                                 </Link>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default Teacher;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/CSS/teacher.css";

function Teacher() {
    const [teachers, setTeachers] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState("teacher_id");
    const [searchValue, setSearchValue] = useState("");
    const [noTeachersFound, setNoTeachersFound] = useState(false);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = () => {
        let url = "http://localhost:8000/teacher";

        if (searchCriteria !== "teacher_id") {
            url += `?${searchCriteria}=${searchValue}`;
        } else {
            url += `/${searchValue}`;
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setTeachers(data);
                    setNoTeachersFound(data.length === 0);
                } else {
                    setTeachers([data]);
                    setNoTeachersFound(false);
                }
            })
            .catch((error) => console.error(error));
    };

    const handleSearch = () => {
        fetchTeachers();
    };

    const handleSelectChange = (e) => {
        setSearchCriteria(e.target.value);
        setSearchValue("");
        fetchTeachers();
    };

    return (
        <div className="teacher-container">
            <h1 className="teacher-heading">Teacher List</h1>
            <div className="search-container">
                <select value={searchCriteria} onChange={handleSelectChange}>
                    <option value="teacher_id">Search by Teacher ID</option>
                    <option value="department_id">Search by Department ID</option>
                </select>
                <input
                    type="text"
                    placeholder={`Enter ${searchCriteria === "teacher_id" ? "Teacher ID" : "Department ID"}`}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>
            {noTeachersFound ? (
                <p>No teachers found.</p>
            ) : (
                <table className="teacher-table">
                    <thead>
                        <tr>
                            <th>Teacher ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Department Name</th>
                            <th>Phone Number</th>
                            <th className="actions-column">Actions</th>
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
                                <td className="actions-column">
                                    <Link to={`/teacher/${teacher.teacher_id}`} className="view-link">
                                        <button className="view-button">Teacher Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Teacher;
