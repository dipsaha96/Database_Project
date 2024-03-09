
DROP TABLE DEPARTMENT
CREATE TABLE DEPARTMENT (
    DEPARTMENT_ID INT PRIMARY KEY,
    NAME VARCHAR(50)
);

--DROP TABLE STUDENT
CREATE TABLE STUDENT (
    STUDENT_ID INT PRIMARY KEY,
    NAME VARCHAR(100),
    ADDRESS VARCHAR(255),
    PHONE_NUMBER VARCHAR(15),
    DATE_OF_BIRTH DATE,
    LEVEL INT,
    TERM INT,
    EMAIL VARCHAR(100),
    BANK_ACCOUNT_NO VARCHAR(20),
    DEPARTMENT_ID INT,
    FOREIGN KEY (DEPARTMENT_ID) REFERENCES DEPARTMENT(DEPARTMENT_ID) ON DELETE CASCADE
);

--DROP TABLE TEACHER
CREATE TABLE TEACHER (
    TEACHER_ID INT PRIMARY KEY,
    PHONE_NUMBER VARCHAR(15),
    EMAIL VARCHAR(100),
    ADDRESS VARCHAR(255),
    NAME VARCHAR(100),
    DEPARTMENT_ID INT,
    FOREIGN KEY (DEPARTMENT_ID) REFERENCES DEPARTMENT(DEPARTMENT_ID) ON DELETE CASCADE
);

--DROP TABLE COURSE
CREATE TABLE COURSE (
    COURSE_ID INT PRIMARY KEY,
    COURSE_TITLE VARCHAR(255),
    START_TIME DATE,
    END_TIME DATE,
    TOTAL_LECTURES INT,
    CREDIT INT
);

--DROP TABLE LECTURES
CREATE TABLE LECTURES (
    LECTURE_ID INT,
    LECTURE_TITLE VARCHAR(255),
    COURSE_ID INT,
	PRIMARY KEY(LECTURE_ID,COURSE_ID),
    FOREIGN KEY (COURSE_ID) REFERENCES COURSE(COURSE_ID) ON DELETE CASCADE
);
--DROP TABLE ATTENDANCES
CREATE TABLE ATTENDENCES (
    STUDENT_ID INT,
    NUMBER_OF_PRESENT_ATTENDANCE INT,
    LECTURE_ID INT,
    PRIMARY KEY (STUDENT_ID, LECTURE_ID),
    FOREIGN KEY (STUDENT_ID) REFERENCES STUDENT(STUDENT_ID) ON DELETE CASCADE,
    FOREIGN KEY (LECTURE_ID) REFERENCES LECTURES(LECTURE_ID) ON DELETE CASCADE
);
--DROP TABLE CT
CREATE TABLE CT (
    CT_ID INT PRIMARY KEY,
    CT_TITLE VARCHAR(255),
    EXAM_DATE DATE,
    START_TIME TIME,
    ENDING_TIME TIME
);
--DROP TABLE TERM_FINAL
CREATE TABLE TERM_FINAL (
    TERM_FINAL_ID INT PRIMARY KEY,
    EXAM_DATE DATE,
    START_TIME TIME,
    TIME_DURATION VARCHAR(255)
);
--DROP TABLE PROJECT
CREATE TABLE PROJECT (
    PROJECT_ID INT PRIMARY KEY,
    PROJECT_TITLE VARCHAR(255),
	SUBMISSION_DATE DATE
);
--DROP TABLE ASSIGNMENT
CREATE TABLE ASSIGNMENT (
    ASSIGNMENT_ID INT PRIMARY KEY,
    ASSIGNMENT_TITLE VARCHAR(100),
    SUBMISSION_DATE DATE
);
--DROP TABLE PAYMENT
CREATE TABLE PAYMENT (
    FEES_ID INT,
    PAYMENT_ID INT PRIMARY KEY,
    AMOUNT DECIMAL(10, 2),
    BANK_ACCOUNT_NO VARCHAR(20)
);
--DROP TABLE GRADE
CREATE TABLE GRADE (
    GRADE_ID INT PRIMARY KEY,
    STUDENT_ID INT,
    CGPA FLOAT,
    FOREIGN KEY (STUDENT_ID) REFERENCES STUDENT(STUDENT_ID) ON DELETE CASCADE
);

--DROP TABLE FEES
CREATE TABLE FEES (
    FEES_ID SERIAL ,
	STUDENT_ID INT PRIMARY KEY,
    DINING_FEE DECIMAL(10, 2),
    HALL_FEE DECIMAL(10, 2),
    REGISTRATION_FEE DECIMAL(10, 2),
    DUE_AMOUNT DECIMAL(10, 2),
    FOREIGN KEY (STUDENT_ID) REFERENCES STUDENT(STUDENT_ID) ON DELETE CASCADE
);

CREATE TABLE USERS(
	USER_ID INT PRIMARY KEY,
	PASSWORD VARCHAR(50)
);

