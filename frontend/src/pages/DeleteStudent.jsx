import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import '../assets/CSS/deletestudent.css'; // Import CSS file for styling

function DeleteStudent() {
    const [formData, setFormData] = useState({ studentId: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleStudentIdChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleStudentDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/deletestudent`, formData);
            if (response.data && response.data.message) {
                setSuccessMessage(response.data.message);
                setFormData({ studentId: '' });
            } else {
                throw new Error('Failed to delete student');
            }
        } catch (error) {
            setError('Failed to delete student');
        }
    };

    return (
        <div className="delete-student-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <h1><center>Delete Student</center></h1>
            <Form onSubmit={handleStudentDelete}>
                <Form.Group className="mb-3" controlId="studentId">
                    <Form.Label>Student ID</Form.Label>
                    <Form.Control type="number" name="studentId" value={formData.studentId} onChange={handleStudentIdChange} required />
                </Form.Group>
                <Button variant="danger" type="submit">
                    Delete Student
                </Button>
            </Form>
        </div>
    );
}

export default DeleteStudent;
