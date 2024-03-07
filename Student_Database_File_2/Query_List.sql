select *
from admin
--TO SEE FULL STUDENT LIST
SELECT STUDENT_ID AS STUDENT_ID,
NAME AS FULL_NAME,
EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.DATE_OF_BIRTH) AS AGE,
ADDRESS AS ADDRESS,
LEVEL AS LEVEL,
TERM AS TERM
FROM STUDENT P;

--TO SEE FULL TEACHER LIST
SELECT T.TEACHER_ID,
       T.NAME AS FULL_NAME,
       T.EMAIL,
       T.ADDRESS,
       D.NAME AS DEPARTMENT_NAME,
       T.PHONE_NUMBER
FROM TEACHER T
JOIN DEPARTMENT D ON T.DEPARTMENT_ID = D.DEPARTMENT_ID;

--TO SEE ALL COURSES
SELECT C.COURSE_ID,
	C.COURSE_TITLE,
	D.NAME AS COURSE_BELONGS_TO,
	C.START_TIME,
	C.END_TIME,
	C.TOTAL_LECTURES,
	C.CREDIT
	FROM COURSE C JOIN DEPARTMENT D
	ON D.DEPARTMENT_ID = C.COURSE_ID/1000;
	
--Total teacher per department
    SELECT d.name AS department_name,
	d.department_id,
    COUNT(t.teacher_id) AS total_teachers
FROM
    department d
LEFT JOIN
    teacher t ON d.department_id = t.department_id
GROUP BY
    d.name,d.department_id
HAVING
    COUNT(t.teacher_id) > 0
ORDER BY
    total_teachers DESC;
	
--student per department	
	SELECT
    d.name AS department_name,
    COUNT(s.student_id) AS total_students
FROM
    department d
LEFT JOIN
    student s ON d.department_id = s.department_id
WHERE
    EXTRACT(YEAR FROM s.date_of_birth) > 1985
GROUP BY
    d.name
ORDER BY
    total_students DESC;
--	average level
	WITH DepartmentStudentCounts AS (
    SELECT
        d.department_id,
        d.name AS department_name,
        COUNT(s.student_id) AS total_students
    FROM
        department d
    LEFT JOIN
        student s ON d.department_id = s.department_id
    GROUP BY
        d.department_id, d.name
)

SELECT
    dsc.department_id,
    dsc.department_name,
    dsc.total_students,
    AVG(s.level) AS average_level
FROM
    DepartmentStudentCounts dsc
LEFT JOIN
    student s ON dsc.department_id = s.department_id
WHERE
    s.level > 2
GROUP BY
    dsc.department_id, dsc.department_name, dsc.total_students
HAVING
    AVG(s.term) >= 1
ORDER BY
    average_level DESC, total_students DESC;
--avg email length
	WITH DepartmentTeacherCounts AS (
    SELECT
        d.department_id,
        d.name AS department_name,
        COUNT(t.teacher_id) AS total_teachers
    FROM
        department d
    LEFT JOIN
        teacher t ON d.department_id = t.department_id
    GROUP BY
        d.department_id, d.name
)

SELECT
    dtc.department_id,
    dtc.department_name,
    dtc.total_teachers,
    AVG(LENGTH(t.email)) AS avg_email_length
FROM
    DepartmentTeacherCounts dtc
LEFT JOIN
    teacher t ON dtc.department_id = t.department_id
WHERE
    LENGTH(t.address) > 10
GROUP BY
    dtc.department_id, dtc.department_name, dtc.total_teachers
HAVING
    AVG(LENGTH(t.phone_number)) >= 9
ORDER BY
    avg_email_length DESC, total_teachers DESC;
--departmental teacher & student relationship
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
	
--STUDENT&GRADE

SELECT 
S.STUDENT_ID AS ID,
S.NAME AS STUDENT_NAME,
G.TERM_WISE_RESULT AS RECENT_TERM_CGPA,
G.TOTAL_RESULT AS OVERALL_CGPA
FROM STUDENT S JOIN GRADE G
ON S.STUDENT_ID= G.STUDENT_ID;

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
	--Course details
select
C.COURSE_ID
c.course_title,
a.assignment_title as asignment1_title,
a.submission_date as asignment1_submission_date,
b.assignment_title as assignment2_title,
b.submission_date as assignment2_submission_date,
p.project_title,
p.submission_date as project_submission_date,
ct1.ct_title as ct1_title,
ct1.exam_date as ct1_exam_date,
ct1.START_TIME as ct1_start_time,
ct1.END_TIME as ct1_end_time,
ct2.ct_title as ct2_title,
ct2.exam_date as ct2_exam_date,
ct2.START_TIME as ct2_start_time,
ct2.END_TIME as ct2_end_time,
T.exam_date as term_final_exam_date,
T.START_TIME as term_final_start_time,
T.time_duration as term_final_time


from student_all s
JOIN course c ON s.course_id = c.course_id
JOIN assignment a ON s.assignment1_id = a.assignment_id
JOIN assignment b ON s.assignment2_id = b.assignment_id
JOIN project p ON s.project_id = p.project_id
JOIN ct ct1 ON s.ct1_id = ct1.ct_id
JOIN ct ct2 ON s.ct2_id = ct2.ct_id
JOIN TERM_FINAL T ON T.TERM_FINAL_id = S.TERM_FINAL_id;
WHERE C.COURSE_ID = 5201
GROUP BY C.COURSE_ID,
c.course_title,
a.assignment_title, 
b.assignment_title, 
p.project_title,
ct1.ct_title,
ct2.ct_title;