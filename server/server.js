const fs = require("fs").promises;
const express = require("express");
const cors = require("cors");
const pool = require("../db");
const bcrypt = require("bcrypt");
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
        app.get("/", async (req, res) => {
            try {
                const sightContent = await readEJSFile("./templates/sight.ejs");
                res.render("sight", { content: sightContent });
            } catch (err) {
                console.error(`PostgreSQL Error: ${err.message}`);
                res.status(500).send("Internal Server Error");
            }
        });

        app.get("/login", async (req, res) => {
            try {
                const loginContent = await readEJSFile("./templates/login.ejs");
                res.render("login", { content: loginContent });
            } catch (err) {
                console.error(`Error reading login template: ${err.message}`);
                res.status(500).send("Internal Server Error");
            }
        });

        app.post("/login", async (req, res) => {
            const { email, password } = req.body;

            try {
                console.log("Received login request:", { email, password });

                const result = await pool.query(
                    `SELECT * 
                    FROM ADMIN
                    WHERE EMAIL = $1 AND PASSWORD = $2`,
                    [email, password]
                );

                if (result.rows.length !== 0) {
                    res.redirect("/admin");
                } else {
                    res.redirect("/error");
                }
            } catch (err) {
                console.error(`PostgreSQL Error: ${err.message}`);
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

        app.get("/signup", async (req, res) => {
            try {
                const signupContent = await readEJSFile("./templates/signup.ejs");
                res.render("signup", { content: signupContent });
            } catch (err) {
                console.error(`PostgreSQL Error: ${err.message}`);
                res.status(500).send("Internal Server Error");
            }
        });

        app.get("/umpire", async (req, res) => {
            try {
                const sql = `
                SELECT
                  (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
                  P.NATIONALITY,
                  EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.DATE_OF_BIRTH) AS AGE,
                  P.IMAGE,
                  P.PERSONID,
                  C.NO_OF_MATCH_CONDUCTED
                FROM UMPIRE C
                JOIN PERSON P ON C.PERSONID = P.PERSONID;
              `;

                const result = await pool.query(sql);
                res.render("umpire", { data: result.rows });
                // res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.get('/coach', async (req, res) => {
            try {
                // SQL query to retrieve information about all coaches
                const sql = `
                    SELECT
                        (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
                        P.NATIONALITY,
                        EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM C.START_DATE_OF_CAREER) AS COACHING_DURATION,
                        P.IMAGE,
                        P.PERSONID,
                        T.TEAM_NAME
                    FROM COACH C
                    JOIN PERSON P ON C.PERSONID = P.PERSONID
                    LEFT JOIN TEAM T ON C.TEAM_ID = T.TEAM_ID;
                `;
        
                // Execute the SQL query
                const result = await pool.query(sql);
                console.log(result.rows);
        
                // Check if any coach information is found
                // if (result.rows.length !== 0) {
                    res.render("coach", { data: result.rows });
                // } else {
                    // res.status(404).json({ error: 'No coaches found' });
                // }
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
        // app.get("/umpire", async (req, res) => {
        //     try {
        //         const sql = `
        //         SELECT
        //           (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
        //           P.NATIONALITY,
        //           EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.DATE_OF_BIRTH) AS AGE,
        //           P.IMAGE,
        //           P.PERSONID,
        //           C.NO_OF_MATCH_CONDUCTED
        //         FROM UMPIRE C
        //         JOIN PERSON P ON C.PERSONID = P.PERSONID;
        //       `;

        //         const result = await pool.query(sql);
        //         // res.render("umpire", { data: result.rows });
        //         res.json(result.rows);
        //     } catch (error) {
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: "Internal Server Error" });
        //     }
        // });

        // app.get("/pointTable", async (req, res) => {
        //     try {
        //         const sql = `
        //         SELECT T.TEAM_NAME AS NAME,
        //         P.MATCHES MATCHES,
        //         P.WON WON, P.LOST LOST, P.DRAW DRAW, P.POINTS POINTS, P.NRR NRR
        //         FROM POINT_TABLE P JOIN TEAM T
        //         ON (P.TEAM_ID = T.TEAM_ID);
        //         `
        //         const result = await pool.query(sql);
        //         res.json(result.rows);
        //     } catch (error) {
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: "Internal Server Error" });
        //     }
        // });

        // app.get('/coach', async (req, res) => {
        //     try {
        //         // SQL query to retrieve information about all coaches
        //         const sql = `
        //             SELECT
        //                 (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
        //                 P.NATIONALITY,
        //                 EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM C.START_DATE_OF_CAREER) AS COACHING_DURATION,
        //                 P.IMAGE,
        //                 P.PERSONID,
        //                 T.TEAM_NAME
        //             FROM COACH C
        //             JOIN PERSON P ON C.PERSONID = P.PERSONID
        //             LEFT JOIN TEAM T ON C.TEAM_ID = T.TEAM_ID;
        //         `;

        //         // Execute the SQL query
        //         const result = await pool.query(sql);
        //         console.log(result.rows);
        //         res.json(result.rows);
        //     } catch (error) {
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: 'Internal Server Error' });
        //     }
        // });

        // //get all teams
        // app.get("/teams", async (req, res) => {

        //     try {
        //         const sql = `
        //         SELECT* FROM TEAM;
        //         `;
        //         const result = await pool.query(sql);
        //         // console.log(result.rows);
        //         res.json(result.rows);
        //     }
        //     catch (error) {
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: 'Internal Server Error' });
        //     }
        // });


        // // app.get('/teams/:team_id', async (req, res) => {
        // //     const { team_id } = req.params;

        // //     try {
        // //       // Query to retrieve the team from the database
        // //       console.log("get team");
        // //       const query = 'SELECT * FROM team WHERE team_id = $1';
        // //       const result = await pool.query(query, [team_id]);

        // //       // Check if team exists
        // //       if (result.rows.length === 0) {
        // //         return res.status(404).json({ error: 'Team not found' });
        // //       }
        // //       console.log(result);

        // //       // Return the team data
        // //       res.json(result.rows);
        // //     } catch (error) {
        // //       console.error('Error retrieving team:', error);
        // //       res.status(500).json({ error: 'Internal server error' });
        // //     }
        // //   });

        // //get a team
        // app.get("/teams/:team_id", async (req, res,) => {
        //     try {
        //         console.log("get team");
        //         console.log(req.params.team_id);
        //         const sql =`
        //         select t.*,p1.first_name||' '||p1.last_name as captain_name,pl.playerid,pl.type,p.first_name||' '||p.last_name as "player_name",p.image,p2.first_name||' '||p2.last_name as coach_name,p2.nationality,p2.image
        //         from team t join player pl on pl.team_id=t.team_id
        //         join person p on pl.playerid=p.personid
        //         join person p1 on p1.personid=t.captain_id
        //         join person p2 on t.coach_id=p2.personid
        //         where t.team_id=$1;
        //         `;
        //         const result = await pool.query(sql,[req.params.team_id]);
        //         console.log(result.rows);
        //         res.json(result.rows);
        //     }
        //     catch (error) {
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: 'Internal Server Error' });
        //     }
        // });

        // app.get("/player", async (req, res) => {
        //     try {
        //         const sql = `
        //         SELECT
        //             P.PERSONID AS PERSON_ID,
        //             P.IMAGE,
        //             (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
        //             T.TEAM_NAME AS TEAM,
        //             PL.TYPE,
        //             EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.DATE_OF_BIRTH) AS AGE
        //         FROM PLAYER PL
        //         JOIN PERSON P ON PL.PLAYERID = P.PERSONID
        //         LEFT JOIN TEAM T ON PL.TEAM_ID = T.TEAM_ID;
        //         `;
        //         const result = await pool.query(sql);
        //         res.json(result.rows);
        //     } catch (error) {
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: "Internal Server Error" });
        //     }
        // });

        // app.get("/player/:player_id", async (req, res) => {
        //     try {
        //         const sql = `
        //         SELECT
        //             P.IMAGE,
        //             (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
        //             T.TEAM_NAME AS TEAM,
        //             PL.TYPE,
        //             EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.DATE_OF_BIRTH) AS AGE
        //         FROM PLAYER PL
        //         JOIN PERSON P ON PL.PLAYERID = P.PERSONID
        //         LEFT JOIN TEAM T ON PL.TEAM_ID = T.TEAM_ID
        //         WHERE PL.PLAYERID = $1;
        //         `;
        //         const result = await pool.query(sql, [req.params.player_id]);
        //         console.log(result.rows);
        //         res.json(result.rows);
        //     } catch (error) {
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: "Internal Server Error" });
        //     }
        // });

        // //get team details along with it's all players, it's coaches
        // app.get("/teams/:team_id/teamDetails",async(req,res)=>{
        //     try{
        //         const sql = `//         select t.*,p1.first_name||' '||p1.last_name as captain_name,pl.playerid,pl.type,p.first_name||' '||p.last_name as "player_name",p.image,p2.first_name||' '||p2.last_name as coach_name,p2.nationality,p2.image
        //         from team t join player pl on pl.team_id=t.team_id
        //         join person p on pl.playerid=p.personid
        //         join person p1 on p1.personid=t.captain_id
        //         join person p2 on t.coach_id=p2.personid
        //         where t.team_id=$1;
        //         `;
        //         const result = await pool.query(sql,[req.params.team_id]);
        //         console.log(result.rows);
        //     }
        //     catch(error){
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: "Internal Server Error" });
        //     }
        // });

        // app.get("/tournaments" , async (req, res) => {
        //     try {
        //         const sql = `
        //         SELECT * FROM TOURNAMENT;
        //         `;
        //         const result = await pool.query(sql);
        //         console.log(result.rows);
        //         res.json(result.rows);
        //     } catch (error) {
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: "Internal Server Error" });
        //     }
        // });
    } finally {
        // You can add cleanup logic here if needed
    }
}

// running the function
run().catch((err) => console.error(err));

// listening to the port
app.listen(port, () => {
    console.log(`test server running on ${port}`);
});
