CREATE DATABASE IF NOT EXISTS p11_job_portal;
USE p11_job_portal;
SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `role`;

DROP TABLE IF EXISTS `user`;

DROP TABLE IF EXISTS `candidate_profile`;

DROP TABLE IF EXISTS `resume`;

DROP TABLE IF EXISTS `skill_table`;

DROP TABLE IF EXISTS `candidate_skills`;

DROP TABLE IF EXISTS `candidate_project`;

DROP TABLE IF EXISTS `candidate_education`;

DROP TABLE IF EXISTS `experience`;

DROP TABLE IF EXISTS `certification`;

DROP TABLE IF EXISTS `employer_profile`;

DROP TABLE IF EXISTS `job`;

DROP TABLE IF EXISTS `job_application`;

DROP TABLE IF EXISTS `message`;

DROP TABLE IF EXISTS `job_status`;

DROP TABLE IF EXISTS `state`;

DROP TABLE IF EXISTS `city`;
CREATE TABLE `role` (
  `rid` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `rname` VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;
CREATE TABLE `user` (
  `uid` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `rid` INT(11) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `phone` VARCHAR(15) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255),
  `city` INT(50) NOT NULL,
  `state` INT(50) NOT NULL,
  `country` VARCHAR(50) NOT NULL,
  `image` VARCHAR(255),
  `status` ENUM('Active','Inactive'),
  `createdat` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE `candidate_profile` (
  `cid` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `uid` INT(11) UNIQUE,
  `gender` ENUM('Male','Female','Other') NOT NULL,
  `dob` DATE NOT NULL,
  `experience` DECIMAL(4,1) DEFAULT 0,
  `current_salary` DECIMAL(10,2),
  `expected_salary` DECIMAL(10,2),
  `summary` TEXT
) ENGINE=InnoDB;
CREATE TABLE `resume` (
  `resume_id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `cid` INT(11),
  `summary` TEXT,
  `file` VARCHAR(255) NOT NULL,
  `isDefault` BOOLEAN DEFAULT FALSE,
  `updatedat` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE `skill_table` (
  `skillid` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `skillname` VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;
CREATE TABLE `candidate_skills` (
  `csid` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `cid` INT(11),
  `skillid` INT(11),
  `proficiency` VARCHAR(30) NOT NULL
) ENGINE=InnoDB;
CREATE TABLE `candidate_project` (
  `cpid` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `cid` INT(11),
  `project_title` VARCHAR(150) NOT NULL,
  `description` TEXT,
  `project_url` VARCHAR(255),
  `start_date` DATE NOT NULL,
  `end_date` DATE
) ENGINE=InnoDB;
CREATE TABLE `candidate_education` (
  `ceid` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `cid` INT(11),
  `education_type` VARCHAR(50) NOT NULL,
  `specialization` VARCHAR(100),
  `passing_year` YEAR(4) NOT NULL,
  `university_name` VARCHAR(150) NOT NULL,
  `course_type` ENUM('Full','Part','Online') NOT NULL,
  `grade` DECIMAL(5,2),
  `duration` VARCHAR(30)
) ENGINE=InnoDB;
CREATE TABLE `experience` (
  `exp_id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `cid` INT(11),
  `company_name` VARCHAR(150) NOT NULL,
  `designation` VARCHAR(100) NOT NULL,
  `status` VARCHAR(30) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE,
  `salary` DECIMAL(10,2),
  `description` TEXT
) ENGINE=InnoDB;
CREATE TABLE `certification` (
  `certi_id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `cid` INT(11),
  `name` VARCHAR(150) NOT NULL,
  `issued_by` VARCHAR(150) NOT NULL,
  `issue_date` DATE NOT NULL,
  `expiry_date` DATE,
  `duration` INT(11),
  `image` VARCHAR(255)
) ENGINE=InnoDB;
CREATE TABLE `employer_profile` (
  `emp_id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `uid` INT(11),
  `company_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `address` VARCHAR(255),
  `city` INT(50) NOT NULL,
  `state` INT(50) NOT NULL,
  `country` VARCHAR(50) NOT NULL,
  `registration_id` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT,
  `industry` VARCHAR(100) NOT NULL
) ENGINE=InnoDB;
CREATE TABLE `job` (
  `job_id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `emp_id` INT(11),
  `title` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,
  `role` VARCHAR(100) NOT NULL,
  `experience` DECIMAL(4,1),
  `salary` DECIMAL(10,2),
  `location` VARCHAR(100) NOT NULL,
  `state` INT(11),
  `city` INT(11),
  `type` ENUM('FT','PT','Intern','Contract','Remote') NOT NULL,
  `posted_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `closed_date` DATETIME,
  `status` ENUM('Open','Closed','Draft')
) ENGINE=InnoDB;
CREATE TABLE `job_application` (
  `application_id` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `job_id` INT(11),
  `cid` INT(11),
  `resume_id` INT(11),
  `application_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `status` INT(11)
) ENGINE=InnoDB;
CREATE TABLE `message` (
  `msgid` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `sender_id` INT(11),
  `receiver_id` INT(11),
  `datetime` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `text_message` TEXT NOT NULL
) ENGINE=InnoDB;
CREATE TABLE `job_status` (
  `jsid` INT(11) PRIMARY KEY,
  `status` VARCHAR(50)
) ENGINE=InnoDB;
CREATE TABLE `state` (
  `sid` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `sname` VARCHAR(100)
) ENGINE=InnoDB;
CREATE TABLE `city` (
  `cid` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `cname` VARCHAR(100),
  `sid` INT(11)
) ENGINE=InnoDB;
ALTER TABLE `user` ADD CONSTRAINT `fk_user_rid` FOREIGN KEY (`rid`) REFERENCES `role`(`rid`);
ALTER TABLE `user` ADD CONSTRAINT `fk_user_city` FOREIGN KEY (`city`) REFERENCES `city`(`cid`);
ALTER TABLE `user` ADD CONSTRAINT `fk_user_state` FOREIGN KEY (`state`) REFERENCES `state`(`sid`);
ALTER TABLE `candidate_profile` ADD CONSTRAINT `fk_candidate_profile_uid` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`);
ALTER TABLE `resume` ADD CONSTRAINT `fk_resume_cid` FOREIGN KEY (`cid`) REFERENCES `candidate_profile`(`cid`);
ALTER TABLE `candidate_skills` ADD CONSTRAINT `fk_candidate_skills_cid` FOREIGN KEY (`cid`) REFERENCES `candidate_profile`(`cid`);
ALTER TABLE `candidate_skills` ADD CONSTRAINT `fk_candidate_skills_skillid` FOREIGN KEY (`skillid`) REFERENCES `skill_table`(`skillid`);
ALTER TABLE `candidate_project` ADD CONSTRAINT `fk_candidate_project_cid` FOREIGN KEY (`cid`) REFERENCES `candidate_profile`(`cid`);
ALTER TABLE `candidate_education` ADD CONSTRAINT `fk_candidate_education_cid` FOREIGN KEY (`cid`) REFERENCES `candidate_profile`(`cid`);
ALTER TABLE `experience` ADD CONSTRAINT `fk_experience_cid` FOREIGN KEY (`cid`) REFERENCES `candidate_profile`(`cid`);
ALTER TABLE `certification` ADD CONSTRAINT `fk_certification_cid` FOREIGN KEY (`cid`) REFERENCES `candidate_profile`(`cid`);
ALTER TABLE `employer_profile` ADD CONSTRAINT `fk_employer_profile_uid` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`);
ALTER TABLE `employer_profile` ADD CONSTRAINT `fk_employer_profile_city` FOREIGN KEY (`city`) REFERENCES `city`(`cid`);
ALTER TABLE `employer_profile` ADD CONSTRAINT `fk_employer_profile_state` FOREIGN KEY (`state`) REFERENCES `state`(`sid`);
ALTER TABLE `job` ADD CONSTRAINT `fk_job_emp_id` FOREIGN KEY (`emp_id`) REFERENCES `employer_profile`(`emp_id`);
ALTER TABLE `job` ADD CONSTRAINT `fk_job_state` FOREIGN KEY (`state`) REFERENCES `state`(`sid`);
ALTER TABLE `job` ADD CONSTRAINT `fk_job_city` FOREIGN KEY (`city`) REFERENCES `city`(`cid`);
ALTER TABLE `job_application` ADD CONSTRAINT `fk_job_application_job_id` FOREIGN KEY (`job_id`) REFERENCES `job`(`job_id`);
ALTER TABLE `job_application` ADD CONSTRAINT `fk_job_application_cid` FOREIGN KEY (`cid`) REFERENCES `candidate_profile`(`cid`);
ALTER TABLE `job_application` ADD CONSTRAINT `fk_job_application_resume_id` FOREIGN KEY (`resume_id`) REFERENCES `resume`(`resume_id`);
ALTER TABLE `job_application` ADD CONSTRAINT `fk_job_application_status` FOREIGN KEY (`status`) REFERENCES `job_status`(`jsid`);
ALTER TABLE `message` ADD CONSTRAINT `fk_message_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `user`(`uid`);
ALTER TABLE `message` ADD CONSTRAINT `fk_message_receiver_id` FOREIGN KEY (`receiver_id`) REFERENCES `user`(`uid`);
ALTER TABLE `city` ADD CONSTRAINT `fk_city_sid` FOREIGN KEY (`sid`) REFERENCES `state`(`sid`);
SET FOREIGN_KEY_CHECKS=1;