// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import '../assets/CSS/courseInformation.css';

// function CourseInformation() {
//     const { courseId } = useParams();
//     const [course, setCourse] = useState(null);

//     useEffect(() => {
//         // Fetch course information from the backend
//         axios.get(`http://localhost:8000/courses/${courseId}`)
//             .then(response => {
//                 setCourse(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching course information:', error);
//             });
//     }, [courseId]);

//     return (
//         <div className="course-information-container">
//             <h1>Course Information</h1>
//             {course && (
//                 <div className="course-info-box">
//                     <p><strong>Course ID:</strong> {course.course_id}</p>
//                     <p><strong>Course Title:</strong> {course.course_title}</p>
//                     <p><strong>Assignment 1 Title:</strong> {course.assignment1_title}</p>
//                     <p><strong>Assignment 1 Submission Date:</strong> {course.assignment1_submission_date}</p>
//                     <p><strong>Assignment 2 Title:</strong> {course.assignment2_title}</p>
//                     <p><strong>Assignment 2 Submission Date:</strong> {course.assignment2_submission_date}</p>
//                     <p><strong>Project Title:</strong> {course.project_title}</p>
//                     <p><strong>Project Submission Date:</strong> {course.project_submission_date}</p>
//                     <p><strong>CT 1 Title:</strong> {course.ct1_title}</p>
//                     <p><strong>CT 1 Exam Date:</strong> {course.ct1_exam_date}</p>
//                     <p><strong>CT 1 Start Time: </strong>{course.ct1_start_time}</p>
//                     <p><strong>CT 1 End Time: </strong>{course.ct1_end_time}</p>
//                     <p><strong>CT 2 Title:</strong> {course.ct2_title}</p>
//                     <p><strong>CT 2 Exam Date:</strong> {course.ct2_exam_date}</p>
//                     <p><strong>CT 2 Start Time: </strong>{course.ct2_start_time}</p>
//                     <p><strong>CT 2 End Time: </strong>{course.ct2_end_time}</p>
//                     <p><strong>Term Final Exam Date:</strong> {course.term_final_exam_date}</p>
//                     <p><strong>Term Final Start Time:</strong> {course.term_final_start_time}</p>
//                     <p><strong>Term Final Time Duration:</strong> {course.term_final_time_duration}</p>
//                 </div>
//             )}
//         </div>
//     );
// }
 
// export default CourseInformation;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../assets/CSS/courseInformation.css';

function CourseInformation() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        // Fetch course information from the backend
        axios.get(`http://localhost:8000/courses/${courseId}`)
            .then(response => {
                setCourse(response.data);
            })
            .catch(error => {
                console.error('Error fetching course information:', error);
            });
    }, [courseId]);

    return (
        <div className="course-information-container">
            {course && (
                <div className="course-info">
                    <div className="course-details">
                    <h1><strong></strong> {course.course_title}</h1>
                        <h2>Course Details</h2>
                        <p><strong>Course ID:</strong> {course.course_id}</p>
                        <p><strong>Course Title:</strong> {course.course_title}</p>
                    </div>
                    <div className="assignment">
                        <h2>Assignments</h2>
                        <p><strong>Assignment 1 Title:</strong> {course.assignment1_title}</p>
                        <p><strong>Assignment 1 Submission Date:</strong> {course.assignment1_submission_date}</p>
                        <p><strong>Assignment 2 Title:</strong> {course.assignment2_title}</p>
                        <p><strong>Assignment 2 Submission Date:</strong> {course.assignment2_submission_date}</p>
                    </div>
                    <div className="project">
                        <h2>Project</h2>
                        <p><strong>Project Title:</strong> {course.project_title}</p>
                        <p><strong>Project Submission Date:</strong> {course.project_submission_date}</p>
                    </div>
                    <div className="ct">
                        <h2>CT</h2>
                        <p><strong>CT 1 Title:</strong> {course.ct1_title}</p>
                        <p><strong>CT 1 Exam Date:</strong> {course.ct1_exam_date}</p>
                        <p><strong>CT 2 Title:</strong> {course.ct2_title}</p>
                        <p><strong>CT 2 Exam Date:</strong> {course.ct2_exam_date}</p>
                    </div>
                    <div className="term-final">
                        <h2>Term Final</h2>
                        <p><strong>Term Final Exam Date:</strong> {course.term_final_exam_date}</p>
                        <p><strong>Term Final Start Time:</strong> {course.term_final_start_time}</p>
                        <p><strong>Term Final Time Duration:</strong> {course.term_final_time_duration}</p>
                    </div>

                    <div className="course-coordinator">
                        <h2>Course Coordinator</h2>
                        <h5><strong>Teacher Name:</strong> {course.teacher_name}</h5>
                        <p><strong>Teacher ID:</strong> {course.teacher_id}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default CourseInformation;


