const fs = require("fs").promises;
const express = require("express");
const cors = require("cors");
const pool = require("../db");
const path = require("path");

const port = 8000;
require("dotenv").config();
const app = express();

app.use(express.urlencoded());

// middleware
app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));
app.use("/static", express.static("static"));

async function readEJSFile(filePath) {
    try {
        const content = await fs.readFile(filePath, "utf8");
        return content;
    } catch (err) {
        console.error(`Error reading file ${filePath}: ${err.message}`);
        throw err;
    }
}

async function run() {
    try {


        // app.post("/login", async (req, res) => {
        //     const { email, password, selection } = req.body;
        //     console.log(selection);

        //     try {
        //         console.log("Received login request:", { email, password });

        //         if (selection == 'user') {
        //             const result = await pool.query(`SELECT * FROM USERS WHERE USER_ID = $1 AND PASSWORD = $2`, [email, password]);
        //             console.log(result);
        //             if (result.rows.length !== 0) {
        //                 const userId = result.rows[0].user_id;
        //                 res.json({ message: "user", userId: userId});
        //             } else {
        //                 res.json({ message: "error" });
        //             }
        //         }

        //         else if (selection == 'admin') {
        //             const result = await pool.query(`SELECT * FROM ADMIN WHERE EMAIL = $1 AND PASSWORD = $2`, [email, password]);
        //             console.log(result);
        //             if (result.rows.length !== 0) {
        //                 res.json({ message:"admin" });
        //             } else {
        //                 res.json({ message: "error" });
        //             }
        //         }
        //     } catch (err) {
        //         console.error(`PostgreSQL Error: ${err.message}`);
        //         res.status(500).send("Internal Server Error");
        //     }
        // });

        app.post("/login", async (req, res) => {
            const { email, password, selection } = req.body;

            try {
                console.log("Received login request:", { email, password });

                if (selection == 'user') {
                    // Query the database to check user credentials
                    // Assuming you have a 'users' table with 'email' and 'password' columns
                    const result = await pool.query(`SELECT * FROM users WHERE user_id = $1 AND password = $2`, [email, password]);
                    console.log(result);
                    if (result.rows.length !== 0) {
                        const userId = result.rows[0].user_id; // Assuming the user ID column is named 'id'
                        res.json({ message: "user", userId: userId });
                    } else {
                        res.json({ message: "error" });
                    }
                } else if (selection == 'admin') {
                    // Query the database to check admin credentials
                    // Assuming you have an 'admins' table with 'email' and 'password' columns
                    const result = await pool.query(`SELECT * FROM admin WHERE email = $1 AND password = $2`, [email, password]);
                    console.log(result);
                    if (result.rows.length !== 0) {
                        res.json({ message: "admin" });
                    } else {
                        res.json({ message: "error" });
                    }
                }
            } catch (err) {
                console.error(`Database Error: ${err.message}`);
                res.status(500).send("Internal Server Error");
            }
        });


        // app.post("/signup", async (req, res) => {
        //     const { email, password } = req.body;
        //     try {
        //         console.log("Received signup request:", { email, password });

        //         await pool.query(`
        //             INSERT INTO USERS (EMAIL, PASSWORD)
        //             VALUES ($1, $2)`,
        //             [email, password]
        //         );

        //         // Optionally, you can send a success response back to the client
        //         res.status(201).json({ message: "Signup successful" });
        //     } catch (error) {
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).send("Internal Server Error");
        //     }
        // });

        app.post("/signup", async (req, res) => {
            const { user_id, password } = req.body;
            try {
                console.log("Received signup request:", { user_id, password });

                await pool.query(`
                    INSERT INTO USERS (USER_ID, PASSWORD)
                    VALUES ($1, $2)`,
                    [user_id, password]
                );

                // Optionally, you can send a success response back to the client
                res.status(201).json({ message: "Signup successful" });
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).send("Internal Server Error");
            }
        });


        app.get("/error", (req, res) => {
            res.render("error");
        });

        app.get("/admin", async (req, res) => {
            try {
                const adminContent = await readEJSFile("./templates/admin.ejs");
                res.render("admin", { content: adminContent });
            } catch (err) {
                console.error(`PostgreSQL Error: ${err.message}`);
                res.status(500).send("Internal Server Error");
            }
        });

        app.get("/sight", async (req, res) => {
            try {
                const homeContent = await readEJSFile("./templates/sight.ejs");
                res.render("sight", { content: homeContent });
            } catch (err) {
                console.error(`PostgreSQL Error: ${err.message}`);
                res.status(500).send("Internal Server Error");
            }
        });

        // app.get("/student", async (req, res) => {
        //     try {
        //         const sql = `
        //         SELECT STUDENT_ID AS STUDENT_ID,
        //         NAME AS FULL_NAME,
        //         EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.DATE_OF_BIRTH) AS AGE,
        //         ADDRESS AS ADDRESS,
        //         LEVEL AS LEVEL,
        //         TERM AS TERM
        //         FROM STUDENT P;
        //         `;
        //         const result = await pool.query(sql);
        //         res.json(result.rows);
        //     } catch (error) {
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: "Internal Server Error" });
        //     }
        // });

        app.get("/student", async (req, res) => {
            try {
                let sql = `
                    SELECT STUDENT_ID AS student_id,
                    NAME AS full_name,
                    EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.DATE_OF_BIRTH) AS age,
                    ADDRESS AS address,
                    LEVEL AS level,
                    TERM AS term
                    FROM STUDENT P
                `;
                
                const { student_id,level, term, department_id } = req.query;
                let conditions = [];
                
                if (level) {
                    conditions.push(`LEVEL = '${level}'`);
                }
                if (term) {
                    conditions.push(`TERM = ${parseInt(term)}`);
                }
                if (department_id) {
                    conditions.push(`DEPARTMENT_ID = ${parseInt(department_id)}`);
                }
                if (student_id) {
                    conditions.push(`STUDENT_ID = '${student_id}'`);
                }
                
                if (conditions.length > 0) {
                    sql += ` WHERE ${conditions.join(" AND ")}`;
                }
                
                const result = await pool.query(sql);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        
        
        

        // app.get("/teacher", async (req, res) => {
        //     try {
        //         const sql = `
        //     SELECT T.TEACHER_ID,
        //     T.NAME AS FULL_NAME,
        //     T.EMAIL,
        //     T.ADDRESS,
        //     D.NAME AS DEPARTMENT_NAME,
        //     T.PHONE_NUMBER
        //     FROM TEACHER T
        //     JOIN DEPARTMENT D ON T.DEPARTMENT_ID = D.DEPARTMENT_ID;
        //     `;
        //         const result = await pool.query(sql);
        //         console.log(result.rows);
        //         res.json(result.rows);
        //     } catch (err) {
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: "Internal Server Error" });
        //     }
        // });

        app.get("/teacher", async (req, res) => {
            try {
                const { teacher_id, department_id } = req.query;
        
                let sql = `
                    SELECT 
                        T.TEACHER_ID,
                        T.NAME AS FULL_NAME,
                        T.EMAIL,
                        T.ADDRESS,
                        D.NAME AS DEPARTMENT_NAME,
                        T.PHONE_NUMBER
                    FROM 
                        TEACHER T
                    JOIN 
                        DEPARTMENT D ON T.DEPARTMENT_ID = D.DEPARTMENT_ID
                `;
        
                let conditions = [];
        
                if (teacher_id) {
                    conditions.push(`T.TEACHER_ID = '${teacher_id}'`);
                }
                if (department_id) {
                    conditions.push(`T.DEPARTMENT_ID = ${parseInt(department_id)}`);
                }
        
                if (conditions.length > 0) {
                    sql += ` WHERE ${conditions.join(" AND ")}`;
                }
        
                const result = await pool.query(sql);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        
        
        
        // app.get("/course", async (req, res) => {
        //     try {
        //         const sql = `
        //         SELECT C.COURSE_ID,
	    //         C.COURSE_TITLE,
	    //         D.NAME AS COURSE_BELONGS_TO,
	    //         C.TOTAL_LECTURES,
	    //         C.CREDIT
	    //         FROM COURSE C JOIN DEPARTMENT D
	    //         ON D.DEPARTMENT_ID = C.COURSE_ID/1000;
        //         `;
        //         const result = await pool.query(sql);
        //         res.json(result.rows);
        //     } catch (error) {
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: "Internal Server Error" });
        //     }
        // });

        app.get("/course", async (req, res) => {
            try {
                let sql = `
                    SELECT C.COURSE_ID,
                    C.COURSE_TITLE,
                    D.NAME AS COURSE_BELONGS_TO,
                    C.TOTAL_LECTURES,
                    C.CREDIT
                    FROM COURSE C JOIN DEPARTMENT D
                    ON D.DEPARTMENT_ID = C.COURSE_ID/1000
                `;
        
                const { course_id, credit, total_lectures } = req.query;
                let conditions = [];
        
                if (course_id) {
                    conditions.push(`C.COURSE_ID = '${course_id}'`);
                }
                if (credit) {
                    conditions.push(`C.CREDIT = ${parseInt(credit)}`);
                }
                if (total_lectures) {
                    conditions.push(`C.TOTAL_LECTURES = ${parseInt(total_lectures)}`);
                }
        
                if (conditions.length > 0) {
                    sql += ` WHERE ${conditions.join(" AND ")}`;
                }
        
                const result = await pool.query(sql);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.get("/grades", async (req, res) => {
            try {
                let sql = `
                    SELECT s.STUDENT_ID,
                        s.NAME AS STUDENT_NAME,
                        d.NAME AS DEPARTMENT_NAME,
                        calculate_cgpa(s.STUDENT_ID) AS CGPA
                    FROM STUDENT s
                    JOIN DEPARTMENT d ON s.DEPARTMENT_ID = d.DEPARTMENT_ID
                `;
        
                const { search } = req.query;
                if (search) {
                    // Assuming the search criteria should match either the student ID or name
                    sql += ` WHERE s.STUDENT_ID = $1 OR LOWER(s.NAME) LIKE LOWER($2)`;
                    const values = [`%${search}%`, `%${search}%`];
                    const result = await pool.query(sql, values);
                    res.json(result.rows);
                } else {
                    const result = await pool.query(sql);
                    res.json(result.rows);
                }
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        

        app.get("/viewcourse/:userId", async (req, res) => {
            const userId = req.params.userId;
            console.log('User ID:', userId);
            try {
                const sql = `
                    SELECT C.COURSE_ID,
                        C.COURSE_TITLE,
                        D.NAME AS COURSE_BELONGS_TO,
                        C.TOTAL_LECTURES,
                        C.CREDIT
                    FROM COURSE C 
                    JOIN DEPARTMENT D ON D.DEPARTMENT_ID = C.COURSE_ID/1000
                    JOIN STUDENT_COURSE SC ON SC.COURSE_ID = C.COURSE_ID
                    WHERE SC.STUDENT_ID = $1;
                `;
                const { rows } = await pool.query(sql, [userId]);
                res.json(rows); // Corrected to use 'rows' instead of 'result.rows'
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.get("/viewgrade", async (req, res) => {
            try {
                const sql = `
                SELECT s.STUDENT_ID,s.NAME AS STUDENT_NAME,D.name AS DEPARTMENT_NAME,
                calculate_cgpa(STUDENT_ID) AS CGPA
                FROM STUDENT S JOIN DEPARTMENT D
                ON S.DEPARTMENT_ID = D.DEPARTMENT_ID;
            `;
                const result = await pool.query(sql);
                console.log(result.rows);
                res.json(result.rows);
            } catch (err) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.get("/availablecourse/:userId", async (req, res) => {
            const userId = req.params.userId;
            console.log('User ID:', userId);
            try {
                const sql = `
                SELECT C.COURSE_ID,
                C.COURSE_TITLE,
                D.NAME AS COURSE_BELONGS_TO,
                C.TOTAL_LECTURES,
                C.CREDIT
         FROM COURSE C
         JOIN DEPARTMENT D ON D.DEPARTMENT_ID = C.COURSE_ID / 1000
         WHERE C.COURSE_ID NOT IN (
             SELECT SC.COURSE_ID
             FROM STUDENT_COURSE SC
             WHERE SC.STUDENT_ID = $1
         )
         AND C.COURSE_ID / 1000 = (
             SELECT D.DEPARTMENT_ID
             FROM STUDENT S
             JOIN DEPARTMENT D ON D.DEPARTMENT_ID = S.DEPARTMENT_ID
             WHERE S.STUDENT_ID = $1
         )
         AND (C.COURSE_ID/100)%10 = (
             SELECT S.LEVEL
             FROM STUDENT S
             WHERE S.STUDENT_ID = $1
         );
                `;
                const { rows } = await pool.query(sql, [userId]);
                res.json(rows); // Corrected to use 'rows' instead of 'result.rows'
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.post('/addstudentcourse/:userId/:courseId', async (req, res) => {
            try {
              // Extract userId and courseId from request parameters
              const { userId, courseId } = req.params;
              console.log(userId, courseId);
              
              // Dummy value for teacherId (null as per requirement)
              const teacherId = null;
          
              // Insert data into the STUDENT_COURSE table
              const result = await pool.query(
                'INSERT INTO STUDENT_COURSE (STUDENT_ID, TEACHER_ID, COURSE_ID) VALUES ($1, $2, $3)',
                [userId, teacherId, courseId]
              );
          
              // Send success response
              res.status(200).json({ message: 'Course Added successfully' });
            } catch (error) {
              // Handle errors
              console.error('Error inserting data:', error);
              res.status(500).json({ error: 'Failed to insert data' });
            }
          });
        
        app.get('/department', async (req, res) => {
            try {
                const sql = `
                SELECT D.NAME AS DEPARTMENT_NAME,
	            D.DEPARTMENT_ID ,
                COUNT(T.TEACHER_ID) AS TOTAL_TEACHERS
                FROM
                DEPARTMENT D
                LEFT JOIN
                TEACHER T ON D.DEPARTMENT_ID = T.DEPARTMENT_ID
                GROUP BY
                D.NAME,D.DEPARTMENT_ID
                HAVING
                COUNT(T.TEACHER_ID) > 0
                ORDER BY
                TOTAL_TEACHERS DESC;
                `;
                const result = await pool.query(sql);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.get('/relation', async (req, res) => {
            try {
                const sql = `
                SELECT
                s.student_id,
                s.name AS student_name,
                s.department_id AS student_department_id,
                t.teacher_id,
                t.name AS teacher_name,
                t.department_id AS teacher_department_id
                FROM
                student s
                JOIN
                teacher t ON s.department_id = t.department_id;
	
                `;
                const result = await pool.query(sql);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.put('/updatestudent', async (req, res) => {
            const { studentId, parameter, updatedValue } = req.body;
          
            try {
              const result = await pool.query('CALL update_student_info($1, $2, $3)', [studentId, parameter, updatedValue]);
              res.status(200).json({ message: 'Student updated successfully' });
            } catch (error) {
              console.error('Error updating student:', error);
              res.status(500).json({ error: 'Internal server error' });
            }
          });

          // Backend code for updating course information

app.put('/updatecourse', async (req, res) => {
    const { courseId, parameter, updatedValue } = req.body;
    
    try {
        // Call the stored procedure to update course information
        await pool.query('CALL update_course_info($1, $2, $3)', [courseId, parameter, updatedValue]);
        
        // Send success response
        res.status(200).json({ message: 'Course updated successfully' });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


          
        
          
          
        app.get('/student/:studentId', async (req, res) => {
            const studentId = req.params.studentId;
            console.log('Student ID:', studentId);
            try {
                const sql = `
            SELECT 
                STUDENT_ID,
                NAME AS FULL_NAME,
                EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM DATE_OF_BIRTH) AS AGE,
                ADDRESS,
                LEVEL,
                TERM
            FROM STUDENT 
            WHERE STUDENT_ID = $1;
        `;
                const { rows } = await pool.query(sql, [studentId]);
                if (rows.length > 0) {
                    res.json(rows[0]);
                } else {
                    res.status(404).json({ error: 'Student not found' });
                }
            } catch (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });


        app.get('/teacher/:teacherId', async (req, res) => {
            const teacherId = req.params.teacherId;
            console.log('Teacher ID:', teacherId);
            try {
                const sql = `
                    SELECT 
                        TEACHER_ID,
                        NAME,
                        PHONE_NUMBER,
                        EMAIL,
                        ADDRESS,
                        DEPARTMENT_ID
                    FROM TEACHER 
                    WHERE TEACHER_ID = $1;
                `;
                const { rows } = await pool.query(sql, [teacherId]);
                if (rows.length > 0) {
                    res.json(rows[0]);
                } else {
                    res.status(404).json({ error: 'Teacher not found' });
                }
            } catch (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
        

        app.get('/courses/:courseID', async (req, res) => {
            const courseId = req.params.courseID;
            console.log('Requested Course ID:', courseId);
            
            try {
                const sql = `
                    SELECT
                        C.COURSE_ID,
                        c.course_title,
                        a.assignment_title AS assignment1_title,
                        TO_CHAR(a.submission_date,'DD-MM-YYYY') AS assignment1_submission_date,
                        b.assignment_title AS assignment2_title,
                        TO_CHAR(b.submission_date,'DD-MM-YYYY') AS assignment2_submission_date,
                        p.project_title,
                        TO_CHAR(p.submission_date,'DD-MM-YYYY') AS project_submission_date,
                        ct1.ct_title AS ct1_title,
                        TO_CHAR(ct1.exam_date,'DD-MM-YYYY') AS ct1_exam_date,
                        ct1.START_TIME AS ct1_start_time,
                        ct1.ENDING_TIME AS ct1_end_time,
                        ct2.ct_title AS ct2_title,
                        TO_CHAR(ct2.exam_date,'DD-MM-YYYY') AS ct2_exam_date,
                        ct2.START_TIME AS ct2_start_time,
                        ct2.ENDING_TIME AS ct2_end_time,
                        TO_CHAR(T.exam_date,'DD-MM-YYYY') AS term_final_exam_date,
                        T.START_TIME AS term_final_start_time,
                        T.time_duration AS term_final_time_duration,
                        te.teacher_id,
                        te.name as teacher_name
                    FROM 
                        course_details s
                        JOIN course c ON s.course_id = c.course_id
                        JOIN assignment a ON s.assignment1_id = a.assignment_id
                        JOIN assignment b ON s.assignment2_id = b.assignment_id
                        JOIN project p ON s.project_id = p.project_id
                        JOIN ct ct1 ON s.ct1_id = ct1.ct_id
                        JOIN ct ct2 ON s.ct2_id = ct2.ct_id
                        JOIN TERM_FINAL T ON T.TERM_FINAL_id = S.TERM_FINAL_id
                        
                        JOIN teacher te ON s.teacher_id =te.teacher_id
                    WHERE 
                        C.COURSE_ID = $1
                    GROUP BY 
                        C.COURSE_ID,
                        c.course_title,
                        a.assignment_title,
                        a.submission_date,
                        b.assignment_title,
                        b.submission_date,
                        p.project_title,
                        p.submission_date,
                        ct1.ct_title,
                        ct1.exam_date,
                        ct1.START_TIME,
                        ct1.ENDING_TIME,
                        ct2.ct_title,
                        ct2.exam_date,
                        ct2.START_TIME,
                        ct2.ENDING_TIME,
                        T.exam_date,
                        T.START_TIME,
                        T.time_duration,
                        te.teacher_id,
                        te.name;
                `;
                
                console.log('SQL Query:', sql);
        
                const { rows } = await pool.query(sql, [courseId]);
                
                if (rows.length > 0) {
                    res.json(rows[0]);
                } else {
                    res.status(404).json({ error: 'Course not found' });
                }
            } catch (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
        
        
        app.get('/grades/:userID', async (req, res) => {
            const userId = req.params.userID;
            console.log('Requested user ID:', userId);
            
            try {
                const sql = `
                    SELECT
                    SA.COURSE_ID,
                    C.Course_title,
                    C.credit,
                    A1.ASSIGNMENT_TITLE AS ASSIGNMENT1_TITLE,
                    A2.ASSIGNMENT_TITLE AS ASSIGNMENT2_TITLE,
                    CT1.CT_TITLE AS CT1_TITLE,
                    CT2.CT_TITLE AS CT2_TITLE,
                    SA.ATTENDENCES_MARK,
                    SA.ASSIGNMENT1_MARK,
                    SA.ASSIGNMENT2_MARK,
                    SA.PROJECT_MARK,
                    SA.CT1_MARK,
                    SA.CT2_MARK,
                    SA.TERM_FINAL_MARK,
                    (
                        (SA.TERM_FINAL_MARK * 0.5) +
                        ((SA.CT1_MARK + SA.CT2_MARK) / 4) +
                        (SA.ATTENDENCES_MARK) +
                        ((SA.ASSIGNMENT1_MARK + SA.ASSIGNMENT2_MARK) / 2) +
                        (SA.PROJECT_MARK / 2.5)
                    ) AS TOTAL_MARK,
                    CASE
                        WHEN 
                        (SA.TERM_FINAL_MARK * 0.5) +
                        ((SA.CT1_MARK + SA.CT2_MARK) / 4) +
                        (SA.ATTENDENCES_MARK) +
                        ((SA.ASSIGNMENT1_MARK + SA.ASSIGNMENT2_MARK) / 2) +
                        (SA.PROJECT_MARK / 2.5) >= 80 THEN 4.0
                        WHEN 
                        (SA.TERM_FINAL_MARK * 0.5) +
                        ((SA.CT1_MARK + SA.CT2_MARK) / 4) +
                        (SA.ATTENDENCES_MARK) +
                        ((SA.ASSIGNMENT1_MARK + SA.ASSIGNMENT2_MARK) / 2) +
                        (SA.PROJECT_MARK / 2.5)>= 70 THEN 3.5
                        WHEN 
                        (SA.TERM_FINAL_MARK * 0.5) +
                        ((SA.CT1_MARK + SA.CT2_MARK) / 4) +
                        (SA.ATTENDENCES_MARK) +
                        ((SA.ASSIGNMENT1_MARK + SA.ASSIGNMENT2_MARK) / 2) +
                        (SA.PROJECT_MARK / 2.5)>= 60 THEN 3.0
                        WHEN 
                        (SA.TERM_FINAL_MARK * 0.5) +
                        ((SA.CT1_MARK + SA.CT2_MARK) / 4) +
                        (SA.ATTENDENCES_MARK) +
                        ((SA.ASSIGNMENT1_MARK + SA.ASSIGNMENT2_MARK) / 2) +
                        (SA.PROJECT_MARK / 2.5)>= 50 THEN 2.5
                        WHEN 
                        (SA.TERM_FINAL_MARK * 0.5) +
                        ((SA.CT1_MARK + SA.CT2_MARK) / 4) +
                        (SA.ATTENDENCES_MARK) +
                        ((SA.ASSIGNMENT1_MARK + SA.ASSIGNMENT2_MARK) / 2) +
                        (SA.PROJECT_MARK / 2.5) >= 40 THEN 2.0
                        ELSE 0.0
                    END AS CGPA
                FROM
                    STUDENT_ALL SA
                JOIN
                    ASSIGNMENT A1 ON A1.ASSIGNMENT_ID = SA.ASSIGNMENT1_ID
                JOIN
                    ASSIGNMENT A2 ON A2.ASSIGNMENT_ID = SA.ASSIGNMENT2_ID
                JOIN
                    CT CT1 ON CT1.CT_ID = SA.CT1_ID
                JOIN
                    CT CT2 ON CT2.CT_ID = SA.CT2_ID
                JOIN
                    PROJECT P ON P.PROJECT_ID = SA.PROJECT_ID
                JOIN
                    TERM_FINAL TF ON TF.TERM_FINAL_ID = SA.TERM_FINAL_ID
                JOIN
                    COURSE C ON C.COURSE_ID =SA.COURSE_ID
                WHERE SA.STUDENT_ID = $1;
                `;
                
                const { rows } = await pool.query(sql, [userId]);
                
                if (rows.length > 0) {
                    res.json(rows); // Return array of course information
                } else {
                    res.status(404).json({ error: 'User not found' });
                }
            } catch (error) {
                console.error('Error executing query:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        app.get('/fees/:userID', async (req, res) => {
            const userId = req.params.userID;
        
            try {
                const query = `
                    SELECT * FROM fees WHERE student_id = $1;
                `;
                
                const { rows } = await pool.query(query, [userId]);
        
                if (rows.length > 0) {
                    res.json(rows[0]);
                } else {
                    res.status(404).json({ error: 'Fees information not found for the specified user ID' });
                }
            } catch (error) {
                console.error('Error fetching fees information:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });


        app.put('/fees/:userID', async (req, res) => {
            const userID = req.params.userID;
            const { dueAmount } = req.body;
        
            try {
                const query = 'UPDATE fees SET due_amount = 5350-$1 WHERE student_id = $2';
                await pool.query(query, [dueAmount, userID]);
        
                res.json({ message: 'Due amount updated successfully' });
            } catch (error) {
                console.error('Error updating due amount:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
        
        
        // app.get('/grade', async (req, res) => {
        //     try {
        //         const sql = `
        // SELECT 
        //     S.STUDENT_ID AS ID,
        //     S.NAME AS STUDENT_NAME,
        //     G.TERM_WISE_RESULT AS RECENT_TERM_CGPA,
        //     G.TOTAL_RESULT AS OVERALL_CGPA,
        //     CASE
        //         WHEN G.TOTAL_RESULT >= 4.0 THEN 'A+'
        //         WHEN G.TOTAL_RESULT >= 3.75 THEN 'A'
        //         WHEN G.TOTAL_RESULT >= 3.5 THEN 'A-'
        //         WHEN G.TOTAL_RESULT >= 3.25 THEN 'B+'
        //         WHEN G.TOTAL_RESULT >= 3.0 THEN 'B'
        //         WHEN G.TOTAL_RESULT >= 2.75 THEN 'B-'
        //         WHEN G.TOTAL_RESULT >= 2.5 THEN 'C+'
        //         WHEN G.TOTAL_RESULT >= 2.25 THEN 'C'
        //         WHEN G.TOTAL_RESULT >= 2.00 THEN 'D'
        //         ELSE 'F'
        //     END AS GRADES
        // FROM 
        //     STUDENT S 
        // JOIN 
        //     GRADE G ON S.STUDENT_ID = G.STUDENT_ID;
        // `;
        //         const result = await pool.query(sql);
        //         res.json(result.rows);
        //     } catch (error) {
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: "Internal Server Error" });
        //     }
        // });


        // app.post('/addstudent', async (req, res) => {
        //     const { studentId, name, address, phoneNumber, dateOfBirth, level, term, email, bankAccountNo, departmentId } = req.body;
        //     try {
        //         console.log("Received student information:", studentId, name, address, phoneNumber, dateOfBirth, level, term, email, bankAccountNo, departmentId);
        //         const result = await pool.query(
        //             'INSERT INTO student (student_id, name, address, phone_number, date_of_birth, level, term, email, bank_account_no, department_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        //             [studentId, name, address, phoneNumber, dateOfBirth, level, term, email, bankAccountNo, departmentId]
        //         );
        //         res.status(201).json({
        //             message: "Student added successfully!",
        //             student: result.rows[0]
        //         }); // Send back the newly created student
        //     } catch (error) {
        //         console.error('Error adding student', error);
        //         res.status(500).send('Error adding student');
        //     }
        // });
        
        
        app.post('/addstudent', async (req, res) => {
            const { studentId, name, address, phoneNumber, dateOfBirth, email, bankAccountNo } = req.body;
            try {
                // Call your database function here
                await pool.query(
                    'SELECT insert_student_with_fees_and_supervisor($1, $2, $3, $4, $5, $6, $7)',
                    [studentId, name, address, phoneNumber, dateOfBirth, email, bankAccountNo]
                );
        
                res.status(200).json({ message: 'Student added successfully!' });
            } catch (error) {
                console.error('Error adding student', error);
                res.status(500).send('Error adding student');
            }
        });
        

        app.post('/adddepartment', async (req, res) => {
            const { departmentId, name } = req.body;
            try {
                console.log(departmentId, name);
              // Insert department data into the database
              const result = await pool.query(
                'INSERT INTO department (department_id, name) VALUES ($1, $2) RETURNING *',
                [departmentId, name]
              );
              res.status(201).json({ message: 'Department added successfully!' });
            } catch (error) {
              console.error('Error adding department', error);
              res.status(500).json({ error: 'Failed to add department' });
            }
          });

          app.post('/deletestudent', async (req, res) => {
            const studentId = req.body.studentId;
            try {
                // Delete student from the database
                console.log(studentId);
                const result = await pool.query(
                    'DELETE FROM student WHERE student_id = $1',
                    [studentId]
                );
                if (result.rowCount === 0) {
                    res.status(404).json({ error: 'Student not found' });
                } else {
                    res.status(200).json({ message: 'Student deleted successfully!' });
                }
            } catch (error) {
                console.error('Error deleting student', error);
                res.status(500).json({ error: 'Failed to delete student' });
            }
        });

        // app.post('/deleteteacher', async (req, res) => {
        //     const  teacherId  = req.body.teacherId;
        //     try {
        //         console.log(teacherId);
        //         const result = await pool.query('DELETE FROM teacher WHERE teacher_id = $1', [teacherId]);
        //         if (result.rowCount === 0) {
        //             res.status(404).json({ error: 'Teacher not found' });
        //         } else {
        //             res.status(200).json({ message: 'Teacher deleted successfully!' });
        //         }
        //     } catch (error) {
        //         console.error('Error deleting teacher', error);
        //         res.status(500).json({ error: 'Failed to delete teacher' });
        //     }
        // });

        app.post('/deleteteacher', async (req, res) => {
            const teacherId = req.body.teacherId;
            try {
                console.log(teacherId);
                // Soft delete teacher record by updating is_deleted and deleted_at columns
                const result = await pool.query(
                    'UPDATE teacher SET is_deleted = TRUE, deleted_at = NOW() WHERE teacher_id = $1',
                    [teacherId]
                );
                if (result.rowCount === 0) {
                    res.status(404).json({ error: 'Teacher not found' });
                } else {
                    res.status(200).json({ message: 'Teacher soft-deleted successfully!' });
                }
            } catch (error) {
                console.error('Error soft-deleting teacher', error);
                res.status(500).json({ error: 'Failed to soft-delete teacher' });
            }
        });

        setInterval(async () => {
            try {
                // Hard delete soft-deleted teachers older than 1 day
                const deleteResult = await pool.query(
                    'DELETE FROM teacher WHERE is_deleted = TRUE AND deleted_at < NOW() - INTERVAL \'1 day\''
                );
                console.log(`${deleteResult.rowCount} soft-deleted teachers deleted.`);
            } catch (error) {
                console.error('Error deleting soft-deleted teachers', error);
            }
        }, 24 * 60 * 60 * 1000);

        app.post('/deletecourse', async (req, res) => {
            const courseId = req.body.courseId;
            try {
                console.log(courseId);
                const result = await pool.query('DELETE FROM course WHERE course_id = $1', [courseId]);
                if (result.rowCount === 0) {
                    res.status(404).json({ error: 'Course not found' });
                } else {
                    res.status(200).json({ message: 'Course deleted successfully!' });
                }
            } catch (error) {
                console.error('Error deleting course', error);
                res.status(500).json({ error: 'Failed to delete course' });
            }
        });

          app.post('/addteacher', async (req, res) => {
            const { teacherId, phoneNumber, email, address, name, departmentId } = req.body;
            try {
                console.log(teacherId, phoneNumber, email, address, name, departmentId);
              const result = await pool.query(
                'INSERT INTO teacher (teacher_id, phone_number, email, address, name, department_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [teacherId, phoneNumber, email, address, name, departmentId]
              );
              res.status(201).json({ message: 'Teacher added successfully', data: result.rows[0] });
            } catch (error) {
              console.error('Error adding teacher', error);
              res.status(500).json({ error: 'Failed to add teacher' });
            }
        });

        app.post('/addcourse', async (req, res) => {
            const { courseId, courseTitle, startTime, endTime, totalLectures, credit } = req.body;
            try {
                console.log(courseId, courseTitle, startTime, endTime, totalLectures, credit);
              const result = await pool.query(
                'SELECT insert_course_with_teacher_and_details($1, $2, $3, $4, $5, $6)',
                [courseId, courseTitle, startTime, endTime, totalLectures, credit]
              );
              res.status(201).json({ message: 'Course added successfully', data: result.rows[0] });
            } catch (error) {
              console.error('Error adding course', error);
              res.status(500).json({ error: 'Failed to add course' });
            }
        });

        app.post('/addlecture', async (req, res) => {
            const { lectureId, lectureTitle, courseId } = req.body;
            try {
              // Insert the new lecture into the database
              const result = await pool.query(
                'INSERT INTO lectures (lecture_id, lecture_title, course_id) VALUES ($1, $2, $3) RETURNING *',
                [lectureId, lectureTitle, courseId]
              );
              // Send a success response
              res.status(201).json({ message: 'Lecture added successfully', data: result.rows[0] });
            } catch (error) {
              // If an error occurs, send an error response
              console.error('Error adding lecture', error);
              res.status(500).json({ error: 'Failed to add lecture' });
            }
          });

    } finally {
        // console.log("Shutting down server");
        // pool.end();
    }
}

// running the function
run().catch((err) => console.error(err));

// listening to the port
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
