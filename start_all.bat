@echo off
title Start Job Portal Microservices
echo ========================================
echo Starting Job Portal Microservices...
echo ========================================

echo 1/6. Starting Eureka Discovery Server on port 8761...
start "Eureka Server" /min cmd /c "mvn spring-boot:run -f backend/eureka-server/pom.xml > eureka-server.log 2>&1"
timeout /t 12 /nobreak

echo 2/6. Starting Authentication Service on port 8081...
start "Authentication Service" /min cmd /c "mvn spring-boot:run -f backend/authentication-service/pom.xml > authentication-service.log 2>&1"

echo 3/6. Starting Candidate Profile Service on port 8082...
start "Candidate Profile" /min cmd /c "mvn spring-boot:run -f backend/candidate-profile-service/pom.xml > candidate-profile-service.log 2>&1"

echo 4/6. Starting Employer Profile Service on port 8085...
start "Employer Profile" /min cmd /c "mvn spring-boot:run -f backend/employer-profile-service/pom.xml > employer-profile-service.log 2>&1"

echo 5/6. Starting Job Application Service on port 8083...
start "Job Application" /min cmd /c "mvn spring-boot:run -f backend/job-application-service/pom.xml > job-application-service.log 2>&1"

timeout /t 8 /nobreak

echo 6/6. Starting API Gateway on port 8080...
start "API Gateway" /min cmd /c "mvn spring-boot:run -f backend/ApiGateway/pom.xml > api-gateway.log 2>&1"

echo ========================================
echo All microservices are starting up!
echo Log files (*.log) are created in this folder.
echo Eureka console: http://localhost:8761
echo ========================================
timeout /t 5