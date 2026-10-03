# 🤖 AI Usage Report
### Software for Mobile Devices (Assignment 1) — Open-Ended AI-Assisted Development
**Course**: Software for Mobile Devices (CS / SE)  
**Student Name**: Muhammad Saad  
**Student Roll No**: 21K-3210  
**Project**: Reimagine University Student Portal (FLEX 2.0)  
**Date**: September 2026  

---

## 1. Executive Disclosure
In accordance with Section 8 (**AI-Assisted Development Policy**) of the Assignment Specification, this report documents the specific AI tools utilized, the development phases where AI was applied, and how the AI-assisted code was reviewed, adapted, validated, and debugged by the student.

---

## 2. Tools Used
| AI Tool / Agent | Version / Model | Primary Usage Area |
| :--- | :--- | :--- |
| **Antigravity IDE / Gemini 3.8 Flash** | Google DeepMind Agentic Coding | Architecture design, component scaffolding, formula derivation, documentation generation |
| **ChatGPT / Claude** | GPT-4o / Claude 3.5 Sonnet | Brainstorming university portal UX pain points, regex validation patterns |

---

## 3. Phase-by-Phase AI Assistance Breakdown

### Phase A: Problem Ideation & Requirements Synthesis
- **Prompt / Inquiry**: Identifying real student pain points in the FAST-NUCES FLEX portal and designing an interactive mobile-first solution without violating classroom navigation constraints.
- **AI Contribution**: Suggested focusing on the strict 80% attendance policy and proposed an interactive "Bunk-o-Meter" and "Target Final Exam Solver" instead of cloning static tables.
- **Student Adaptation & Decision**: Chose to strictly enforce the constraint of zero navigation packages (`@react-navigation`) and zero bottom/side bars by designing a top Command Pills pattern driven by pure React state.

### Phase B: Mathematical Modeling & Utility Logic
- **Prompt / Inquiry**: Deriving deterministic formulas to calculate:
  1. Safe bunks allowed without dropping below threshold $T$:
     $$\text{Safe Bunks} = \left\lfloor \frac{100 \times \text{Attended} - T \times \text{Total}}{T} \right\rfloor$$
  2. Minimum consecutive classes required to regain threshold:
     $$\text{Classes Needed} = \left\lceil \frac{T \times \text{Total} - 100 \times \text{Attended}}{100 - T} \right\rceil$$
  3. Required score in final examination to secure target letter grade.
- **AI Contribution**: Provided initial mathematical expressions in JavaScript.
- **Student Adaptation & Testing**: Validated edge cases (e.g. Total = 0, current attendance already below threshold, required final marks exceeding 100%) and implemented bound clamps (`Math.max(0, ...)`).

### Phase C: Component Design & Styling System
- **Prompt / Inquiry**: Developing a clean, modern design system ("Aura Slate") adhering to mobile usability best practices without external styling libraries.
- **AI Contribution**: Generated color tokens, elevation shadows, and component templates (`AuraCard`, `StatusBadge`, `MetricTile`, `AuraInput`, `ProgressBar`).
- **Student Adaptation**: Customized colors to align with academic conventions (Emerald for Safe, Amber for Warning, Crimson for Critical Debarment, Electric Cobalt for active items) and ensured touch targets met standard 44px mobile accessibility guidelines.

### Phase D: Multi-Chart Dashboard Integration
- **Prompt / Inquiry**: Integrating `react-native-chart-kit` and `react-native-svg` to satisfy Assignment Requirement #7.
- **AI Contribution**: Configured props and gradient datasets for Bezier Line Chart, Bar Chart, and Progress Chart.
- **Student Adaptation**: Made chart widths responsive to device dimensions (`Dimensions.get('window').width - 48`) to eliminate horizontal overflow bugs.

### Phase E: Form Validation & State Propagation
- **Prompt / Inquiry**: Building a complete, validated registration form with built-in React Native inputs (`TextInput`, `Switch`).
- **AI Contribution**: Generated regex validation rules for course codes and credit hours.
- **Student Adaptation**: Connected the form to `AcademicContext` so submitting a course immediately updates the active course list, degree credits, and charts across the entire application.

---

## 4. Code Ownership & Critical Review
- **Testing & Verification**: Every component was run and verified under Expo SDK 57 and React 19.
- **No Blind Acceptance**: AI-suggested navigation libraries (`@react-navigation/native`) were explicitly rejected because they violate class rules and lead to negative marking.
- **Viva Readiness**: The student has thoroughly reviewed all code, understands the data flow, and is fully prepared to defend the architecture and perform live modifications during the viva.

---

## 5. Verification Checklist
- [x] All assignment rules respected (no bottom/side bars, pure React state view switching).
- [x] Pure JavaScript methods implemented (`filter`, `map`, `reduce`, `find`).
- [x] Dashboard incorporates 3 distinct `react-native-chart-kit` charts.
- [x] Input form includes validation, regex, error states, and state propagation.
- [x] Centralized thresholds enable instant live modifications during the viva.
