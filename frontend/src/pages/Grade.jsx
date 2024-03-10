// import React, { useState, useEffect } from 'react';
// import '../assets/CSS/student.css';

// function StudentCGPA() {
//     const [students, setStudents] = useState([]);
//     const [searchValue, setSearchValue] = useState("");
//     const [searchCriteria, setSearchCriteria] = useState("student_id");

//     useEffect(() => {
//         fetchStudents();
//     }, []);

//     const fetchStudents = () => {
//         let url = "http://localhost:8000/grades";

//         if (searchValue.trim() !== "") {
//             url += `?${searchCriteria}=${searchValue}`;
//         }

//         fetch(url)
//             .then(response => response.json())
//             .then(data => setStudents(data))
//             .catch(error => console.error(error));
//     };

//     const handleSearch = () => {
//         fetchStudents();
//     };

//     const handleInputChange = (e) => {
//         setSearchValue(e.target.value);
//     };

//     const handleSelectChange = (e) => {
//         setSearchCriteria(e.target.value);
//     };

//     return (
//         <div className="student-container">
//             <h1 className="student-heading">Student CGPA</h1>
//             <div className="search-container">
//                 <select value={searchCriteria} onChange={handleSelectChange}>
//                     <option value="student_id">Student ID</option>
//                     <option value="student_name">Student Name</option>
//                 </select>
//                 <input
//                     type="text"
//                     placeholder="Search by Student ID or Name"
//                     value={searchValue}
//                     onChange={handleInputChange}
//                 />
//                 <button onClick={handleSearch}>Search</button>
//             </div>
//             <table className="student-table">
//                 <thead>
//                     <tr>
//                         <th>Student ID</th>
//                         <th>Student Name</th>
//                         <th>Department Name</th>
//                         <th>CGPA</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.map((student, index) => (
//                         <tr key={index}>
//                             <td>{student.student_id}</td>
//                             <td>{student.student_name}</td>
//                             <td>{student.department_name}</td>
//                             <td>{student.cgpa}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default StudentCGPA;


import React, { useState, useEffect } from 'react';
import '../assets/CSS/student.css';

function StudentCGPA() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        fetch("http://localhost:8000/grades")
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error(error));
    };

    return (
        <div className="student-container">
            <h1 className="student-heading"><center>Student CGPA</center></h1>
            <table className="student-table">
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Department Name</th>
                        <th>CGPA</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.student_id}</td>
                            <td>{student.student_name}</td>
                            <td>{student.department_name}</td>
                            <td>{student.cgpa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentCGPA;

