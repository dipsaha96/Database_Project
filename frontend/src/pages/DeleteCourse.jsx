import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import '../assets/CSS/deletecourse.css'; // Import CSS file for styling

function DeleteCourse() {
    const [formData, setFormData] = useState({ courseId: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleCourseIdChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCourseDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/deletecourse`, formData);
            if (response.data && response.data.message) {
                setSuccessMessage(response.data.message);
                setFormData({ CourseId: '' });
            } else {
                throw new Error('Course could not be found');
            }
        } catch (error) {
            setError('Course could not be found');
        }
    };

    return (
        <div className="delete-Course-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <h1><center>Delete Course</center></h1>
            <Form onSubmit={handleCourseDelete}>
                <Form.Group className="mb-3" controlId="courseId">
                    <Form.Label>Course ID</Form.Label>
                    <Form.Control type="number" name="courseId" value={formData.courseId} onChange={handleCourseIdChange} required />
                </Form.Group>
                <Button variant="danger" type="submit">
                    Delete Course
                </Button>
            </Form>
        </div>
    );
}

export default DeleteCourse;
