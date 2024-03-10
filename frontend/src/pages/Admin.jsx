import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../assets/CSS/admin.css';

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Add" id="basic-nav-dropdown">
              <NavDropdown.Item href="/addstudent">Add students</NavDropdown.Item>
              <NavDropdown.Item href="/addteacher">
                Add Teachers
              </NavDropdown.Item>
              <NavDropdown.Item href="/adddepartment">Add Departments</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/addcourse">
                Add Course
              </NavDropdown.Item>
              <NavDropdown.Item href="/addlecture">
                Add Lecture
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Update" id="basic-nav-dropdown">
              <NavDropdown.Item href="/updatestudent">Update students</NavDropdown.Item>
              <NavDropdown.Item href="/updateteacher">
                Update Teachers
              </NavDropdown.Item>
              <NavDropdown.Item href="/updatecourse">Update Courses</NavDropdown.Item>
              <NavDropdown.Item href="/updateassignment">Update Assignments</NavDropdown.Item>
                <NavDropdown.Item href="/updateproject">Update Project</NavDropdown.Item>
                <NavDropdown.Item href="/updatect">Update CT</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/updatefee">
                Update Fee
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Delete" id="basic-nav-dropdown">
              <NavDropdown.Item href="/deletestudent">Delete students</NavDropdown.Item>
              <NavDropdown.Item href="/deleteteacher">
                Delete Teachers
              </NavDropdown.Item>
              <NavDropdown.Item href="/deletecourse">Delete Courses</NavDropdown.Item>
              <NavDropdown.Divider />
                <NavDropdown.Item href="/deleteassignment">Delete Assignments</NavDropdown.Item>
                <NavDropdown.Item href="/deleteproject">Delete Project</NavDropdown.Item>
                <NavDropdown.Item href="/deletect">Delete CT</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="View Information" id="basic-nav-dropdown">
              <NavDropdown.Item href="/students">View Students</NavDropdown.Item>
              <NavDropdown.Item href="/teachers">
                View Teachers
              </NavDropdown.Item>
              <NavDropdown.Item href="/courses">View Courses</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/grades">
                View Grades
              </NavDropdown.Item>
              <NavDropdown.Item href="/about">
                About Project
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
