-- Create the trigger function to convert data to uppercase
CREATE OR REPLACE FUNCTION uppercase_student_data()
RETURNS TRIGGER AS $$
BEGIN
    NEW.name := UPPER(NEW.name);
    NEW.address := UPPER(NEW.address);
    NEW.phone_number := UPPER(NEW.phone_number);
    NEW.email := LOWER(NEW.email);
    NEW.bank_account_no := UPPER(NEW.bank_account_no);
    -- Add other fields here if needed
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger to execute the function before each insert operation
CREATE OR REPLACE TRIGGER before_insert_student
BEFORE INSERT ON student
FOR EACH ROW
EXECUTE FUNCTION uppercase_student_data();

-- Create the trigger function to convert data to uppercase characters for the teacher table
CREATE OR REPLACE FUNCTION uppercase_teacher_data()
RETURNS TRIGGER AS $$
BEGIN
    NEW.name := UPPER(NEW.name);
    NEW.address := UPPER(NEW.address);
    NEW.phone_number := UPPER(NEW.phone_number);
    NEW.email := LOWER(NEW.email);
    -- Add other fields here if needed
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger to execute the function before each insert operation
CREATE OR REPLACE TRIGGER before_insert_teacher
BEFORE INSERT ON teacher
FOR EACH ROW
EXECUTE FUNCTION uppercase_teacher_data();

-- Create the trigger function to convert data to uppercase characters for the course table
CREATE OR REPLACE FUNCTION uppercase_course_data()
RETURNS TRIGGER AS $$
BEGIN
    NEW.course_title := UPPER(NEW.course_title);
    -- Add other fields here if needed
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger to execute the function before each insert operation
CREATE OR REPLACE TRIGGER before_insert_course
BEFORE INSERT ON course
FOR EACH ROW
EXECUTE FUNCTION uppercase_course_data();


-- Create the trigger function to convert data to uppercase characters for the department table
CREATE OR REPLACE FUNCTION uppercase_department_data()
RETURNS TRIGGER AS $$
BEGIN
    NEW.name := UPPER(NEW.name);
    -- Add other fields here if needed
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger to execute the function before each insert operation
CREATE OR REPLACE TRIGGER before_insert_department
BEFORE INSERT ON department
FOR EACH ROW
EXECUTE FUNCTION uppercase_department_data();


-- Create the trigger function to convert data to uppercase characters for the lectures table
CREATE OR REPLACE FUNCTION uppercase_assignment_data()
RETURNS TRIGGER AS $$
BEGIN
    NEW.assignment_title := UPPER(NEW.assignment_title);
    -- Add other fields here if needed
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Create the trigger to execute the function before each insert operation
CREATE OR REPLACE TRIGGER before_insert_assignment
BEFORE INSERT ON assignment
FOR EACH ROW
EXECUTE FUNCTION uppercase_assignment_data();



-- Create the trigger function to convert data to uppercase characters for the project table
CREATE OR REPLACE FUNCTION uppercase_project_data()
RETURNS TRIGGER AS $$
BEGIN
    NEW.project_title := UPPER(NEW.project_title);
    -- Add other fields here if needed
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Create the trigger to execute the function before each insert operation
CREATE OR REPLACE TRIGGER before_insert_project
BEFORE INSERT ON project
FOR EACH ROW
EXECUTE FUNCTION uppercase_project_data();



-- Create the trigger function to convert data to uppercase characters for the ct table
CREATE OR REPLACE FUNCTION uppercase_ct_data()
RETURNS TRIGGER AS $$
BEGIN
    NEW.ct_title := UPPER(NEW.ct_title);
    -- Add other fields here if needed
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER before_insert_ct
BEFORE INSERT ON ct
FOR EACH ROW
EXECUTE FUNCTION uppercase_ct_data();


