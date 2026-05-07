import { format, parseISO, isValid } from "date-fns";
// SELECTORS 
const projectListEl = document.getElementById("project-list");
const todoListEl = document.getElementById("todo-list");
const currentProjectTitle = document.getElementById("current-project-title");

// RENDER PROJECTS
export function renderProjects(projects, currentProjectIndex) {
  projectListEl.innerHTML = "";

  projects.forEach((project, index) => {
    const li = document.createElement("li");
    li.textContent = project.name;
    li.dataset.index = index;

    if (index === currentProjectIndex) {
      li.style.background = "#334155";
    }

    li.innerHTML = `
      <div class="project-item">
        <span class="project-name">${project.name}</span>
        <button class="delete-project-btn" data-index="${index}"> ✕ </button>
      </div>
    `;

    projectListEl.appendChild(li);
  });
}

// RENDER TODOS
export function renderTodos(project, filter = "all") {
  todoListEl.innerHTML = "";

  if (!project) {
    currentProjectTitle.textContent = "No Project";
    return;
  }

  currentProjectTitle.textContent = project.name;

  let todos = project.getTodos();

  // FILTERS
  if (filter === "active") {
    todos = todos.filter((todo) => !todo.completed);
  }

  if (filter === "completed") {
    todos = todos.filter((todo) => todo.completed);
  }

  // EMPTY STATE 
  if (todos.length === 0) {
    todoListEl.innerHTML = `
      <div class="empty-state">
        <h3>No todos found</h3>
        <p>Create a new task to get started.</p>
      </div>
    `;
    return;
  }

  // RENDER TODOS 
  todos.forEach((todo) => {
    const div = document.createElement("div");

    div.classList.add(
      "todo-item",
      `priority-${todo.priority}`
    );

    if (todo.completed) {
      div.classList.add("completed");
    }

    div.dataset.id = todo.id;

    // DATE FORMAT 
    let formattedDate = "";

    if (todo.dueDate) {
      try {
        const parsedDate = parseISO(todo.dueDate);

        if (isValid(parsedDate)) {
          formattedDate = format(parsedDate, "MMM d, yyyy");
        }
      } catch (error) {
        console.error("Invalid date:", error);
      }
    }

    div.innerHTML = `
      <div class="todo-header">
        <div class="todo-left">
          <input 
            type="checkbox" 
            class="toggle-complete"
            ${todo.completed ? "checked" : ""}
          />

          <span class="todo-title">${todo.title}</span>
        </div>

        <div class="todo-actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>

      <div class="todo-details">
        <p>${todo.description || "No description"}</p>

        ${
          formattedDate
            ? `<small>Due: ${formattedDate}</small>`
            : ""
        }
      </div>
    `;

    todoListEl.appendChild(div);
  });
}