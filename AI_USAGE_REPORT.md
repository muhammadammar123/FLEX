# AI Usage Report

**Course**: Software for Mobile Devices
**Assignment**: Assignment 1
**Student Name**: Muhammad Ammar
**Registration No.**: 23i-3052
**Date**: September 2026

---

### 1. AI Tool(s) Used
List the AI tools used during the development of your application.  
*(Example: ChatGPT, Gemini, GitHub Copilot)*

**Response:**
Antigravity IDE (Gemini 3.1 Pro / High)
Claude 4.5 Sonnet

---

### 2. Purpose of AI Usage
Explain what you used AI for during the development of your application.  
*(Examples: Understanding React/React Native concepts, Debugging errors, Generating or improving UI ideas, Implementing charts using react-native-chart-kit, Understanding unfamiliar code, Improving code structure)*

**Response:**
I used the AI primarily for all the above things.

---

### 3. Important Prompts Used
Provide the important prompts that you gave to the AI tool.

**Prompt 1:**
"create the code that satisfies the above requirements, and is best in terms of ui and ux, and is also simple and efficient, without using any external libraries for navigation"

**Prompt 2:**
"does this code satisfies all the requirements and do's and dont's of this assignment"

**Prompt 3:**
"make the code as simple as it just satisfies the assignment details"

---

### 4. AI-Generated Output
Briefly describe the code, solution, or suggestion provided by the AI.

**Response:**
The code AI suggested is that it created components for each section and used useState to switch between them. The solution was not as efficient as it could be but it was a good starting point. Then I refined the solution and AI proposed new solution of using pure react state for conditional rendering instead of any external libraries. The AI also suggested me to create helper functions for calculations, props and also refactored the code to make it more efficient and fast.

---

### 5. Changes Made by Me
Explain what you changed, modified, or improved in the AI-generated solution.

**Response:**
I actively guided the AI on keeping the code structure as simple as possible and removing unwanted features and making the code efficient and fast.

---

### 6. My Understanding
Explain the important part(s) of the AI-generated code in your own words.

**Response:**
The application uses useState for the main screen navigation. I didn't used external libraries for navigation as it was forbidden in the assignment. It uses Context API for state management of courses, and uses react-native-chart-kit to render two charts on the dashboard that update dynamically based on the courses array. I also added the features to mark courses as attended or skipped, add new courses and delete them.

---

### 7. Verification and Testing
Explain how you tested the AI-generated solution. Mention:  
- Whether the code worked correctly  
- Errors encountered  
- How you fixed the errors  
- Any changes required after testing  

**Response:**
I tested the solution by having the AI run local PowerShell commands (`git status`, file size checks) to verify the cleanup. When testing the removal of the 3rd chart (`CreditProgressChart`), I ensured the Dashboard view didn't crash. We encountered an error where some `StatusBadge` components were referencing deleted colors; I instructed the AI to fix it by pointing those components to the remaining `accent` and `gold` color tokens. Some changes related to colors and charts were made.  

---

### 8. Reflection
What did you learn from using AI during this assignment?

**Response:**
I learned how to use AI to systematically refactor and simplify a codebase and also generating new code.I learned how to use this as pair programmer.
---

### Student Declaration
I confirm that I have used AI tools only as a development assistant and that I understand the code submitted as part of this assignment. I am able to explain and demonstrate the functionality of my application.

**Student Name**: Muhammad Ammar  
**Signature**: Muhammad Ammar
**Date**: October 3, 2026
