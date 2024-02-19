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
        

        app.post("/login", async (req, res) => {
            const { email, password, selection } = req.body;
            console.log(selection);

            try {
                console.log("Received login request:", { email, password });

                if (selection == 'user') {
                    const result = await pool.query(`SELECT * FROM USERS WHERE EMAIL = $1 AND PASSWORD = $2`, [email, password]);
                    console.log(result);
                    if (result.rows.length !== 0) {
                        res.json({ flag: true });
                    } else {
                        res.json({ flag: false });
                    }
                }

                else if (selection == 'admin') {
                    const result = await pool.query(`SELECT * FROM ADMIN WHERE EMAIL = $1 AND PASSWORD = $2`, [email, password]);
                    console.log(result);
                    if (result.rows.length !== 0) {
                        res.json({ flag: true });
                    } else {
                        res.json({ flag: false });
                    }
                }
            } catch (err) {
                console.error(`PostgreSQL Error: ${err.message}`);
                res.status(500).send("Internal Server Error");
            }
        });

        app.post("/signup", async (req, res) => {
            const { email, password } = req.body;
            try {
                console.log("Received signup request:", { email, password });

                await pool.query(`
                    INSERT INTO USERS (EMAIL, PASSWORD)
                    VALUES ($1, $2)`,
                    [email, password]
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

        app.get("/teacher",async (req, res) => {
            try{
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
