// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import '../assets/CSS/student.css';

// function Student() {
//     const [students, setStudents] = useState([]);

//     useEffect(() => {
//         // Fetch the student data from the backend
//         fetch("http://localhost:8000/student")
//             .then((response) => response.json())
//             .then((data) => setStudents(data))
//             .catch((error) => console.error(error));
//     }, []);

//     // Function to handle the click event of the "View Information" button
//     const handleViewInformation = (studentId) => {
//         // Log the studentId in the console
//         console.log("Student ID:", studentId);
//     };

//     return (
//         <div className="student-container">
//             <h1 className="student-heading">Student</h1>
//             <table className="student-table">
//                 <thead>
//                     <tr>
//                         <th>Student ID</th>
//                         <th>Full Name</th>
//                         <th>Age</th>
//                         <th>Address</th>
//                         <th>Level</th>
//                         <th>Term</th>
//                         <th className="actions-column">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.map((student, index) => (
//                         <tr key={index}>
//                             <td>{student.student_id}</td>
//                             <td>{student.full_name}</td>
//                             <td>{student.age}</td>
//                             <td>{student.address}</td>
//                             <td>{student.level}</td>
//                             <td>{student.term}</td>
//                             <td className="actions-column">
//                                 <Link to={`/students/${student.student_id}`} className="view-link">
//                                     <button className="view-button" onClick={() => handleViewInformation(student.student_id)}>View Information</button>
//                                 </Link>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default Student;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import '../assets/CSS/student.css';

// function StudentDetails() {
//     const [students, setStudents] = useState([]);
//     const [searchCriteria, setSearchCriteria] = useState("level");
//     const [searchValue, setSearchValue] = useState("");

//     useEffect(() => {
//         fetchStudents();
//     }, []); 

//     const fetchStudents = () => {
//         let url = "http://localhost:8000/student";

//         if (searchCriteria !== "id") {
//             url += `?${searchCriteria}=${searchValue}`;
//         } else {
//             url += `/${searchValue}`;
//         }

//         fetch(url)
//             .then((response) => response.json())
//             .then((data) => {
//                 if (Array.isArray(data)) {
//                     setStudents(data);
//                 } else {
//                     setStudents([data]);
//                 }
//             })
//             .catch((error) => console.error(error));
//     };

//     const handleSearch = () => {
//         if (searchValue.trim() === "") {
//             fetchStudents();
//         } else {
//             fetchStudents();
//         }
//     };

//     const handleSelectChange = (e) => {
//         setSearchCriteria(e.target.value);
//         setSearchValue("");
//         fetchStudents();
//     };

//     return (
//         <div className="student-container">
//             <h1 className="student-heading">Student</h1>
//             <div className="search-container">
//                 <select value={searchCriteria} onChange={handleSelectChange}>
//                     <option value="level">Search by Level</option>
//                     <option value="term">Search by Term</option>
//                     <option value="department_id">Search by Department ID</option>
//                     <option value="student_id">Search by Student ID</option>
//                 </select>
//                 <input
//                     type="text"
//                     placeholder={`Enter ${searchCriteria === "level" ? "Level" : searchCriteria === "term" ? "Term" : searchCriteria === "department_id" ? "Department ID" : "Student ID"}`}
//                     value={searchValue}
//                     onChange={(e) => setSearchValue(e.target.value)}
//                 />
//                 <button onClick={handleSearch}>Search</button>
//             </div>
//             <table className="student-table">
//                 <thead>
//                     <tr>
//                         <th>Student ID</th>
//                         <th>Full Name</th>
//                         <th>Age</th>
//                         <th>Address</th>
//                         <th>Level</th>
//                         <th>Term</th>
//                         <th className="actions-column">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.map((student, index) => (
//                         <tr key={index}>
//                             <td>{student.student_id}</td>
//                             <td>{student.full_name}</td>
//                             <td>{student.age}</td>
//                             <td>{student.address}</td>
//                             <td>{student.level}</td>
//                             <td>{student.term}</td>
//                             <td className="actions-column">
//                                 <Link to={`/students/${student.student_id}`} className="view-link">
//                                     <button className="view-button">View Information</button>
//                                 </Link>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default StudentDetails;
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import '../assets/CSS/student.css';

