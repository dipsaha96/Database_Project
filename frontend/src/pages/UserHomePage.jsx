// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../assets/CSS/userhomepage.css';

// function UserHomePage() {
//     return (
//         <div className="left-menu">
//             <div className="left-menu-header">
//                 <h2>User Menu</h2>
//             </div>
//             <ul className="left-menu-items">
//                 <li><Link to="/profile">Your Profile Info</Link></li>
//                 <li><Link to="/viewcourses">View Courses</Link></li>
//                 <li><Link to="/addcourses">Add Courses</Link></li>
//                 <li><Link to="/assignments">Assignments</Link></li>
//                 <li><Link to="/projects">Projects</Link></li>
//                 <li><Link to="/ct">CT</Link></li>
//                 <li><Link to="/grades">Grades</Link></li>
//                 <li><Link to="/fees">Fees</Link></li>
//                 <li><Link to="/lectures">Lectures</Link></li>
//                 <li><Link to="/supervisor">Supervisor</Link></li>
//             </ul>
//         </div>
//     );
// }
// export default UserHomePage;

import React from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams hook
import '../assets/CSS/userhomepage.css';

function UserHomePage() {
    const { userId } = useParams(); // Access route parameters

    return (
        <div className="left-menu">
            <div className="left-menu-header">
                <h2>User Menu</h2>
            </div>
            <ul className="left-menu-items">
                <li><Link to={`/students/2105138`}>Your Profile Info</Link></li>
                <li><Link to={`/viewcourse/${2105138}`}>View Courses</Link></li>
                <li><Link to={`/addcourse/${2105138}`}>Add Courses</Link></li>
                <li><Link to={`/grades/${2105138}`}>Grades</Link></li>
                <li><Link to={`/fees/${2105138}`}>Fees</Link></li>
            </ul>
        </div>
    );
}

export default UserHomePage;

// import React from 'react';
// import { Link, useParams } from 'react-router-dom'; // Import useParams hook
// import '../assets/CSS/userhomepage.css';

// function UserHomePage() {
//     const { studentId } = useParams(); // Access route parameters

//     return (
//         <div className="left-menu">
//             <div className="left-menu-header">
//                 <h2>User Menu</h2>
//             </div>
//             <ul className="left-menu-items">
//                 <li><Link to={`/profile/${studentId}`}>Your Profile Info</Link></li>
//                 <li><Link to={`/viewcourses/${studentId}`}>View Courses</Link></li>
//                 <li><Link to={`/addcourses/${studentId}`}>Add Courses</Link></li>
//                 <li><Link to={`/assignments/${studentId}`}>Assignments</Link></li>
//                 <li><Link to={`/projects/${studentId}`}>Projects</Link></li>
//                 <li><Link to={`/ct/${studentId}`}>CT</Link></li>
//                 <li><Link to={`/grades/${studentId}`}>Grades</Link></li>
//                 <li><Link to={`/fees/${studentId}`}>Fees</Link></li>
//                 <li><Link to={`/lectures/${studentId}`}>Lectures</Link></li>
//                 <li><Link to={`/supervisor/${studentId}`}>Supervisor</Link></li>
//             </ul>
//         </div>
//     );
// }

// export default UserHomePage;
