import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

function UpdateCourse() {
    const [formData, setFormData] = useState({
        courseId: '',
        parameter: '',
        updatedValue: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8000/updatecourse', formData);
            setSuccessMessage(response.data.message);
            setError('');
        } catch (error) {
            setError('Failed to update course');
            setSuccessMessage('');
        }
        setFormData({
            courseId: '',
            parameter: '',
            updatedValue: ''
        });
    };

    return (
        <div className="course-form-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <h1><center>Update Course Information</center></h1>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="courseId">
                    <Form.Label>Course ID</Form.Label>
                    <Form.Control type="number" name="courseId" value={formData.courseId} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="parameter">
                    <Form.Label>Parameter to Update</Form.Label>
                    <Form.Control as="select" name="parameter" value={formData.parameter} onChange={handleChange} required>
                        <option value="">Select Parameter</option>
                        <option value="courseTitle">Course Title</option>
                        <option value="startTime">Start Time</option>
                        <option value="endTime">End Time</option>
                        <option value="totalLectures">Total Lectures</option>
                        <option value="credit">Credit</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="updatedValue">
                    <Form.Label>Updated Value</Form.Label>
                    <Form.Control type="text" name="updatedValue" value={formData.updatedValue} onChange={handleChange} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </div>
    );
}

export default UpdateCourse;
