import { useContext } from 'react';

import { RouterProvider } from 'react-router-dom';
import { Route, createBrowserRouter, createRoutesFromElements, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Teamdetails from './pages/Teamdetails';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import Course from './pages/Course';
import Department from './pages/Department';
import StudentInformation from './pages/StudentInformation';
import CourseInformation from './pages/CourseInformation';
import Relation from './pages/Relation';
import Grade from './pages/Grade';
import Header from './components/Nav/Header';
import UserHomePage from './pages/UserHomePage';
import AddStudent from './pages/AddStudent';
import AddDepartment from './pages/AddDepartment';
import AddTeacher from './pages/AddTeacher';
import AddCourse from './pages/AddCourse';
import DeleteStudent from './pages/DeleteStudent';
import DeleteCourse from './pages/DeleteCourse';
import DeleteTeacher from './pages/DeleteTeacher';
import Footer from './components/Nav/Footer';
import Combo from './pages/Combo';
import StudentDetails from './pages/StudentDetails';
import UpdateStudent from './pages/UpdateStudent';
import UpdateCourse from './pages/UpdateCourse';
import AddLecture from './pages/AddLecture';
import UserViewCourse from './pages/UserViewCourse';
import UserAddCourse from './pages/UserAddCourse';
import AvailableCourse from './pages/AvailableCourse';
import TeacherInformation from './pages/TeacherInformation';
import ViewGrade from './pages/ViewGrade';
import Fees from './pages/Fees';
import About from './pages/About';


export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root></Root>}>
        <Route index element={<Home></Home>} />
        <Route path='/home' element={<Home></Home>} />
        <Route path="/login" element={<Combo></Combo>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route path="/admin" element={<Admin></Admin>} />
        <Route path="/teams/:team_id" element={<Teamdetails></Teamdetails>} />
        <Route path='/students' element={<Student></Student>} />
        <Route path='/teachers' element={<Teacher></Teacher>} />
        <Route path='/courses' element={<Course></Course>} />
        <Route path='/departments' element={<Department></Department>} />
        <Route path='/relations' element={<Relation></Relation>} />
        <Route path='/grades' element={<Grade></Grade>} />
        <Route path="/students/:studentId" element={<StudentInformation></StudentInformation>} />
        <Route path="/userhomepage" element={<UserHomePage></UserHomePage>} />
        <Route path="/addstudent" element={<AddStudent></AddStudent>} />
        <Route path="/adddepartment" element={<AddDepartment></AddDepartment>} />
        <Route path="/addteacher" element={<AddTeacher></AddTeacher>} />
        <Route path="/addcourse" element={<AddCourse></AddCourse>} />
        <Route path="/deletestudent" element={<DeleteStudent></DeleteStudent>} />
        <Route path="/deleteteacher" element={<DeleteTeacher></DeleteTeacher>} />
        <Route path="/deletecourse" element={<DeleteCourse></DeleteCourse>} />
        <Route path="/studentdetails" element={<StudentDetails></StudentDetails>} />
        <Route path="/courses/:courseId" element={<CourseInformation></CourseInformation>} />
        <Route path="/updatestudent" element={<UpdateStudent></UpdateStudent>} />
        <Route path="/updatecourse" element={<UpdateCourse></UpdateCourse>} />
        <Route path="/addlecture" element={<AddLecture></AddLecture>} />
        <Route path="/viewcourse/:userId" element={<UserViewCourse></UserViewCourse>} />
        <Route path="/addcourse/:userId" element={<UserAddCourse></UserAddCourse>} />
        <Route path="/availablecourse/:userId" element={<AvailableCourse></AvailableCourse>} />
        <Route path="/teacher/:teacherId" element={<TeacherInformation></TeacherInformation>} />
        <Route path="/grades/:userID" element={<ViewGrade />} />
        <Route path="/fees/:userID" element={<Fees />} />
        <Route path="/about" element={<About />} />





      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

function Root() {
  return (
    <>
      <div>
        <Header></Header>
        <Outlet></Outlet>
        {/*<Footer></Footer>*/}
      </div>
    </>
  )
}


// (
//   <>
//     <div>
//       <a href="https://vitejs.dev" target="_blank">
//         <img src={viteLogo} className="logo" alt="Vite logo" />
//       </a>
//       <a href="https://react.dev" target="_blank">
//         <img src={reactLogo} className="logo react" alt="React logo" />
//       </a>
//     </div>
//     <h1>Vite + React</h1>
//     <div className="card">
//       <button onClick={() => setCount((count) => count + 1)}>
//         count is {count}
//       </button>
//       <p>
//         Edit <code>src/App.jsx</code> and save to test HMR
//       </p>
//     </div>
//     <p className="read-the-docs">
//       Click on the Vite and React logos to learn more
//     </p>
//   </>
// )
