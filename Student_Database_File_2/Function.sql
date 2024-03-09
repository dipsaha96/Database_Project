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


SELECT insert_student_with_fees_and_supervisor(
    2108031, -- student_id_param
    'John Doe', -- student_name_param
    '123 Main Street', -- student_address_param
    '1234567890', -- phone_number_param
    '2000-01-01', -- date_of_birth_param
    'john.doe@example.com', -- email_param
    '12345678901234567890' -- bank_account_no_param
)
