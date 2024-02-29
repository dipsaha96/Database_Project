import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import '../assets/CSS/addteacher.css'; // Import CSS file for styling

function AddTeacher() {
    const [teacherData, setTeacherData] = useState({
        teacherId: '',
        phoneNumber: '',
        email: '',
        address: '',
        name: '',
        departmentId: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleTeacherChange = (e) => {
        const { name, value } = e.target;
        setTeacherData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTeacherSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/addteacher', teacherData);
            if (response.data && response.data.message) {
                setSuccessMessage(response.data.message);
                setTeacherData({
                    teacherId: '',
                    phoneNumber: '',
                    email: '',
                    address: '',
                    name: '',
                    departmentId: ''
                });
            } else {
                throw new Error('Failed to add teacher');
            }
        } catch (error) {
            setError('Failed to add teacher');
        }
    };

    return (
        <div className="teacher-form-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <h1><center>Add Teacher</center></h1>
            <Form onSubmit={handleTeacherSubmit}>
                <Form.Group className="mb-3" controlId="teacherId">
                    <Form.Label>Teacher ID</Form.Label>
                    <Form.Control type="number" name="teacherId" value={teacherData.teacherId} onChange={handleTeacherChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" name="phoneNumber" value={teacherData.phoneNumber} onChange={handleTeacherChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={teacherData.email} onChange={handleTeacherChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={teacherData.address} onChange={handleTeacherChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={teacherData.name} onChange={handleTeacherChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="departmentId">
                    <Form.Label>Department ID</Form.Label>
                    <Form.Control type="number" name="departmentId" value={teacherData.departmentId} onChange={handleTeacherChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Teacher
                </Button>
            </Form>
        </div>
    );
}

export default AddTeacher;
