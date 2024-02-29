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

        app.get("/student", async (req, res) => {
            try {
                const sql = `
                SELECT STUDENT_ID AS STUDENT_ID,
                NAME AS FULL_NAME,
                EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.DATE_OF_BIRTH) AS AGE,
                ADDRESS AS ADDRESS,
                LEVEL AS LEVEL,
                TERM AS TERM
                FROM STUDENT P;
                `;
                const result = await pool.query(sql);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.get("/teacher", async (req, res) => {
            try {
                const sql = `
            SELECT T.TEACHER_ID,
            T.NAME AS FULL_NAME,
            T.EMAIL,
            T.ADDRESS,
            D.NAME AS DEPARTMENT_NAME,
            T.PHONE_NUMBER
            FROM TEACHER T
            JOIN DEPARTMENT D ON T.DEPARTMENT_ID = D.DEPARTMENT_ID;
            `;
                const result = await pool.query(sql);
                console.log(result.rows);
                res.json(result.rows);
            } catch (err) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        app.get("/course", async (req, res) => {
            try {
                const sql = `
                SELECT C.COURSE_ID,
	            C.COURSE_TITLE,
	            D.NAME AS COURSE_BELONGS_TO,
	            C.TOTAL_LECTURES,
	            C.CREDIT
	            FROM COURSE C JOIN DEPARTMENT D
	            ON D.DEPARTMENT_ID = C.COURSE_ID/1000;
                `;
                const result = await pool.query(sql);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
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

        app.get('/grade', async (req, res) => {
            try {
                const sql = `
        SELECT 
            S.STUDENT_ID AS ID,
            S.NAME AS STUDENT_NAME,
            G.TERM_WISE_RESULT AS RECENT_TERM_CGPA,
            G.TOTAL_RESULT AS OVERALL_CGPA,
            CASE
                WHEN G.TOTAL_RESULT >= 4.0 THEN 'A+'
                WHEN G.TOTAL_RESULT >= 3.75 THEN 'A'
                WHEN G.TOTAL_RESULT >= 3.5 THEN 'A-'
                WHEN G.TOTAL_RESULT >= 3.25 THEN 'B+'
                WHEN G.TOTAL_RESULT >= 3.0 THEN 'B'
                WHEN G.TOTAL_RESULT >= 2.75 THEN 'B-'
                WHEN G.TOTAL_RESULT >= 2.5 THEN 'C+'
                WHEN G.TOTAL_RESULT >= 2.25 THEN 'C'
                WHEN G.TOTAL_RESULT >= 2.00 THEN 'D'
                ELSE 'F'
            END AS GRADES
        FROM 
            STUDENT S 
        JOIN 
            GRADE G ON S.STUDENT_ID = G.STUDENT_ID;
        `;
                const result = await pool.query(sql);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.post('/addstudent', async (req, res) => {
            const { studentId, name, address, phoneNumber, dateOfBirth, level, term, email, bankAccountNo, departmentId } = req.body;
            try {
                console.log("Received student information:", studentId, name, address, phoneNumber, dateOfBirth, level, term, email, bankAccountNo, departmentId);
                const result = await pool.query(
                    'INSERT INTO student (student_id, name, address, phone_number, date_of_birth, level, term, email, bank_account_no, department_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
                    [studentId, name, address, phoneNumber, dateOfBirth, level, term, email, bankAccountNo, departmentId]
                );
                res.status(201).json({
                    message: "Student added successfully!",
                    student: result.rows[0]
                }); // Send back the newly created student
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
                'INSERT INTO course (course_id, course_title, start_time, end_time, totaL_lectures, credit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [courseId, courseTitle, startTime, endTime, totalLectures, credit]
              );
              res.status(201).json({ message: 'Course added successfully', data: result.rows[0] });
            } catch (error) {
              console.error('Error adding course', error);
              res.status(500).json({ error: 'Failed to add course' });
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
