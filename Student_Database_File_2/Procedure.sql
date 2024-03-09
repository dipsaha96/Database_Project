CREATE OR REPLACE PROCEDURE update_student_info(
    student_id_param INT,
    parameter_param VARCHAR(100),
    updated_value_param VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF parameter_param = 'name' THEN
        UPDATE student SET name = updated_value_param WHERE student_id = student_id_param;
    ELSIF parameter_param = 'address' THEN
        UPDATE student SET address = updated_value_param WHERE student_id = student_id_param;
    ELSIF parameter_param = 'bankAccountNo' THEN
        UPDATE student SET bank_account_no = updated_value_param WHERE student_id = student_id_param;
    ELSE
        RAISE EXCEPTION 'Invalid parameter';
    END IF;
END;
$$;


-- CREATE OR REPLACE PROCEDURE update_course(
--     courseId INT,
--     parameter VARCHAR(255),
--     updatedValue VARCHAR(255)
-- )
-- LANGUAGE plpgsql
-- AS $$
-- BEGIN
--     IF parameter = 'COURSE_TITLE' THEN
--         UPDATE COURSE SET COURSE_TITLE = updatedValue WHERE COURSE_ID = courseId;
--     ELSIF parameter = 'START_TIME' THEN
--         UPDATE COURSE SET START_TIME = updatedValue::DATE WHERE COURSE_ID = courseId;
--     ELSIF parameter = 'END_TIME' THEN
--         UPDATE COURSE SET END_TIME = updatedValue::DATE WHERE COURSE_ID = courseId;
--     ELSIF parameter = 'TOTAL_LECTURES' THEN
--         UPDATE COURSE SET TOTAL_LECTURES = updatedValue::INT WHERE COURSE_ID = courseId;
--     ELSIF parameter = 'credit' THEN
--         UPDATE COURSE SET CREDIT = updatedValue::INT WHERE COURSE_ID = courseId;
--     ELSE
--         RAISE EXCEPTION 'Invalid parameter';
--     END IF;
    
--     IF FOUND THEN
--         RAISE NOTICE 'Course updated successfully';
--     ELSE
--         RAISE EXCEPTION 'Course not found';
--     END IF;
-- END;
-- $$;


CREATE OR REPLACE PROCEDURE update_course_info(
    course_id_param INT,
    parameter_param VARCHAR(100),
    updated_value_param VARCHAR(255)
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF parameter_param = 'courseTitle' THEN
        UPDATE course SET course_title = updated_value_param WHERE course_id = course_id_param;
    ELSIF parameter_param = 'startTime' THEN
        UPDATE course SET start_time = updated_value_param::DATE WHERE course_id = course_id_param;
    ELSIF parameter_param = 'endTime' THEN
        UPDATE course SET end_time = updated_value_param::DATE WHERE course_id = course_id_param;
    ELSIF parameter_param = 'totalLectures' THEN
        UPDATE course SET total_lectures = updated_value_param::INT WHERE course_id = course_id_param;
    ELSIF parameter_param = 'credit' THEN
        UPDATE course SET credit = updated_value_param::INT WHERE course_id = course_id_param;
    ELSE
        RAISE EXCEPTION 'Invalid parameter';
    END IF;
END;
$$;

