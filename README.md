# ⚡ FLEX 2.0 — University Student Academic Portal
### Software for Mobile Devices (Assignment 1) — React Native • JavaScript • React Concepts

> A modern, mobile-first academic companion engineered for FAST-NUCES and university students to proactively eliminate attendance panic, provide transparent grade analytics, and simulate academic scenarios in real time.

---

## 🌟 Executive Summary & Problem Identification
Traditional university portals (such as legacy FLEX) suffer from critical mobile usability flaws:
1. **The 80% Attendance Debarment Trap**: Students live in constant fear of the dreaded **"F/A" (Fail due to Attendance)** grade. The legacy portal displays static percentages without calculating how many lectures a student can safely miss or must attend to avoid debarment.
2. **Disconnected Grade Insights**: Marks are scattered across tables without dynamic weighting or predictive calculators to determine what score is needed in final exams to secure target grades.
3. **Desktop-Oriented, Rigid Navigation**: Legacy portals are difficult to navigate on mobile devices, especially during rush periods.

**FLEX 2.0 reimagines this experience** as an interactive **Academic Command Center** featuring:
- 🎯 **Smart Bunk Forecaster & Live Simulator**: Calculates safe leave margins and recovery lecture requirements with one-tap `[+ Present]` and `[+ Absent]` simulation.
- 🔮 **What-If Final Exam Solver**: Computes the exact score required out of final exam marks to secure any target letter grade (`A`, `A-`, `B+`, etc.).
- 📊 **Multi-Chart Analytics Dashboard**: Built with `react-native-chart-kit` featuring a GPA Trajectory Bezier Line Chart, Subject-Wise Attendance Bar Chart, and Degree Credit Completion Progress Ring.
- ⚡ **Course Studio & Registration Sandbox**: An interactive, validated course registration form utilizing built-in React Native inputs.

---

## 🛡️ Classroom & Grading Constraint Compliance

