import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import '../assets/CSS/addcourse.css'; // Import CSS file for styling

function AddCourse() {
    const [courseData, setCourseData] = useState({
        courseId: '',
        courseTitle: '',
        startTime: '',
        endTime: '',
        totalLectures: '',
        credit: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleCourseChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCourseSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/addcourse', courseData);
            if (response.data && response.data.message) {
                setSuccessMessage(response.data.message);
                setCourseData({
                    courseId: '',
                    courseTitle: '',
                    startTime: '',
                    endTime: '',
                    totalLectures: '',
                    credit: ''
                });
            } else {
                throw new Error('Failed to add course');
            }
        } catch (error) {
            setError('Failed to add course');
        }
    };

    return (
        <div className="course-form-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <h1><center>Add Course</center></h1>
            <Form onSubmit={handleCourseSubmit}>
                <Form.Group className="mb-3" controlId="courseId">
                    <Form.Label>Course ID</Form.Label>
                    <Form.Control type="number" name="courseId" value={courseData.courseId} onChange={handleCourseChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="courseTitle">
                    <Form.Label>Course Title</Form.Label>
                    <Form.Control type="text" name="courseTitle" value={courseData.courseTitle} onChange={handleCourseChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="startTime">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control type="date" name="startTime" value={courseData.startTime} onChange={handleCourseChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="endTime">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control type="date" name="endTime" value={courseData.endTime} onChange={handleCourseChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="totalLectures">
                    <Form.Label>Total Lectures</Form.Label>
                    <Form.Control type="number" name="totalLectures" value={courseData.totalLectures} onChange={handleCourseChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="credit">
                    <Form.Label>Credit</Form.Label>
                    <Form.Control type="number" name="credit" value={courseData.credit} onChange={handleCourseChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Course
                </Button>
            </Form>
        </div>
    );
}

export default AddCourse;
