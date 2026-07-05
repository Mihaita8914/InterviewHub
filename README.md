# 🚀 InterviewHub

InterviewHub is a full-stack interview preparation platform built to help software developers prepare for technical interviews through structured questions, detailed answers, code examples and interactive learning.

The application is currently focused on Java Backend technologies and is designed as a real-world enterprise application using Spring Boot, JWT authentication and PostgreSQL.

---

# 📖 Project Overview

InterviewHub allows users to:

- Browse interview questions
- Search questions by keyword
- Filter questions by category and difficulty
- View only published questions
- Receive random interview questions
- Authenticate using JWT
- Access administration features using role-based authorization

The goal of the project is to become a complete interview preparation platform with quizzes, AI assistance and premium content.

---

# 🛠 Tech Stack

## Backend

- Java 21
- Spring Boot 3
- Spring Data JPA
- Hibernate
- Spring Security
- JWT Authentication
- PostgreSQL
- Bean Validation
- Lombok
- Swagger / OpenAPI

## Frontend (Coming Soon)

- React
- Vite
- Tailwind CSS
- Axios
- React Router

---

# ✅ Current Backend Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- BCrypt Password Encryption
- Current Logged User Endpoint (/me)
- Logout Endpoint

## Authorization

- USER Role
- ADMIN Role
- Protected Endpoints
- JWT Filter
- CustomUserDetailsService

## Questions

- Create Question
- Update Question
- Delete Question
- Get Question by ID
- Get All Questions
- Published Questions
- Random Question
- Search Questions
- Dynamic Filtering
- Pagination
- Sorting

## Architecture

- DTO Pattern
- Mapper Pattern
- Repository Pattern
- Service Layer
- Specification Pattern
- Global Exception Handling
- Validation
- Clean REST API

---

# 📚 API Documentation

Swagger UI is available after starting the backend:

```
http://localhost:8080/swagger-ui/index.html
```

---

# ⚙️ Local Backend Setup

## Requirements

- Java 21
- Maven
- PostgreSQL

---

## Create Database

```sql
CREATE DATABASE interviewhub;
```

---

## Configuration

Create your own **application.properties**

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/interviewhub
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update

jwt.secret=YOUR_SECRET_KEY
jwt.expiration=86400000
```

Example

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/interviewhub
spring.datasource.username=postgres
spring.datasource.password=postgres

spring.jpa.hibernate.ddl-auto=update

jwt.secret=interviewhub-secret-key-for-development-only-change-later-very-long
jwt.expiration=86400000
```

---

## Clone Repository

```bash
git clone https://github.com/yourusername/interviewhub.git
```

---

## Run Backend

```bash
mvn spring-boot:run
```

or directly from IntelliJ IDEA.

---

# 📂 Project Structure

```
src
 ├── controller
 ├── service
 ├── repository
 ├── entity
 ├── dto
 ├── mapper
 ├── specification
 ├── security
 ├── config
 ├── exception
 └── enums
```

---

# 🔐 Security

The application uses:

- JWT Authentication
- BCrypt Password Encryption
- Stateless Sessions
- Spring Security
- Role Based Authorization

Available Roles:

- USER
- ADMIN

---

# 🚧 Roadmap

## Backend

- Refresh Tokens
- Email Verification
- Forgot Password
- Password Reset
- User Profile
- Favorite Questions
- Quiz Engine
- Progress Tracking
- Docker
- Flyway
- Unit Tests
- Integration Tests
- Monitoring

## Frontend

- React
- Responsive UI
- Login
- Register
- Dashboard
- Search
- Categories
- Admin Panel
- Dark Mode

## Future Features

- AI Mock Interview
- AI Answer Evaluation
- Premium Subscription
- Stripe Integration
- Interview Statistics
- Leaderboard
- Interview Simulator
- Mobile Application

---

# 📌 Project Status

✅ Backend V1 Completed

🚧 Frontend Development In Progress

---

# 👨‍💻 Author

Developed by **Valentin Mihaita**

Backend:
- Java 21
- Spring Boot
- PostgreSQL
- Spring Security
- JWT Authentication

Frontend (Coming Soon):
- React
- Tailwind CSS

---

# 📄 License

This project is currently under active development.