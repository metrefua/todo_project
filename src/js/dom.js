// src/js/dom.js

// ===== SELECTORS =====
const projectListEl = document.getElementById("project-list");
const todoListEl = document.getElementById("todo-list");
const currentProjectTitle = document.getElementById("current-project-title");

// ===== RENDER PROJECTS =====
export function renderProjects(projects, currentProjectIndex) {
  projectListEl.innerHTML = "";

  projects.forEach((project, index) => {
    const li = document.createElement("li");
    li.textContent = project.name;

    if (index === currentProjectIndex) {
      li.style.background = "#334155";
    }

    li.dataset.index = index;
    projectListEl.appendChild(li);
  });
}

// ===== RENDER TODOS =====
export function renderTodos(project) {
  todoListEl.innerHTML = "";

  if (!project) return;

  currentProjectTitle.textContent = project.name;

  project.getTodos().forEach(todo => {
    const div = document.createElement("div");
    div.classList.add("todo-item", `priority-${todo.priority}`);
    div.dataset.id = todo.id;

    div.innerHTML = `
      <div class="todo-header">
        <h3>${todo.title}</h3>
        <div>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
      <div class="todo-details">
        <p>${todo.description || ""}</p>
        <small>${todo.dueDate || ""}</small>
      </div>
    `;

    todoListEl.appendChild(div);
  });
}