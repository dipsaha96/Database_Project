// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

import { RouterProvider } from 'react-router-dom';
import { Route, createBrowserRouter, createRoutesFromElements, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';
import Combo from './pages/Combo';
import Teamdetails from './pages/Teamdetails';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import Course from './pages/Course';
import Department from './pages/Department';
import StudentInformation from './pages/StudentInformation';
import Relation from './pages/Relation';
import Rank from './components/Rank';
import Header from './components/Nav/Header';


export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root></Root>}>
        <Route index element={<Home></Home>} />
        <Route path='/home' element={<Home></Home>} />
        <Route path="/login" element={<Combo></Combo>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route path="/admin" element={<Admin></Admin>} />
        <Route path="/rank" element={<Rank></Rank>} />
        <Route path="/teams/:team_id" element={<Teamdetails></Teamdetails>} />
        <Route path='/combo' element={<Combo></Combo>} />
        <Route path='/students' element={<Student></Student>} />
        <Route path='/teachers' element={<Teacher></Teacher>} />
        <Route path='/courses' element={<Course></Course>} />
        <Route path='/departments' element={<Department></Department>} />
        <Route path='/relations' element={<Relation></Relation>} />
        <Route path="/students/:studentId" element={<StudentInformation></StudentInformation>} />
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
