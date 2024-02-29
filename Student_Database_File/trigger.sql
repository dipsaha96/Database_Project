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
CREATE TRIGGER before_insert_student
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
CREATE TRIGGER before_insert_teacher
BEFORE INSERT ON teacher
FOR EACH ROW
EXECUTE FUNCTION uppercase_student_data();


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
CREATE TRIGGER before_insert_course
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
CREATE TRIGGER before_insert_department
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
CREATE TRIGGER before_insert_assignment
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
CREATE TRIGGER before_insert_project
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

CREATE TRIGGER before_insert_ct
BEFORE INSERT ON ct
FOR EACH ROW
EXECUTE FUNCTION uppercase_ct_data();


-- Create the trigger function to convert data to uppercase characters for the term_final table
CREATE OR REPLACE FUNCTION uppercase_term_final_data()
RETURNS TRIGGER AS $$
BEGIN
    NEW.time_duaration := UPPER(NEW.time_duration);
    -- Add other fields here if needed
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- Create the trigger to execute the function before each insert operation
CREATE TRIGGER before_insert_term_final
BEFORE INSERT ON term_final
FOR EACH ROW
EXECUTE FUNCTION uppercase_term_final_data();

