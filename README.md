# Life Mastery 360 – MindPulse AI Assessment

Student Mental Wellness Platform

---

## Tech Stack

| Layer    | Technology                |
|----------|---------------------------|
| Frontend | React 18 + Vite           |
| Backend  | Java 17 + Spring Boot 3.2 |
| Database | H2 (file-based, free)     |
| Styling  | Custom CSS + Poppins font |

---

## Prerequisites

- **Java 17+** — [Download](https://adoptium.net/)
- **Maven 3.8+** — [Download](https://maven.apache.org/) (or use the included wrapper)
- **Node.js 18+** — [Download](https://nodejs.org/)

---

## Run the App

### 1. Start the Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on: http://localhost:8080

H2 Database Console: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:file:./data/lifemastery`
- Username: `sa` | Password: *(empty)*

---

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

---

## App Flow

```
Home Page → Start Assessment → User Details → 30 Questions → Results Dashboard
```

### Assessment Categories (6 questions each)

| Category             | Questions | Score Range |
|----------------------|-----------|-------------|
| Stress               | 1–6       | 0–18        |
| Focus                | 7–12      | 0–18        |
| Emotional Regulation | 13–18     | 0–18        |
| Habit Discipline     | 19–24     | 0–18        |
| Social Confidence    | 25–30     | 0–18        |

### Score Levels

- **0–5** → Good (green)
- **6–11** → Moderate (yellow)
- **12–18** → Needs Attention (red)

---

## API Endpoints

| Method | URL                       | Description               |
|--------|---------------------------|---------------------------|
| POST   | `/api/assessment/submit`  | Submit answers, get result|
| GET    | `/api/assessment/{id}`    | Retrieve result by ID     |

---

## Project Structure

```
life-mastery-360/
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/lifemastery/
│       ├── LifeMastery360Application.java
│       ├── config/CorsConfig.java
│       ├── controller/AssessmentController.java
│       ├── model/Assessment.java
│       ├── model/AssessmentRequest.java
│       ├── model/AssessmentResult.java
│       ├── repository/AssessmentRepository.java
│       ├── service/ScoreService.java
│       └── service/InterpretationService.java
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── index.css
        ├── api/assessment.js
        ├── context/AssessmentContext.jsx
        ├── data/questions.js
        └── pages/
            ├── HomePage.jsx
            ├── StartAssessmentPage.jsx
            ├── UserDetailsPage.jsx
            ├── QuestionPage.jsx
            └── ResultsPage.jsx
```

---

## iOS & Android (Future)

To package this as a mobile app later, use **Capacitor**:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add ios
npx cap add android
npm run build && npx cap sync
```

This wraps the React app in a native WebView — no rewrite needed.
