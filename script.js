/* ==========================================================================
   COS 106: Introduction to Web Technologies - Practical Term Project
   Author: Ibe Agu (Matric No: 2025/C/SENG/0753)
   Institution: Miva Open University | Faculty of Computing & Applied Sciences
   File: script.js (Interactive Planner & Form Validation Script)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================================================
       SECTION 1: INTERACTIVE ACADEMIC TASK PLANNER
       - Add tasks
       - Mark tasks as completed
       - Delete tasks
       - Dynamic task counters
       - LocalStorage persistence
       ========================================================================== */
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const totalCountElem = document.getElementById("totalTasksCount");
    const completedCountElem = document.getElementById("completedTasksCount");
    const pendingCountElem = document.getElementById("pendingTasksCount");
    const emptyStateElem = document.getElementById("emptyState");
    const clearCompletedBtn = document.getElementById("clearCompletedBtn");

    // Initialize default task array with coursework tasks or retrieve from localStorage
    let tasks = [];
    const savedTasks = localStorage.getItem("miva_cos106_tasks");

    if (savedTasks) {
        try {
            tasks = JSON.parse(savedTasks);
        } catch (e) {
            tasks = getDefaultTasks();
        }
    } else {
        tasks = getDefaultTasks();
    }

    function getDefaultTasks() {
        return [
            { id: 1710000000001, text: "Read COS 106 Module on CSS Grid and Flexbox layouts", completed: true },
            { id: 1710000000002, text: "Implement client-side JavaScript form validation with regular expressions", completed: true },
            { id: 1710000000003, text: "Test responsive media queries across mobile and tablet viewports", completed: false },
            { id: 1710000000004, text: "Deploy website to GitHub Pages and verify live production build", completed: false }
        ];
    }

    // Save tasks to browser local storage
    function saveTasksToStorage() {
        localStorage.setItem("miva_cos106_tasks", JSON.stringify(tasks));
    }

    // Update stats counters
    function updateStatistics() {
        if (!totalCountElem) return;

        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;

        totalCountElem.textContent = `Total: ${total}`;
        completedCountElem.textContent = `Completed: ${completed}`;
        pendingCountElem.textContent = `Pending: ${pending}`;

        if (emptyStateElem) {
            emptyStateElem.style.display = total === 0 ? "block" : "none";
        }
    }

    // Render task items to the DOM
    function renderTasks() {
        if (!taskList) return; // Only runs if planner elements exist on the page

        taskList.innerHTML = "";

        tasks.forEach(function (task) {
            const li = document.createElement("li");
            li.className = "task-item" + (task.completed ? " completed" : "");
            li.setAttribute("data-id", task.id);

            // Container for checkbox and text
            const leftContainer = document.createElement("div");
            leftContainer.className = "task-item-left";

            // Checkbox element
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.setAttribute("aria-label", "Mark task as completed");
            checkbox.addEventListener("change", function () {
                toggleTaskCompletion(task.id);
            });

            // Text element
            const textSpan = document.createElement("span");
            textSpan.className = "task-text";
            textSpan.textContent = task.text;
            textSpan.addEventListener("click", function () {
                toggleTaskCompletion(task.id);
            });

            leftContainer.appendChild(checkbox);
            leftContainer.appendChild(textSpan);

            // Delete button element
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn-delete";
            deleteBtn.innerHTML = "&times;";
            deleteBtn.title = "Delete Task";
            deleteBtn.setAttribute("aria-label", "Delete task");
            deleteBtn.addEventListener("click", function (event) {
                event.stopPropagation();
                deleteTask(task.id);
            });

            li.appendChild(leftContainer);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });

        updateStatistics();
        saveTasksToStorage();
    }

    // Add a new task
    function addTask() {
        if (!taskInput) return;
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a valid task description before adding.");
            taskInput.focus();
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.unshift(newTask); // Add to the top of list
        taskInput.value = "";
        renderTasks();
    }

    // Toggle completion status
    function toggleTaskCompletion(id) {
        tasks = tasks.map(function (task) {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        renderTasks();
    }

    // Delete a task
    function deleteTask(id) {
        tasks = tasks.filter(function (task) {
            return task.id !== id;
        });
        renderTasks();
    }

    // Clear all completed tasks
    function clearCompletedTasks() {
        const completedCount = tasks.filter(t => t.completed).length;
        if (completedCount === 0) {
            alert("No completed tasks to clear.");
            return;
        }
        if (confirm(`Are you sure you want to remove ${completedCount} completed task(s)?`)) {
            tasks = tasks.filter(t => !t.completed);
            renderTasks();
        }
    }

    // Attach planner event listeners
    if (addTaskBtn && taskInput) {
        addTaskBtn.addEventListener("click", addTask);

        taskInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                addTask();
            }
        });

        if (clearCompletedBtn) {
            clearCompletedBtn.addEventListener("click", clearCompletedTasks);
        }

        renderTasks();
    }


    /* ==========================================================================
       SECTION 2: CONTACT FORM JAVASCRIPT VALIDATION
       Rubric Requirements:
       - No field is empty
       - Email format is valid
       - Phone number contains only digits
       ========================================================================== */
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        const nameField = document.getElementById("fullName");
        const emailField = document.getElementById("email");
        const phoneField = document.getElementById("phone");
        const messageField = document.getElementById("message");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const phoneError = document.getElementById("phoneError");
        const messageError = document.getElementById("messageError");
        const formAlert = document.getElementById("formAlert");

        // Helper to clear errors
        function clearErrors() {
            nameError.textContent = "";
            emailError.textContent = "";
            phoneError.textContent = "";
            messageError.textContent = "";

            nameField.classList.remove("input-error");
            emailField.classList.remove("input-error");
            phoneField.classList.remove("input-error");
            messageField.classList.remove("input-error");

            formAlert.className = "alert-box";
            formAlert.style.display = "none";
            formAlert.textContent = "";
        }

        // Live input cleaning to remove error states when user types
        [nameField, emailField, phoneField, messageField].forEach(field => {
            if (field) {
                field.addEventListener("input", function () {
                    this.classList.remove("input-error");
                    const errElem = document.getElementById(this.id + "Error");
                    if (errElem) errElem.textContent = "";
                });
            }
        });

        // Form Submit Handler
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop standard form submission
            clearErrors();

            let isValid = true;

            // 1. Validate Full Name (Non-empty and minimum 2 letters)
            const nameVal = nameField.value.trim();
            if (nameVal === "") {
                nameError.textContent = "Please enter your full name (field cannot be empty).";
                nameField.classList.add("input-error");
                isValid = false;
            } else if (nameVal.length < 2) {
                nameError.textContent = "Name must contain at least 2 characters.";
                nameField.classList.add("input-error");
                isValid = false;
            }

            // 2. Validate Email (Non-empty and standard email regex)
            const emailVal = emailField.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailVal === "") {
                emailError.textContent = "Please enter your email address (field cannot be empty).";
                emailField.classList.add("input-error");
                isValid = false;
            } else if (!emailRegex.test(emailVal)) {
                emailError.textContent = "Invalid email format. Must follow standard format (e.g., student@miva.university).";
                emailField.classList.add("input-error");
                isValid = false;
            }

            // 3. Validate Phone Number (Non-empty and digits only)
            const phoneVal = phoneField.value.trim();
            const digitsOnlyRegex = /^[0-9]+$/;
            if (phoneVal === "") {
                phoneError.textContent = "Please enter your phone number (field cannot be empty).";
                phoneField.classList.add("input-error");
                isValid = false;
            } else if (!digitsOnlyRegex.test(phoneVal)) {
                phoneError.textContent = "Invalid phone number. Must contain only numeric digits (no letters or special characters).";
                phoneField.classList.add("input-error");
                isValid = false;
            } else if (phoneVal.length < 7 || phoneVal.length > 15) {
                phoneError.textContent = "Phone number must be between 7 and 15 digits.";
                phoneField.classList.add("input-error");
                isValid = false;
            }

            // 4. Validate Message (Non-empty)
            const messageVal = messageField.value.trim();
            if (messageVal === "") {
                messageError.textContent = "Please enter your message (field cannot be empty).";
                messageField.classList.add("input-error");
                isValid = false;
            } else if (messageVal.length < 10) {
                messageError.textContent = "Message is too short. Please provide at least 10 characters.";
                messageField.classList.add("input-error");
                isValid = false;
            }

            // If all validation rules pass
            if (isValid) {
                formAlert.className = "alert-box alert-success";
                formAlert.innerHTML = `<strong>Success!</strong> Thank you, <strong>${nameVal}</strong>. Your message has been verified and sent successfully. I will get back to you via <em>${emailVal}</em>.`;
                formAlert.style.display = "block";

                // Reset form fields
                contactForm.reset();

                // Scroll alert smoothly into view
                formAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
            } else {
                // Focus the first invalid field
                const firstInvalid = contactForm.querySelector(".input-error");
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        });
    }

});