-- Create the trigger function to convert data to uppercase characters for the term_final table
CREATE OR REPLACE FUNCTION uppercase_term_final_data()
RETURNS TRIGGER AS $$
BEGIN
    NEW.time_duration := UPPER(NEW.time_duration);
    -- Add other fields here if needed
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Create the trigger to execute the function before each insert operation
CREATE OR REPLACE TRIGGER before_insert_term_final
BEFORE INSERT ON term_final
FOR EACH ROW
EXECUTE FUNCTION uppercase_term_final_data();

CREATE OR REPLACE FUNCTION before_update_due_amount()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the new DUE_AMOUNT is zero
    IF NEW.DUE_AMOUNT < 0 THEN
        RAISE EXCEPTION 'Due amount cannot be updated to zero.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER before_update_due_amount_trigger
BEFORE UPDATE ON FEES
FOR EACH ROW
EXECUTE FUNCTION before_update_due_amount();

CREATE OR REPLACE FUNCTION before_update_course()
RETURNS TRIGGER AS $$
BEGIN
    -- Extracting individual digits from the COURSE_ID
    DECLARE first_digit INT;
    DECLARE second_digit INT;
    DECLARE third_digit INT;
    DECLARE fourth_digit INT;

    first_digit := NEW.COURSE_ID / 1000;
    second_digit := (NEW.COURSE_ID / 100) % 10;
    third_digit := (NEW.COURSE_ID / 10) % 10;
    fourth_digit := NEW.COURSE_ID % 10;

    -- Check the conditions for each digit
    IF first_digit < 1 OR first_digit > 8 OR
       second_digit < 1 OR second_digit > 4 OR
       third_digit <> 0 OR
       fourth_digit < 1 OR fourth_digit > 9 THEN
        RAISE EXCEPTION 'Invalid COURSE_ID format for update.';
    END IF;

    -- You can add more conditions or checks here based on your requirements

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_update_course_trigger
BEFORE UPDATE ON COURSE
FOR EACH ROW
EXECUTE FUNCTION before_update_course();

CREATE OR REPLACE FUNCTION before_update_teacher()
RETURNS TRIGGER AS $$
BEGIN
    -- Extracting individual digits from the TEACHER_ID
    DECLARE first_digit INT;
    DECLARE second_digit INT;
    DECLARE next_two_digits INT;

    first_digit := NEW.TEACHER_ID / 1000;
    second_digit := (NEW.TEACHER_ID / 100) % 10;
    next_two_digits := NEW.TEACHER_ID % 100;

    -- Check the conditions for each digit
    IF first_digit < 1 OR first_digit > 8 OR
       second_digit <> 0 OR
       next_two_digits < 1 OR next_two_digits > 90 THEN
        RAISE EXCEPTION 'Invalid TEACHER_ID format for update.';
    END IF;

    -- You can add more conditions or checks here based on your requirements

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_update_teacher_trigger
BEFORE UPDATE ON TEACHER
FOR EACH ROW
EXECUTE FUNCTION before_update_teacher();

CREATE OR REPLACE FUNCTION before_update_student()
RETURNS TRIGGER AS $$
BEGIN
    -- Extracting individual digits from the STUDENT_ID
    DECLARE first_two_digits INT;
    DECLARE third_digit INT;
    DECLARE fourth_digit INT;
    DECLARE next_three_digits INT;

    first_two_digits := NEW.STUDENT_ID / 1000000;
    third_digit := (NEW.STUDENT_ID / 100000) % 10;
    fourth_digit := (NEW.STUDENT_ID / 10000) % 10;
    next_three_digits := NEW.STUDENT_ID % 10000;

    -- Check the conditions for each digit
    IF first_two_digits < 19 OR first_two_digits > 22 OR
       third_digit <> 0 OR
       fourth_digit < 1 OR fourth_digit > 8 OR
       next_three_digits < 1 OR next_three_digits > 180 THEN
        RAISE EXCEPTION 'Invalid STUDENT_ID format for update.';
    END IF;

    -- You can add more conditions or checks here based on your requirements

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_update_student_trigger
BEFORE UPDATE ON STUDENT
FOR EACH ROW
EXECUTE FUNCTION before_update_student();

