import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
//import '../assets/CSS/updatestudent.css'; // Import CSS file for styling

function UpdateStudent() {
    const [formData, setFormData] = useState({
        studentId: '',
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
            const response = await axios.put('http://localhost:8000/updatestudent', formData);
            setSuccessMessage(response.data.message);
            setError('');
        } catch (error) {
            setError('Failed to update student');
            setSuccessMessage('');
        }
        setFormData({
            studentId: '',
            parameter: '',
            updatedValue: ''
        });
    };

    return (
        <div className="student-form-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <h1><center>Update Student Information</center></h1>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="studentId">
                    <Form.Label>Student ID</Form.Label>
                    <Form.Control type="number" name="studentId" value={formData.studentId} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="parameter">
                    <Form.Label>Parameter to Update</Form.Label>
                    <Form.Control as="select" name="parameter" value={formData.parameter} onChange={handleChange} required>
                        <option value="">Select Parameter</option>
                        <option value="name">Name</option>
                        <option value="address">Address</option>
                        <option value="bankAccountNo">Bank Account No</option>
                        {/* Add more options for other parameters if needed */}
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

export default UpdateStudent;
