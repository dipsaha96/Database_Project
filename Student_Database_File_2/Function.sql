CREATE OR REPLACE FUNCTION insert_student_with_fees_and_supervisor(
    student_id_param INT,
    student_name_param VARCHAR(100),
    student_address_param VARCHAR(255),
    phone_number_param VARCHAR(15),
    date_of_birth_param DATE,
    email_param VARCHAR(100),
    bank_account_no_param VARCHAR(20)
)
RETURNS VOID AS $$
BEGIN
    -- Insert into STUDENT table
    INSERT INTO STUDENT (STUDENT_ID, NAME, ADDRESS, PHONE_NUMBER, DATE_OF_BIRTH, LEVEL, TERM, EMAIL, BANK_ACCOUNT_NO,DEPARTMENT_ID)
    VALUES (student_id_param, student_name_param, student_address_param, phone_number_param, date_of_birth_param,((((student_id_param)/100000))-23)*(-1), 1 ,email_param,bank_account_no_param,(((student_id_param)/1000))%10);

    -- Insert into FEES table
    INSERT INTO FEES (STUDENT_ID, DINING_FEE, HALL_FEE, REGISTRATION_FEE, DUE_AMOUNT)
    VALUES (student_id_param, 3000, 2150, 200, 5350);

    -- Insert into SUPER_VISOR table
    INSERT INTO SUPER_VISOR (STUDENT_ID, TEACHER_ID) VALUES (student_id_param, ((((student_id_param)/1000)%10)*1000+1));
END;
$$ LANGUAGE plpgsql;

--insert course with teacher and details
CREATE OR REPLACE FUNCTION insert_course_with_teacher_and_details(
    course_id_param INT,
    course_title_param VARCHAR(255),
    start_time_param DATE,
    end_time_param DATE,
    total_lectures_param INT,
    credit_param INT
)
RETURNS VOID AS $$
BEGIN
    -- Insert into COURSE table
    INSERT INTO COURSE (COURSE_ID, COURSE_TITLE, START_TIME, END_TIME, TOTAL_LECTURES, CREDIT)
    VALUES (course_id_param, course_title_param, start_time_param, end_time_param, total_lectures_param, credit_param);

	
	INSERT INTO CT (CT_ID,CT_TITLE,EXAM_DATE, START_TIME, ENDING_TIME)
	VALUES
	(course_id_param*100+11,course_title_param||' '||'CT1', end_time_param, '9:00', '10:30'),
	(course_id_param*100+12,course_title_param||' '||'CT2', end_time_param, '9:00', '10:30');
	
	INSERT INTO ASSIGNMENT (ASSIGNMENT_ID, ASSIGNMENT_TITLE, SUBMISSION_DATE)
	VALUES
	(course_id_param*100+1,course_title_param||' '||'Assignment1', end_time_param),
	(course_id_param*100+2,course_title_param||' '||'Assignment2', end_time_param);
	
	INSERT INTO PROJECT (PROJECT_ID, PROJECT_TITLE, SUBMISSION_DATE)
 	VALUES
	(course_id_param*100+21,course_title_param||' '||'Project', end_time_param);
	
	INSERT INTO TERM_FINAL (TERM_FINAL_ID, EXAM_DATE, START_TIME, TIME_DURATION)
	VALUES
    (course_id_param*100+51, end_time_param, '09:00:00', '3 hours');
	
	INSERT INTO COURSE_DETAILS (COURSE_ID, TEACHER_ID, ASSIGNMENT1_ID, ASSIGNMENT2_ID, PROJECT_ID, CT1_ID, CT2_ID, TERM_FINAL_ID)
    VALUES
	(course_id_param, (course_id_param/1000)*1000+1, course_id_param*100+1, course_id_param*100+2, course_id_param*100+21, course_id_param*100+11, course_id_param*100+12, course_id_param*100+51);
	
END;
$$ LANGUAGE plpgsql;

--CALCULATE CGPA
CREATE OR REPLACE FUNCTION calculate_cgpa(student_id_param INT)
RETURNS DECIMAL AS $$
DECLARE
    total_cgpa DECIMAL(10,2);
BEGIN
    SELECT
        SUM(credit * CGPA) / SUM(credit)
    INTO
        total_cgpa
    FROM (
        SELECT
            SA.STUDENT_ID,
            C.credit,
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
                (SA.PROJECT_MARK / 2.5) >= 70 THEN 3.5
                WHEN 
                (SA.TERM_FINAL_MARK * 0.5) +
                ((SA.CT1_MARK + SA.CT2_MARK) / 4) +
                (SA.ATTENDENCES_MARK) +
                ((SA.ASSIGNMENT1_MARK + SA.ASSIGNMENT2_MARK) / 2) +
                (SA.PROJECT_MARK / 2.5) >= 60 THEN 3.0
                WHEN 
                (SA.TERM_FINAL_MARK * 0.5) +
                ((SA.CT1_MARK + SA.CT2_MARK) / 4) +
                (SA.ATTENDENCES_MARK) +
                ((SA.ASSIGNMENT1_MARK + SA.ASSIGNMENT2_MARK) / 2) +
                (SA.PROJECT_MARK / 2.5) >= 50 THEN 2.5
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
        WHERE
            SA.STUDENT_ID = student_id_param
    ) AS StudentCGPA;

    RETURN total_cgpa;
END;
$$ LANGUAGE plpgsql;