CREATE TABLE ADMIN(
	USER_ID INT PRIMARY KEY,
	PASSWORD VARCHAR(50)
);
--DROP TABLE STUDENT_COURSE
CREATE TABLE STUDENT_COURSE (
STUDENT_ID INT,
TEACHER_ID INT,
COURSE_ID INT ,
PRIMARY KEY(STUDENT_ID,COURSE_ID)  ,
FOREIGN KEY (STUDENT_ID ) REFERENCES STUDENT (STUDENT_ID) ON DELETE CASCADE,
FOREIGN KEY (TEACHER_ID) REFERENCES  TEACHER (TEACHER_ID) ON DELETE CASCADE,
FOREIGN KEY (COURSE_ID ) REFERENCES COURSE(COURSE_ID) ON DELETE CASCADE
)
--DROP TABLE STUDENT_ALL
CREATE TABLE STUDENT_ALL(
STUDENT_ID INT,
COURSE_ID INT ,
ASSIGNMENT1_ID INT,
ASSIGNMENT2_ID INT,
PROJECT_ID INT,
CT1_ID INT,
CT2_ID INT,
TERM_FINAL_ID INT,
ASSIGNMENT1_MARK INT,
ASSIGNMENT2_MARK INT,
PROJECT_MARK INT,
CT1_MARK INT,
CT2_MARK INT,
TERM_FINAL_MARK INT,
ATTENDENCES_MARK INT,
PRIMARY KEY(STUDENT_ID,COURSE_ID) ,
FOREIGN KEY (STUDENT_ID ) REFERENCES STUDENT (STUDENT_ID) ON DELETE CASCADE,
FOREIGN KEY (COURSE_ID ) REFERENCES COURSE(COURSE_ID) ON DELETE CASCADE,
FOREIGN KEY (ASSIGNMENT1_ID ) REFERENCES ASSIGNMENT(ASSIGNMENT_ID) ON DELETE CASCADE,
FOREIGN KEY (ASSIGNMENT2_ID ) REFERENCES ASSIGNMENT(ASSIGNMENT_ID) ON DELETE CASCADE,
FOREIGN KEY (PROJECT_ID ) REFERENCES PROJECT(PROJECT_ID) ON DELETE CASCADE,
FOREIGN KEY (CT1_ID ) REFERENCES CT(CT_ID) ON DELETE CASCADE,
FOREIGN KEY (CT2_ID ) REFERENCES CT(CT_ID) ON DELETE CASCADE,
FOREIGN KEY (TERM_FINAL_ID ) REFERENCES TERM_FINAL(TERM_FINAL_ID)ON DELETE CASCADE
)
--drop table course_details
CREATE TABLE COURSE_DETAILS(
COURSE_ID INT PRIMARY KEY ,
ASSIGNMENT1_ID INT,
ASSIGNMENT2_ID INT,
PROJECT_ID INT,
CT1_ID INT,
CT2_ID INT,
TERM_FINAL_ID INT,
TEACHER_ID INT,
FOREIGN KEY (COURSE_ID ) REFERENCES COURSE(COURSE_ID) ON DELETE CASCADE,
FOREIGN KEY (ASSIGNMENT1_ID ) REFERENCES ASSIGNMENT(ASSIGNMENT_ID) ON DELETE CASCADE,
FOREIGN KEY (ASSIGNMENT2_ID ) REFERENCES ASSIGNMENT(ASSIGNMENT_ID) ON DELETE CASCADE,
FOREIGN KEY (PROJECT_ID ) REFERENCES PROJECT(PROJECT_ID) ON DELETE CASCADE,
FOREIGN KEY (CT1_ID ) REFERENCES CT(CT_ID) ON DELETE CASCADE,
FOREIGN KEY (CT2_ID ) REFERENCES CT(CT_ID) ON DELETE CASCADE,
FOREIGN KEY (TERM_FINAL_ID ) REFERENCES TERM_FINAL(TERM_FINAL_ID)ON DELETE CASCADE,
FOREIGN KEY (TEACHER_ID ) REFERENCES TEACHER(TEACHER_ID)ON DELETE CASCADE
)

CREATE TABLE SUPER_VISOR (

    STUDENT_ID INT,
    TEACHER_ID INT,
    PRIMARY KEY (STUDENT_ID, TEACHER_ID),
    FOREIGN KEY (STUDENT_ID) REFERENCES STUDENT(STUDENT_ID) ON DELETE CASCADE,
    FOREIGN KEY (TEACHER_ID) REFERENCES TEACHER(TEACHER_ID) ON DELETE CASCADE
);

CREATE TABLE STUDENT_GRADE (
    STUDENT_ID INT,
    COURSE_ID INT,
    GRADE_ID INT,
    PRIMARY KEY (STUDENT_ID, COURSE_ID),
    FOREIGN KEY (STUDENT_ID) REFERENCES STUDENT(STUDENT_ID) ON DELETE CASCADE,
    FOREIGN KEY (COURSE_ID) REFERENCES COURSE(COURSE_ID) ON DELETE CASCADE,
    FOREIGN KEY (GRADE_ID) REFERENCES GRADE(GRADE_ID) ON DELETE CASCADE
);