// function StudentDetails() {
//     const [students, setStudents] = useState([]);
//     const [searchCriteria, setSearchCriteria] = useState("id");
//     const [searchValue, setSearchValue] = useState("");
//     const [noStudentsFound, setNoStudentsFound] = useState(false);

//     useEffect(() => {
//         fetchStudents();
//     }, []);

//     const fetchStudents = () => {
//         let url = "http://localhost:8000/student";

//         if (searchCriteria !== "id") {
//             url += `?${searchCriteria}=${searchValue}`;
//         } else {
//             url += `/${searchValue}`;
//         }

//         fetch(url)
//             .then((response) => response.json())
//             .then((data) => {
//                 if (Array.isArray(data)) {
//                     setStudents(data);
//                     setNoStudentsFound(data.length === 0);
//                 } else {
//                     setStudents([data]);
//                     setNoStudentsFound(false);
//                 }
//             })
//             .catch((error) => console.error(error));
//     };

//     const handleSearch = () => {
//         fetchStudents();
//     };

//     const handleSelectChange = (e) => {
//         setSearchCriteria(e.target.value);
//         setSearchValue("");
//         fetchStudents();
//     };

//     return (
//         <div className="student-container">
//             <h1 className="student-heading">Student</h1>
//             <div className="search-container">
//                 <select value={searchCriteria} onChange={handleSelectChange}>
//                     <option value="id">Search by ID</option>
//                     <option value="level">Search by Level</option>
//                     <option value="term">Search by Term</option>
//                     <option value="department_id">Search by Department ID</option>
//                 </select>
//                 <input
//                     type="text"
//                     placeholder={`Enter ${searchCriteria === "id" ? "ID" : searchCriteria === "level" ? "Level" : searchCriteria === "term" ? "Term" : "Department ID"}`}
//                     value={searchValue}
//                     onChange={(e) => setSearchValue(e.target.value)}
//                 />
//                 <button onClick={handleSearch}>Search</button>
//             </div>
//             {noStudentsFound ? (
//                 <p>No students found.</p>
//             ) : (
//                 <table className="student-table">
//                     <thead>
//                         <tr>
//                             <th>Student ID</th>
//                             <th>Full Name</th>
//                             <th>Age</th>
//                             <th>Address</th>
//                             <th>Level</th>
//                             <th>Term</th>
//                             <th className="actions-column">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {students.map((student, index) => (
//                             <tr key={index}>
//                                 <td>{student.student_id}</td>
//                                 <td>{student.full_name}</td>
//                                 <td>{student.age}</td>
//                                 <td>{student.address}</td>
//                                 <td>{student.level}</td>
//                                 <td>{student.term}</td>
//                                 <td className="actions-column">
//                                     <Link to={`/students/${student.student_id}`} className="view-link">
//                                         <button className="view-button">View Information</button>
//                                     </Link>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }

// export default StudentDetails;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../assets/CSS/student.css';

function StudentDetails() {
    const [students, setStudents] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState("level");
    const [searchValue, setSearchValue] = useState("");
    const [noStudentsFound, setNoStudentsFound] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        let url = "http://localhost:8000/student";

        if (searchCriteria !== "id") {
            url += `?${searchCriteria}=${searchValue}`;
        } else {
            url += `/${searchValue}`;
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setStudents(data);
                    setNoStudentsFound(data.length === 0);
                } else {
                    setStudents([data]);
                    setNoStudentsFound(false);
                }
            })
            .catch((error) => console.error(error));
    };

    const handleSearch = () => {
        fetchStudents();
    };

    const handleSelectChange = (e) => {
        setSearchCriteria(e.target.value);
        setSearchValue("");
        fetchStudents();
    };

    return (
        <div className="student-container">
            <h1 className="student-heading">Student</h1>
            <div className="search-container">
                <select value={searchCriteria} onChange={handleSelectChange}>
                    <option value="level">Search by Level</option>
                    <option value="term">Search by Term</option>
                    <option value="department_id">Search by Department ID</option>
                    <option value="student_id">Search by Student ID</option> {/* Added option for Student ID */}
                </select>
                <input
                    type="text"
                    placeholder={`Enter ${searchCriteria === "level" ? "Level" : searchCriteria === "term" ? "Term" : searchCriteria === "department_id" ? "Department ID" : "Student ID"}`}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {noStudentsFound ? (
                <p>No students found.</p>
            ) : (
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
                                        <button className="view-button">View Information</button>
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

export default StudentDetails;

