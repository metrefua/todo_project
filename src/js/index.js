import "../css/style.css";

import createProject from "./project";
import { saveProjects, loadProjects } from "./storage";
import { renderProjects, renderTodos } from "./dom";

// STATE 
let projects = [];
let currentProjectIndex = 0;

// DOM ELEMENTS 
const addProjectBtn = document.getElementById("add-project-btn");
const addTodoBtn = document.getElementById("add-todo-btn");
const projectListEl = document.getElementById("project-list");

// INIT 
function init() {
  const storedProjects = loadProjects();

  if (storedProjects.length > 0) {
    projects = storedProjects.map(p => {
      const project = createProject(p.name);

      p.todos?.forEach(todo => {
        project.addTodo(todo);
      });

      return project;
    });
  }


  if (projects.length === 0) {
    projects.push(createProject("Default"));
  }

  currentProjectIndex = 0;

  render();
}

// RENDER
function render() {
  renderProjects(projects, currentProjectIndex);
  renderTodos(projects[currentProjectIndex]);
  save();
}

// SAVE 
function save() {
  const plainProjects = projects.map(project => ({
    name: project.name,
    todos: project.getTodos()
  }));

  saveProjects(plainProjects);
}

// EVENTS 

// Add Project
addProjectBtn.addEventListener("click", () => {
  const name = prompt("Enter project name:");
  if (!name) return;

  projects.push(createProject(name));
  currentProjectIndex = projects.length - 1;

  render();
});

// Switch Project
projectListEl.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const index = Number(li.dataset.index);

  if (isNaN(index) || !projects[index]) {
    console.warn("Invalid project index:", index);
    return;
  }

  currentProjectIndex = index;
  render();
});

// Add Todo
addTodoBtn.addEventListener("click", () => {
  const project = projects[currentProjectIndex];

  if (!project) {
    alert("No project selected.");
    return;
  }

  const title = prompt("Todo title:");
  if (!title) return;

  const description = prompt("Description:");
  const dueDate = prompt("Due date (YYYY-MM-DD):");
  const priority = prompt("Priority (low, medium, high):") || "low";

  project.addTodo({
    title,
    description,
    dueDate,
    priority
  });

  render();
});

// TODO ACTIONS (EDIT + DELETE)
const todoListEl = document.getElementById("todo-list");

todoListEl.addEventListener("click", (e) => {
  const todoDiv = e.target.closest(".todo-item");
  if (!todoDiv) return;

  const id = Number(todoDiv.dataset.id);
  const project = projects[currentProjectIndex];

  // DELETE
  if (e.target.classList.contains("delete-btn")) {
    project.removeTodo(id);
    render();
  }

  // EDIT
  if (e.target.classList.contains("edit-btn")) {
    const todo = project.getTodoById(id);

    const title = prompt("Edit title:", todo.title);
    if (!title) return;

    const description = prompt("Edit description:", todo.description);
    const dueDate = prompt("Edit due date:", todo.dueDate);
    const priority = prompt("Edit priority:", todo.priority);

    project.updateTodo(id, {
      title,
      description,
      dueDate,
      priority
    });

    render();
  }
});


// START APP 
init();