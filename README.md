# Rania Classroom - Academic Portal & Student Practice Infrastructure

A state-of-the-art, high-performance interactive academic learning and assessment portal built exclusively for **Miss Rania's Students**.

---

## Key Features

1. **Student Authentication & Multi-Account System**:
   - Individual login with username and password for each student.
   - Quick 1-Click Demo switchers for fast evaluation (alex, sophia, liam, emma).
   - New student registration with grade level selection and custom avatar picker.

2. **Full-Featured Practice Engine**:
   - Access to **24,792 categorized curriculum skills** across Mathematics, English Language Arts, Science, and Social Studies.
   - Adaptive SmartScore engine (0-100) with dynamic difficulty scaling.
   - Instant feedback with comprehensive step-by-step explanations.
   - Session timer, question counters, and streak boosters.

3. **Individual Student Analytics & Reports**:
   - Dedicated performance dashboard per student.
   - KPIs: Total Questions Answered, Correct Answers, Overall Accuracy Rate, Skills Mastered, Practice Time, SmartScore Average.
   - Subject-by-subject competency breakdown bars (Maths, English, Science, Social Studies).
   - Complete practice history log with timestamped records.
   - Earned achievement badges with rarity levels.
   - **Printable Official Student Report Card** (Ctrl + P or click Print Report).

4. **Leaderboard & Gamification**:
   - Live XP ranking across all students.
   - Daily practice streaks.
   - Badges: Welcome Explorer, Century Club, Math Wizard, Grammar Champion, Streak Master, Perfectionist.

5. **Dual-Mode SQLite Backend & Standalone Client**:
   - **Full Server Mode**: Powered by Python built-in sqlite3 server (server.py) on port 8000.
   - **Offline Standalone Mode**: Automatically falls back to local storage if opened directly via browser.

---

## How to Launch

### Method 1: 1-Click Launcher (Recommended)
Double-click run_dashboard.bat. This automatically starts the backend server and opens http://localhost:8000 in your default web browser.

### Method 2: Command Line
python server.py

Then navigate to http://localhost:8000.

---

## Demo Student Credentials

- Alex Turner: username 'alex' | password 'password123' | Grade 5 | 2,840 XP
- Sophia Chen: username 'sophia' | password 'password123' | Grade 6 | 3,120 XP
- Liam Johnson: username 'liam' | password 'password123' | Grade 4 | 1,950 XP
- Emma Watson: username 'emma' | password 'password123' | Grade 7 | 3,450 XP

---

## SQL Database Schema (data/ixl_curriculum.db)

- users: Student identity, password hash, grade level, avatar, total XP, current streak.
- practice_sessions: Practice history records with skill code, score, questions answered, correct answers, and duration.
- student_badges: Gamified achievements earned by each student.
