-- Sample realistic data for Job Portal

USE p11_job_portal;

INSERT INTO role (rname) VALUES
('Admin'),('Employer'),('Candidate');

INSERT INTO job_status (jsid,status) VALUES
(1,'Applied'),
(2,'Under Review'),
(3,'Shortlisted'),
(4,'Interview Scheduled'),
(5,'Selected'),
(6,'Rejected');

INSERT INTO state (sname) VALUES
('Maharashtra'),('Karnataka'),('Delhi');

INSERT INTO city (cname,sid) VALUES
('Pune',1),('Mumbai',1),('Bengaluru',2),('New Delhi',3);

INSERT INTO user
(rid, name, email, phone, password, address, city, state, country)
VALUES
(1,'System Admin','admin@jobportal.com','9000000001','admin123','Wagholi',1,1,'India'),
(2,'TechNova Pvt Ltd','hr@technova.com','9000000002','emp123','Hinjewadi', 1,1,'India'),
(2,'CodeCraft Solutions','careers@codecraft.com','9000000003','emp123','Baner', 1,1,'India'),
(3,'Vedant Argade','vedant.argade@gmail.com','9000000004','cand123','Hadapsar',1,1,'India'),
(3,'Rahul Sharma','rahul.sharma@gmail.com','9000000005','cand123','Uruli Kanchan',1,1,'India');

INSERT INTO employer_profile (uid,company_name,email,address,city,state,country,registration_id,industry) VALUES
(2,'TechNova Pvt Ltd','hr@technova.com','Hinjewadi Phase 2',1,1,'India',1,'IT'),
(3,'CodeCraft Solutions','careers@codecraft.com','Baner Road',1,1,'India',2,'IT');

INSERT INTO candidate_profile (uid,gender,dob,experience,current_salary,expected_salary) VALUES
(4,'Male','2001-05-20',1.2,450000,700000),
(5,'Male','1999-08-15',3.0,650000,900000);

INSERT INTO resume (cid,summary,file,isDefault) VALUES
(1,'Java Full Stack Developer','resume/vedant.pdf',1),
(2,'MERN Stack Developer','resume/rahul.pdf',1);

INSERT INTO skill_table (skillname) VALUES
('Java'),('Spring Boot'),('Hibernate'),('MySQL'),('React'),('Node.js'),('Docker'),('Git');

INSERT INTO candidate_skills (cid,skillid,proficiency) VALUES
(1,1,'Advanced'),
(1,2,'Advanced'),
(1,3,'Intermediate'),
(1,4,'Advanced'),
(2,5,'Advanced'),
(2,6,'Advanced'),
(2,7,'Intermediate');

INSERT INTO candidate_project (cid,project_title,description,project_url,start_date,end_date) VALUES
(1,'Job Portal','Recruitment platform','https://github.com/example/jobportal','2025-01-01','2025-06-01'),
(2,'E-Commerce App','Online shopping platform','https://github.com/example/ecommerce','2024-01-01','2024-08-01');

INSERT INTO candidate_education (cid,education_type,specialization,passing_year,university_name,course_type) VALUES
(1,'MCA','Computer Applications',2024,'Savitribai Phule Pune University','Full'),
(2,'B.Tech','Information Technology',2022,'Mumbai University','Full');

INSERT INTO experience (cid,company_name,designation,status,start_date,end_date) VALUES
(1,'ABC Technologies','Java Developer','Current','2025-01-15',NULL),
(2,'XYZ Solutions','Full Stack Developer','Previous','2022-07-01','2025-03-31');

INSERT INTO certification (cid,name,issued_by,issue_date,expiry_date,duration) VALUES
(1,'Oracle Java SE','Oracle','2025-02-15',NULL,0),
(2,'AWS Cloud Practitioner','AWS','2024-09-10',NULL,0);

INSERT INTO job (emp_id,title,description,role,experience,salary,location,type) VALUES
(1,'Java Developer','Spring Boot and Hibernate Developer','Backend Developer',1.0,700000,'Pune',1),
(2,'MERN Stack Developer','React and Node.js Developer','Full Stack Developer',2.0,900000,'Mumbai',2);

INSERT INTO job_application (job_id,cid,resume_id,status) VALUES
(1,1,1,1),
(2,2,2,3);

INSERT INTO message (sender_id,receiver_id,text_message) VALUES
(2,4,'Your profile has been shortlisted.'),
(4,2,'Thank you. Looking forward to the interview.');
