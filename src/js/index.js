import "../css/style.css";

import createProject from "./project";
import { saveProjects, loadProjects } from "./storage";
import { renderProjects, renderTodos } from "./dom";

// STATE
let projects = [];
let currentProjectIndex = 0;
let currentFilter = "all";
let editingTodoId = null;

// DOM ELEMENTS
const addProjectBtn = document.getElementById("add-project-btn");
const addTodoBtn = document.getElementById("add-todo-btn");
const projectListEl = document.getElementById("project-list");

const todoModal = document.getElementById("todo-modal");
const todoForm = document.getElementById("todo-form");
const cancelTodoBtn = document.getElementById("cancel-todo");

const projectModal = document.getElementById("project-modal");
const projectForm = document.getElementById("project-form");
const cancelProjectBtn = document.getElementById("cancel-project");

// INIT
function init() {

  projects = loadProjects();

  // Safety fallback
  if (!projects || projects.length === 0) {
    projects = [createProject("Default")];
  }

  currentProjectIndex = 0;

  render();
}

// SAVE 
function save() {
  saveProjects(projects);
}

// RENDER
function render() {
  if (projects.length === 0) {
    projects.push(createProject("Default"));
    currentProjectIndex = 0;
  }

  if (!projects[currentProjectIndex]) {
    currentProjectIndex = 0;
  }

  renderProjects(projects, currentProjectIndex);
  renderTodos(projects[currentProjectIndex], currentFilter);

  save();
}

// ADD PROJECT 
addProjectBtn.addEventListener("click", () => {
  projectModal.classList.remove("hidden");
});

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("project-name").value.trim();

  if (!name) return;

  projects.push(createProject(name));
  currentProjectIndex = projects.length - 1;

  projectForm.reset();
  projectModal.classList.add("hidden");

  render();
});

cancelProjectBtn.addEventListener("click", () => {
  projectModal.classList.add("hidden");
});

// Switch Project
projectListEl.addEventListener("click", (e) => {
   // Delete project
  if (e.target.classList.contains("delete-project-btn")) {

    e.stopPropagation();

    const index = Number(e.target.dataset.index);

    // Prevent deleting last project
    if (projects.length === 1) {
      alert("You must have at least one project.");
      return;
    }

    projects.splice(index, 1);

    // Adjust current project index
    if (currentProjectIndex >= projects.length) {
      currentProjectIndex = projects.length - 1;
    }

    render();

    return;
  }
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

// Open Todo Modal
addTodoBtn.addEventListener("click", () => {
  editingTodoId = null;

  todoForm.reset();

  todoModal.classList.remove("hidden");
});

// SAVE TODO 
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const project = projects[currentProjectIndex];

  if (!project) return;

  const title = document.getElementById("todo-title").value.trim();
  const description = document.getElementById("todo-description").value.trim();
  const dueDate = document.getElementById("todo-date").value;
  const priority = document.getElementById("todo-priority").value;

  if (!title) return;

  // Edit existing todo
  if (editingTodoId !== null) {
    project.updateTodo(editingTodoId, {
      title,
      description,
      dueDate,
      priority,
    });

    editingTodoId = null;
  }

  // Create new todo 
  else {
    project.addTodo({
      title,
      description,
      dueDate,
      priority,
      completed: false,
    });
  }

  todoForm.reset();
  todoModal.classList.add("hidden");

  render();
});

// Cancel todo
cancelTodoBtn.addEventListener("click", () => {
  editingTodoId = null;

  todoForm.reset();

  todoModal.classList.add("hidden");
});

// Todo actions
document.addEventListener("click", (e) => {
  const todoItem = e.target.closest(".todo-item");

  if (!todoItem) return;

  const id = todoItem.dataset.id;
  const project = projects[currentProjectIndex];

  if (!project) return;

  // Edit todo
  if (e.target.classList.contains("edit-btn")) {
    const todo = project.getTodoById(id);

    if (!todo) return;

    editingTodoId = id;

    document.getElementById("todo-title").value = todo.title;
    document.getElementById("todo-description").value =
      todo.description || "";
    document.getElementById("todo-date").value = todo.dueDate || "";
    document.getElementById("todo-priority").value =
      todo.priority || "low";

    todoModal.classList.remove("hidden");
  }

  // Delete todo
  if (e.target.classList.contains("delete-btn")) {
    project.removeTodo(id);
    render();
  }

  // Toggle complete 
  if (e.target.classList.contains("toggle-complete")) {
    const todo = project.getTodoById(id);

    if (!todo) return;

    todo.completed = e.target.checked;

    render();
  }
});

// Filters
const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");

    render();
  });
});

// START APP
init();