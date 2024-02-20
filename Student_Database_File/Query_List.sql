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
	
	