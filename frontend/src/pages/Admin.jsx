// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function Admin() {
//     return (
//         <div>
//             <center>
//                 <div className="btn-group container scs">
//                     <Link to="/addplayer"
//                         className="btn btn-primary active"
//                         aria-current="page">Add</Link>
//                     <Link to="delete/"
//                         className="btn btn-primary active"
//                         aria-current="page">Delete</Link>
//                     <Link to="update/"
//                         className="btn btn-primary active"
//                         aria-current="page">Update</Link>
//                 </div>
//             </center >
//             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
//         </div >
//     );
// }
// import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import '../assets/CSS/admin.css'; // Import CSS file for styling

// function Admin() {
//     return (
//         <Router>
//             <div>
//                 <h2>Admin Panel</h2>
//                 <nav>
//                     <ul>
//                         <li>
//                             <Link to="/add">Add</Link>
//                         </li>
//                         <li>
//                             <Link to="/update">Update</Link>
//                         </li>
//                         <li>
//                             <Link to="/delete">Delete</Link>
//                         </li>
//                         <li>
//                             <Link to="/others">Others</Link>
//                         </li>
//                     </ul>
//                 </nav>

//                 <Switch>
//                     <Route path="/add">
//                         <Add />
//                     </Route>
//                     <Route path="/update">
//                         <Update />
//                     </Route>
//                     <Route path="/delete">
//                         <Delete />
//                     </Route>
//                     <Route path="/others">
//                         <Others />
//                     </Route>
//                 </Switch>
//             </div>
//         </Router>
//     );
// }

// function Add() {
//     return (
//         <div>
//             <h2>Add</h2>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to="/add/student">Add Student</Link>
//                     </li>
//                     <li>
//                         <Link to="/add/teacher">Add Teacher</Link>
//                     </li>
//                     <li>
//                         <Link to="/add/course">Add Course</Link>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// }

// function Update() {
//     return (
//         <div>
//             <h2>Update</h2>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to="/update/student">Update Student</Link>
//                     </li>
//                     <li>
//                         <Link to="/update/teacher">Update Teacher</Link>
//                     </li>
//                     <li>
//                         <Link to="/update/course">Update Course</Link>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// }

// function Delete() {
//     return (
//         <div>
//             <h2>Delete</h2>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to="/delete/student">Delete Student</Link>
//                     </li>
//                     <li>
//                         <Link to="/delete/teacher">Delete Teacher</Link>
//                     </li>
//                     <li>
//                         <Link to="/delete/course">Delete Course</Link>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// }

// function Others() {
//     return (
//         <div>
//             <h2>Others</h2>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to="/others/view-students">View Students</Link>
//                     </li>
//                     <li>
//                         <Link to="/others/view-teachers">View Teachers</Link>
//                     </li>
//                     <li>
//                         <Link to="/others/view-courses">View Courses</Link>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// }

// export default Admin;
// import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import '../assets/CSS/admin.css'; // Import CSS file for styling

// function Admin() {
//     return (
//         <Router>
//             <div>
//                 <h2>Admin Panel</h2>
//                 <nav>
//                     <ul>
//                         <li>
//                             <ButtonNav to="/addstudent" text="Add" />
//                         </li>
//                         <li>
//                             <ButtonNav to="/addstudent" text="Update" />
//                         </li>
//                         <li>
//                             <ButtonNav to="/addstudent" text="Delete" />
//                         </li>
//                         <li>
//                             <ButtonNav to="/addstudent" text="Others" />
//                         </li>
//                     </ul>
//                 </nav>

//                 <Switch>
//                     <Route path="/addstudent">
//                         <Add />
//                     </Route>
//                     <Route path="/addstudent">
//                         <Update />
//                     </Route>
//                     <Route path="/addstudent">
//                         <Delete />
//                     </Route>
//                     <Route path="/addstudent">
//                         <Others />
//                     </Route>
//                 </Switch>
//             </div>
//         </Router>
//     );
// }

// const ButtonNav = ({ to, text }) => (
//     <Link to={to}>
//         <button>{text}</button>
//     </Link>
// );

// function Add() {
//     return (
//         <div>
//             <h2>Add</h2>
//             <nav>
//                 <ul>
//                     <li>
//                         <ButtonNav to="/addstudent/addcourse" text="Add Student" />
//                     </li>
//                     <li>
//                         <ButtonNav to="/addstudent/addcourse" text="Add Teacher" />
//                     </li>
//                     <li>
//                         <ButtonNav to="/addstudent/addcourse" text="Add Course" />
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// }

// // function Update() {
// //     return (
// //         <div>
// //             <h2>Update</h2>
// //             <nav>
// //                 <ul>
// //                     <li>
// //                         <ButtonNav to="/update/student" text="Update Student" />
// //                     </li>
// //                     <li>
// //                         <ButtonNav to="/update/teacher" text="Update Teacher" />
// //                     </li>
// //                     <li>
// //                         <ButtonNav to="/update/course" text="Update Course" />
// //                     </li>
// //                 </ul>
// //             </nav>
// //         </div>
// //     );
// // }

// // function Delete() {
// //     return (
// //         <div>
// //             <h2>Delete</h2>
// //             <nav>
// //                 <ul>
// //                     <li>
// //                         <ButtonNav to="/delete/student" text="Delete Student" />
// //                     </li>
// //                     <li>
// //                         <ButtonNav to="/delete/teacher" text="Delete Teacher" />
// //                     </li>
// //                     <li>
// //                         <ButtonNav to="/delete/course" text="Delete Course" />
// //                     </li>
// //                 </ul>
// //             </nav>
// //         </div>
// //     );
// // }

// // function Others() {
// //     return (
// //         <div>
// //             <h2>Others</h2>
// //             <nav>
// //                 <ul>
// //                     <li>
// //                         <ButtonNav to="/others/view-students" text="View Students" />
// //                     </li>
// //                     <li>
// //                         <ButtonNav to="/others/view-teachers" text="View Teachers" />
// //                     </li>
// //                     <li>
// //                         <ButtonNav to="/others/view-courses" text="View Courses" />
// //                     </li>
// //                 </ul>
// //             </nav>
// //         </div>
// //     );
// // }

// export default Admin;
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/CSS/admin.css'; // Import CSS file for styling

function Admin() {
    return (
        <div className="admin-page">
            <div className="nav-section">
                <h2>Add</h2>
                <Link to="/addstudent"><button>Add Student</button></Link>
                <Link to="/addteacher"><button>Add Teacher</button></Link>
                <Link to="/addcourse"><button>Add Course</button></Link>
            </div>
            <div className="nav-section">
                <h2>Update</h2>
                <Link to="/updatestudent"><button>Update Student</button></Link>
                <Link to="/updateteacher"><button>Update Teacher</button></Link>
                <Link to="/updatecourse"><button>Update Course</button></Link>
            </div>
            <div className="nav-section">
                <h2>Delete</h2>
                <Link to="/deletestudent"><button>Delete Student</button></Link>
                <Link to="/deleteteacher"><button>Delete Teacher</button></Link>
                <Link to="/deletecourse"><button>Delete Course</button></Link>
            </div>
            <div className="nav-section">
                <h2>Others</h2>
                <Link to="/students"><button>View Students</button></Link>
                <Link to="/teachers"><button>View Teachers</button></Link>
                <Link to="/courses"><button>View Courses</button></Link>
            </div>
        </div>
    );
}

export default Admin;
