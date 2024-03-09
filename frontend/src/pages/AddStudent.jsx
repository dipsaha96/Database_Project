// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// function AddStudent() {
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     phoneNumber: '',
//     dateOfBirth: '',
//     level: '',
//     term: '',
//     email: '',
//     bankAccountNo: '',
//     departmentId: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission, you can send formData to your backend here
//     console.log(formData);
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group className="mb-3" controlId="name">
//         <Form.Label>Name</Form.Label>
//         <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="address">
//         <Form.Label>Address</Form.Label>
//         <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="phoneNumber">
//         <Form.Label>Phone Number</Form.Label>
//         <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="dateOfBirth">
//         <Form.Label>Date of Birth</Form.Label>
//         <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="level">
//         <Form.Label>Level</Form.Label>
//         <Form.Control type="number" name="level" value={formData.level} onChange={handleChange} />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="term">
//         <Form.Label>Term</Form.Label>
//         <Form.Control type="number" name="term" value={formData.term} onChange={handleChange} />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="email">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="bankAccountNo">
//         <Form.Label>Bank Account No</Form.Label>
//         <Form.Control type="text" name="bankAccountNo" value={formData.bankAccountNo} onChange={handleChange} />
//       </Form.Group>

//       <Form.Group className="mb-3" controlId="departmentId">
//         <Form.Label>Department ID</Form.Label>
//         <Form.Control type="number" name="departmentId" value={formData.departmentId} onChange={handleChange} />
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//   );
// }

// export default AddStudent;

// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert';
// import axios from 'axios';
// import '../assets/CSS/addstudent.css'; // Import CSS file for styling

// function AddStudent() {
//     const [formData, setFormData] = useState({
//         studentId: '',
//         name: '',
//         address: '',
//         phoneNumber: '',
//         dateOfBirth: '',
//         level: '',
//         term: '',
//         email: '',
//         bankAccountNo: '',
//         departmentId: ''
//     });
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8000/addstudent', { formData });
            
//             setSuccessMessage(response.message);
//             alert(response.message);
//         } catch (error) {
//             setError('Failed to add student');
//         }
//         setFormData({
//             studentId: '',
//             name: '',
//             address: '',
//             phoneNumber: '',
//             dateOfBirth: '',
//             level: '',
//             term: '',
//             email: '',
//             bankAccountNo: '',
//             departmentId: ''
//         });
//     };

//     return (
//         <div className="student-form-container">
//             {error && <Alert variant="danger">{error}</Alert>}
//             {successMessage && <Alert variant="success">{successMessage}</Alert>}
//             <h1><center>Provide Student Information</center></h1>
//             <Form onSubmit={handleSubmit}>

//                 <Form.Group className="mb-3" controlId="studentId">
//                     <Form.Label>Student ID</Form.Label>
//                     <Form.Control type="number" name="studentId" value={formData.studentId} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="name">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="address">
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="phoneNumber">
//                     <Form.Label>Phone Number</Form.Label>
//                     <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="dateOfBirth">
//                     <Form.Label>Date of Birth</Form.Label>
//                     <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="level">
//                     <Form.Label>Level</Form.Label>
//                     <Form.Control type="number" name="level" value={formData.level} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="term">
//                     <Form.Label>Term</Form.Label>
//                     <Form.Control type="number" name="term" value={formData.term} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="email">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="bankAccountNo">
//                     <Form.Label>Bank Account No</Form.Label>
//                     <Form.Control type="text" name="bankAccountNo" value={formData.bankAccountNo} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="departmentId">
//                     <Form.Label>Department ID</Form.Label>
//                     <Form.Control type="number" name="departmentId" value={formData.departmentId} onChange={handleChange} required />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>
//             </Form>
//         </div>
//     );
// }

// export default AddStudent;


// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert';
// import axios from 'axios';
// import '../assets/CSS/addstudent.css'; // Import CSS file for styling

// function AddStudent() {
//     const [formData, setFormData] = useState({
//         studentId: '',
//         name: '',
//         address: '',
//         phoneNumber: '',
//         dateOfBirth: '',
//         level: '',
//         term: '',
//         email: '',
//         bankAccountNo: '',
//         departmentId: ''
//     });
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8000/addstudent', formData); // Send formData directly
//             setSuccessMessage(response.data.message);
//             alert(response.data.message);
//         } catch (error) {
//             setError('Failed to add student');
//         }
//         setFormData({
//             studentId: '',
//             name: '',
//             address: '',
//             phoneNumber: '',
//             dateOfBirth: '',
//             level: '',
//             term: '',
//             email: '',
//             bankAccountNo: '',
//             departmentId: ''
//         });
//     };

//     return (
//         <div className="student-form-container">
//             {error && <Alert variant="danger">{error}</Alert>}
//             {successMessage && <Alert variant="success">{successMessage}</Alert>}
//             <h1><center>Provide Student Information</center></h1>
//             <Form onSubmit={handleSubmit}>

//                 <Form.Group className="mb-3" controlId="studentId">
//                     <Form.Label>Student ID</Form.Label>
//                     <Form.Control type="number" name="studentId" value={formData.studentId} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="name">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="address">
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="phoneNumber">
//                     <Form.Label>Phone Number</Form.Label>
//                     <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="dateOfBirth">
//                     <Form.Label>Date of Birth</Form.Label>
//                     <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="level">
//                     <Form.Label>Level</Form.Label>
//                     <Form.Control type="number" name="level" value={formData.level} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="term">
//                     <Form.Label>Term</Form.Label>
//                     <Form.Control type="number" name="term" value={formData.term} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="email">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="bankAccountNo">
//                     <Form.Label>Bank Account No</Form.Label>
//                     <Form.Control type="text" name="bankAccountNo" value={formData.bankAccountNo} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="departmentId">
//                     <Form.Label>Department ID</Form.Label>
//                     <Form.Control type="number" name="departmentId" value={formData.departmentId} onChange={handleChange} required />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>
//             </Form>
//         </div>
//     );
// }

// export default AddStudent;

// AddStudent.js

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import '../assets/CSS/addstudent.css'; // Import CSS file for styling

function AddStudent() {
    const [formData, setFormData] = useState({
        studentId: '',
        name: '',
        address: '',
        phoneNumber: '',
        dateOfBirth: '',
        email: '',
        bankAccountNo: ''
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
            const response = await axios.post('http://localhost:8000/addstudent', formData);
            setSuccessMessage(response.data.message);
        } catch (error) {
            setError('Failed to add student');
        }
        setFormData({
            studentId: '',
            name: '',
            address: '',
            phoneNumber: '',
            dateOfBirth: '',
            email: '',
            bankAccountNo: ''
        });
    };

    return (
        <div className="student-form-container">
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <h1><center>Provide Student Information</center></h1>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="studentId">
                    <Form.Label>Student ID</Form.Label>
                    <Form.Control type="number" name="studentId" value={formData.studentId} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="dateOfBirth">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="bankAccountNo">
                    <Form.Label>Bank Account No</Form.Label>
                    <Form.Control type="text" name="bankAccountNo" value={formData.bankAccountNo} onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AddStudent;
