import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import '../assets/CSS/addstudent.css'; // Import CSS file for styling

function AddDepartment() {
    const [departmentData, setDepartmentData] = useState({
        departmentId: '',
        name: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleDepartmentChange = (e) => {
        const { name, value } = e.target;
        setDepartmentData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDepartmentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/adddepartment', departmentData);
            if (response.data && response.data.message) {
                setSuccessMessage(response.data.message);
                setDepartmentData({
                    departmentId: '',
                    name: ''
                });
            } else {
                throw new Error('Failed to add department');
            }
        } catch (error) {
            setError('Failed to add department');
        }
    };

    return (
        <div className="department-form-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <h1><center>Add Department</center></h1>
            <Form onSubmit={handleDepartmentSubmit}>
                <Form.Group className="mb-3" controlId="departmentId">
                    <Form.Label>Department ID</Form.Label>
                    <Form.Control type="number" name="departmentId" value={departmentData.departmentId} onChange={handleDepartmentChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={departmentData.name} onChange={handleDepartmentChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Department
                </Button>
            </Form>
        </div>
    );
}

export default AddDepartment;
