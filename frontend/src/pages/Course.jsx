import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/CSS/course.css';

function Course() {
    const [courses, setCourses] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState("course_id");
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        let url = "http://localhost:8000/course";
    
        if (searchCriteria !== "course_id" && searchValue.trim() !== "") {
            url += `?${searchCriteria}=${searchValue}`;
        }
    
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setCourses(data))
            .catch((error) => console.error(error));
    };

    const handleSearch = () => {
        fetchCourses();
    };

    const handleSelectChange = (e) => {
        setSearchCriteria(e.target.value);
        setSearchValue("");
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleViewInformation = (courseId) => {
        console.log("Course ID:", courseId);
    };

    return (
        <div className="course-container">
            <h1 className="course-heading">ALL COURSES</h1>
            <div className="search-container">
                <select value={searchCriteria} onChange={handleSelectChange}>
                    <option value="credit">Credit</option>
                    <option value="total_lectures">Total Lectures</option>
                </select>
                <input
                    type="text"
                    placeholder={`Enter ${ searchCriteria === "credit" ? "Credit" : "Total Lectures"}`}
                    value={searchValue}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="course-table-container">
                <table className="course-table">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Title</th>
                            <th>Course Belongs to</th>
                            <th>Total Lectures</th>
                            <th>Credit</th>
                            <th className="actions-column">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.course_id}</td>
                                <td>{course.course_title}</td>
                                <td>{course.course_belongs_to}</td>
                                <td>{course.total_lectures}</td>
                                <td>{course.credit}</td>
                                <td className="actions-column">
                                    <Link to={`/courses/${course.course_id}`} className="view-link">
                                        <button className="view-button" onClick={() => handleViewInformation(course.course_id)}>Course Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Course;
