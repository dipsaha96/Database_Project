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
                        C.COURSE_ID = 1405
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
						
						
SELECT C.COURSE_ID,
	            C.COURSE_TITLE,
	            D.NAME AS COURSE_BELONGS_TO,
	            C.TOTAL_LECTURES,
	            C.CREDIT
	            FROM COURSE C JOIN DEPARTMENT D
	            ON D.DEPARTMENT_ID = C.COURSE_ID/1000
                JOIN STUDENT_COURSE SC ON SC.COURSE_ID = C.COURSE_ID
                WHERE SC.STUDENT_ID = 2105138;
				
				
				select *
				from student_course
				
				delete from student_course
				where student_id=2105138 and course_id=5205
				
				
				
				
				
				
				
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
    WHERE SC.STUDENT_ID = 2105138
)
AND C.COURSE_ID / 1000 = (
    SELECT D.DEPARTMENT_ID
    FROM STUDENT S
    JOIN DEPARTMENT D ON D.DEPARTMENT_ID = S.DEPARTMENT_ID
    WHERE S.STUDENT_ID = 2105138
);


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
    WHERE SC.STUDENT_ID = 2105138
)
AND C.COURSE_ID / 1000 = (
    SELECT D.DEPARTMENT_ID
    FROM STUDENT S
    JOIN DEPARTMENT D ON D.DEPARTMENT_ID = S.DEPARTMENT_ID
    WHERE S.STUDENT_ID = 2105138
)
AND (C.COURSE_ID/100)%10 = (
    SELECT S.LEVEL
    FROM STUDENT S
    WHERE S.STUDENT_ID = 2105138
);


SELECT
    SA.STUDENT_ID,
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
        (SA.ATTENDENCES_MARK ) +
        ((SA.ASSIGNMENT1_MARK + SA.ASSIGNMENT2_MARK) / 2 ) +
        (SA.PROJECT_MARK /2.5)
    ) AS TOTAL_MARK
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
    COURSE C ON C.COURSE_ID = SA.COURSE_ID;



SELECT
    SA.STUDENT_ID,
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
    COURSE C ON C.COURSE_ID = SA.COURSE_ID
	WHERE SA.STUDENT_ID=2105138;
		
WITH StudentCGPA AS (
SELECT
    SA.STUDENT_ID,
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
    COURSE C ON C.COURSE_ID = SA.COURSE_ID

)
SELECT
    STUDENT_ID,
    SUM(credit * CGPA) / SUM(credit) AS TOTAL_CGPA
FROM
    StudentCGPA
	WHERE STUDENT_ID=2105129
GROUP BY
    STUDENT_ID
