import React from 'react';
import '../assets/CSS/about.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import SupervisorImage from '../assets/images/Kms.jpg';

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="section about-section">
        <h2>About the Project</h2>
        <ul className="project-list">
          <li>
            Student Registration: Capturing and storing detailed information about each student, including personal details, contact information, and academic records.
          </li>
          <li>
            Attendance Tracking: Monitoring and recording student attendance in various classes, helping educators keep track of student participation.
          </li>
          <li>
            Grading System: Managing and calculating student grades based on assessments, exams, and other academic criteria.
          </li>
          <li>
            Course Management: Handling information about available courses, class schedules, and faculty assignments.
          </li>
          <li>
            User Authentication: Implementing secure login systems for different user roles, such as students, teachers, and administrators.
          </li>
          <li>
            Reports and Analytics: Generating reports and analytics to provide insights into student performance, attendance trends, and other relevant metrics.
          </li>
          <li>
            Admin Panel: A dedicated administrative panel to manage system configurations, user roles, and other global settings.
          </li>
          <li>
            User-Friendly Interface: Designing an intuitive and user-friendly interface for easy navigation and interaction with the system.
          </li>
        </ul>
        <p>
          Overall, the Student Database Management System contributes to the efficient administration of educational institutions by centralizing student-related data, streamlining administrative tasks, and improving communication between students, faculty, and administrators.
        </p>
      </section>

      <section className="section supervisor-section">
        <h2>Supervisor</h2>
        <Container>
          <Row>
            <Col xs={12} md={4}>
              {/* Placeholder for Supervisor Image */}
              <Image src={SupervisorImage} rounded className="section-image" />

            </Col>
          </Row>
        </Container>
        <p>Special Thanks to</p>
        <p>Name: KHALED MAHMUD SHAHRIAR</p>
        <p>Email: khaledshahriar@cse.buet.ac.bd</p>
      </section>

      <section className="section project-makers-section">
        <h2>Project Makers</h2>
        <ul>
          <li>
            <p>Name: DIP SAHA</p>
            <p>Email: dip@gmail.com</p>
          </li>
          <li>
            <p>Name: Sarowar Alam Roki</p>
            <p>Email: roki@gmail.com</p>
          </li>
          {/* Add more Project Makers as needed */}
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;