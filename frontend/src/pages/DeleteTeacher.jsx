import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import '../assets/CSS/deleteteacher.css'; // Import CSS file for styling

function DeleteTeacher() {
    const [formData, setFormData] = useState({ teacherId: '' });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleTeacherIdChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTeacherDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/deleteteacher`, formData);
            if (response.data && response.data.message) {
                setSuccessMessage(response.data.message);
                setFormData({ teacherId: '' });
            } else {
                throw new Error('Teacher could not be found');
            }
        } catch (error) {
            setError('Teacher could not be found');
        }
    };

    return (
        <div className="delete-teacher-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <h1><center>Delete Teacher</center></h1>
            <Form onSubmit={handleTeacherDelete}>
                <Form.Group className="mb-3" controlId="teacherId">
                    <Form.Label>Teacher ID</Form.Label>
                    <Form.Control type="number" name="teacherId" value={formData.teacherId} onChange={handleTeacherIdChange} required />
                </Form.Group>
                <Button variant="danger" type="submit">
                    Delete Teacher
                </Button>
            </Form>
        </div>
    );
}

export default DeleteTeacher;
