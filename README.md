# COS 106 – Introduction to Web Technologies: Practical Term Project
## Responsive Student Portfolio and Academic Management Website

**Student Details:**
- **Name:** Ibe Agu
- **Matriculation Number:** 2025/C/SENG/0753
- **Student ID:** 301881444
- **Programme / Department:** B.Sc. Software Engineering
- **Email:** i.agu1444@miva.edu.ng / ibe88agwu@gmail.com
- **Institution:** Miva Open University, Abuja, Nigeria
- **Cohort:** May Cohort 2026

---

## 1. Project Overview & Objectives
This project is an individual practical web development submission for **COS 106 (Introduction to Web Technologies)** at Miva Open University.

The primary objective is to design, engineer, and deploy a responsive, multi-page personal academic portfolio and student management web platform. The system serves as a digital hub where a university student showcases their academic background, career goals, practical coursework projects, and manages everyday academic activities through an interactive task planner.

---

## 2. Architecture & File Structure

```text
cos106-portfolio/
│
├── index.html        # Homepage: Profile photograph, welcome message, navigation, bio, and multimedia
├── about.html        # About Me: Career goals, educational table, technical skills, and hobbies
├── projects.html     # Projects: Computational project showcase with screenshots and links
├── planner.html      # Academic Planner: Interactive JavaScript-driven task planner
├── contact.html      # Contact: Client-side validated feedback form and contact info
├── style.css         # External stylesheet: Responsive layout, CSS Grid, Flexbox, transitions
├── script.js         # JavaScript: DOM manipulation, event handling, form validation, task CRUD
└── README.md         # Full project technical documentation
```

---

## 3. Technologies & Software Tools Used

1. **HTML5 (Semantic Web):**
   - Utilizes standard semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<table>`, `<form>`).
   - Integrated native multimedia elements (`<audio>` and `<video>`) with standard controls.

2. **CSS3 (Modern Responsive Styling):**
   - **CSS Flexbox:** Powering the navigation bar, task items, button groups, and form layouts.
   - **CSS Grid:** Employed for the multi-column highlights grid, skill categories, and responsive project cards.
   - **Media Queries:** Designed with mobile-first adaptability for smartphone, tablet, and desktop viewports.
   - **Visual Effects:** Smooth transitions (`transition: all 0.3s ease`), custom box shadows, and button hover animations.

3. **JavaScript (ES6+):**
   - **Event Handling:** Click, submit, change, and keydown listeners.
   - **DOM Manipulation:** Dynamically creating elements (`document.createElement`), modifying classes, and updating content.
   - **Form Validation:** Strict regex checking for email addresses (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) and numeric-only phone numbers (`/^[0-9]+$/`).
   - **State Management & Persistence:** Storing academic tasks in browser `localStorage`.

4. **Version Control & Hosting:**
   - **Git & GitHub CLI:** Distributed version control and automated repository creation.
   - **GitHub Pages:** Production static hosting with HTTPS encryption.

---

## 4. Live Hosting & Repository Links
- **Live Hosted Website:** [https://Ibeuk.github.io/cos106-portfolio/](https://Ibeuk.github.io/cos106-portfolio/)
- **GitHub Source Code Repository:** [https://github.com/Ibeuk/cos106-portfolio](https://github.com/Ibeuk/cos106-portfolio)
