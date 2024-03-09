import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import '../assets/CSS/addlecture.css'; // Import CSS file for styling

function AddLecture() {
    const [lectureData, setLectureData] = useState({
        lectureId: '',
        lectureTitle: '',
        courseId: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLectureChange = (e) => {
        const { name, value } = e.target;
        setLectureData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLectureSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/addlecture', lectureData);
            if (response.data && response.data.message) {
                setSuccessMessage(response.data.message);
                setLectureData({
                    lectureId: '',
                    lectureTitle: '',
                    courseId: ''
                });
            } else {
                throw new Error('Failed to add lecture');
            }
        } catch (error) {
            setError('Failed to add lecture');
        }
    };

    return (
        <div className="lecture-form-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <h1><center>Add Lecture</center></h1>
            <Form onSubmit={handleLectureSubmit}>
                <Form.Group className="mb-3" controlId="lectureId">
                    <Form.Label>Lecture ID</Form.Label>
                    <Form.Control type="number" name="lectureId" value={lectureData.lectureId} onChange={handleLectureChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lectureTitle">
                    <Form.Label>Lecture Title</Form.Label>
                    <Form.Control type="text" name="lectureTitle" value={lectureData.lectureTitle} onChange={handleLectureChange} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="courseId">
                    <Form.Label>Course ID</Form.Label>
                    <Form.Control type="number" name="courseId" value={lectureData.courseId} onChange={handleLectureChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Lecture
                </Button>
            </Form>
        </div>
    );
}

export default AddLecture;