| Assignment Requirement | Classroom Constraint | FLEX 2.0 Implementation |
| :--- | :--- | :--- |
| **B. Mobile Application** | *"Do not use any side or bottom bars as we have not discussed anything in the class"* | **Zero Side/Bottom Bars**: Clean top **Command Pills** with active indicators and breadcrumb header navigation. |
| **Grading Principles (#11)** | *"Adding the navigation code or unnecessary code will lead to negative marking. (switch views as discussed in class)"* | **Zero Navigation Libraries**: View switching is driven 100% via pure React state (`activeView`) and conditional rendering. |
| **C. React Concepts** | Meaningful use of state, props, events, conditional rendering | Reusable components, state lifting via `AcademicContext`, controlled inputs, event callbacks. |
| **D. JavaScript Concepts** | Arrays, objects, array methods, calculations | Extensive use of `.map()`, `.filter()`, `.reduce()`, `.find()`, and deterministic math formulas. |
| **G. Form / Input** | Meaningful user input with validation and feedback | Form with `TextInput`, `Switch`, regex validation, credit ranges, inline error hints, and state propagation. |
| **Dashboard (#7)** | Dashboard using `react-native-chart-kit` with at least 2 chart types | **3 Distinct Chart Types**: Line Chart (GPA Trend), Bar Chart (Attendance Health), and Progress Chart (Degree Completion). |
| **Viva (#9, 20 Marks)** | Live code modification readiness | Centralized rules in `src/constants/academicRules.js` for instant on-the-spot adjustments. |

---

## 📱 Core Features & Modules

### 1. Executive Dashboard Hub (`DashboardView.js`)
- **Metric Pulse KPIs**: Real-time tiles displaying Cumulative GPA (`3.64`), Average Semester Attendance (`83.2%`), Enrolled Credits (`15 Cr`), and At-Risk Courses count.
- **Academic Standing Badge**: Dynamic award chip (e.g. ⭐ *Dean's Honor List* based on GPA ≥ 3.50).
- **Interactive Charts (`react-native-chart-kit`)**:
  - **Chart 1 (Bezier Line Chart)**: Historical semester-by-semester SGPA progression across Semesters 1 through 5.
  - **Chart 2 (Bar Chart)**: Subject-wise attendance percentages benchmarked against university policy.
  - **Chart 3 (Progress Ring Chart)**: Degree credit breakdown (Core, Electives, University Gen-Ed).
- **Actionable Debarment Alerts**: Highlights courses below threshold with one-tap shortcuts to the forecaster.

### 2. Smart Bunk Forecaster (`AttendanceForecasterView.js`)
- **Real-Time Fuzzy Search**: Filter courses dynamically by code, title, or instructor.
- **Category Filter Chips**: Instant filtering by status: `All`, `Safe (≥80%)`, `Warning (75-79%)`, `Critical (<75%)`.
- **The Bunk-o-Meter Formula**:
  - *Safe Margin*: Automatically computes $\lfloor(100 \times \text{Attended} - T \times \text{Total}) / T\rfloor$ to tell you the exact safe bunk limit.
  - *Recovery Required*: Computes $\lceil(T \times \text{Total} - 100 \times \text{Attended}) / (100 - T)\rceil$ to determine consecutive classes needed to recover.
- **Interactive Live Simulator**:
  - `[+ Present]` and `[+ Absent]` buttons to test hypothetical future classes. The card and dashboard charts recalculate instantly!

### 3. Sessional Marks & Final Exam Solver (`MarksAndGpaView.js`)
- **Component Breakdown**: View weights, obtained scores, and progress bars for Quizzes, Assignments, Midterms 1 & 2, and Projects.
- **Sessional Run-Rate**: Shows aggregate obtained marks and projected letter grade.
- **What-If Final Exam Solver**: Choose any target grade (`A`, `A-`, `B+`, etc.) to instantly calculate required final exam marks and difficulty level (`Achievable`, `Challenging`, or `Impossible`).

### 4. Course Studio & Registration Sandbox (`CourseStudioView.js`)
- **Comprehensive Form Inputs**:
  - Course Code with regex formatting (e.g. `CS-3015`)
  - Course Title with character boundaries
  - Credit Hours selector (1 to 4 Credits)
  - Course Type toggle using React Native `Switch` (Core vs Elective)
  - Instructor Name, Room, and Schedule
- **Full State Propagation**: Submitting immediately adds the course to global context, updating overall credits, attendance calculations, and all dashboard charts.

---

## 🏗️ Architecture & Component Design

```
FLEX/
├── App.js                                  # Root Provider & View Orchestrator
├── package.json                            # Dependencies & scripts
├── src/
│   ├── constants/
│   │   ├── colors.js                       # Aura Slate design tokens
│   │   ├── layout.js                       # Spacing, typography, elevation shadows
│   │   └── academicRules.js                # Centralized policy thresholds (80% attendance, etc.)
│   ├── data/
│   │   ├── mockStudent.js                  # Authentic student profile & GPA history
│   │   └── mockCourses.js                  # 5 authentic university courses with logs & evaluations
│   ├── state/
│   │   └── AcademicContext.js              # Global React Context holding state & dispatchers
│   ├── components/
│   │   ├── common/
│   │   │   ├── AuraCard.js                 # Elevated reusable card container
│   │   │   ├── StatusBadge.js              # Semantic badge (Safe, Warning, Critical)
│   │   │   ├── MetricTile.js               # High-impact summary KPI tile
│   │   │   ├── AuraButton.js               # Multi-variant button
│   │   │   ├── AuraInput.js                # Validated TextInput with error handling
│   │   │   ├── ProgressBar.js              # Animated dynamic progress track
│   │   │   ├── AlertNotice.js              # Dismissible alert banner
│   │   │   └── EmptyState.js               # Empty search / filter container
│   │   ├── layout/
│   │   │   ├── AppHeader.js                # Profile chip, title, unread alerts, back button
│   │   │   └── CommandPills.js             # Horizontal category view switcher (Zero bottom bar)
│   │   └── charts/
│   │       ├── GpaTrendChart.js            # react-native-chart-kit LineChart
│   │       ├── AttendanceBarChart.js       # react-native-chart-kit BarChart
│   │       └── CreditProgressChart.js      # react-native-chart-kit ProgressChart
│   ├── views/
│   │   ├── DashboardView.js                # Overview, KPIs, charts, alerts
│   │   ├── AttendanceForecasterView.js     # Search, filters, bunk calculator, simulation
│   │   ├── MarksAndGpaView.js              # Sessional marks, weighted totals, what-if solver
│   │   └── CourseStudioView.js             # Validated registration form
│   └── utils/
│       ├── attendanceCalculators.js        # Bunk formulas, recovery math, array reducers
│       ├── gpaCalculators.js               # Weighted GPA, letter grades, target marks solver
│       └── formValidators.js               # Regex validation & error mapping
├── VIVA_DEFENSE_CHEATSHEET.md              # Live modification guide for viva
└── AI_USAGE_REPORT.md                      # Formal AI disclosure report
```

---

## 🚀 Getting Started & How to Run

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn

### Installation
1. Clone or extract the project repository.
2. Open terminal in the project directory:
   ```powershell
   npm install
   ```

### Running the App
- **Run on Web Browser (Recommended for quick testing)**:
  ```powershell
  npm run web
  ```
- **Run on Android / iOS via Expo Go**:
  ```powershell
  npx expo start
  ```
  Scan the QR code displayed in the terminal using the **Expo Go** mobile app on your Android or iPhone.

---

## 🧪 Testing Common Scenarios
1. **View Switching**: Tap through the top Command Pills (`📊 Hub`, `🎯 Attendance`, `📈 Marks`, `⚡ Course Studio`).
2. **Attendance Simulation**: In the Bunk Forecaster, tap `+ Present` or `+ Absent` on any course card to see instant recalculation.
3. **What-If Grade Solver**: In Marks View, select different target grades (`A`, `B+`, `C+`) to see the required final exam score.
4. **Form Validation**: In Course Studio, try submitting an empty form or invalid course code to inspect inline validation errors. Then enter a valid course to watch it appear everywhere in the app.
5. **Viva Live Tweak**: In `src/constants/academicRules.js`, change `ATTENDANCE_SAFE_THRESHOLD` from `80` to `75` or `85` and observe all badges and alerts adjust immediately!
