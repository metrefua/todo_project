import createProject from "./project";
import createTodo from "./todo";

const STORAGE_KEY = "todoAppData";

// Save projects to localStorage
export function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// Load projects from localStorage
export function loadProjects() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!data) {
    // First time → create default project
    const defaultProject = createProject("Default");
    return [defaultProject];
  }

  // Rebuild projects and todos 
  return data.map(projectData => {
    const project = createProject(projectData.name);
    project.id = projectData.id;

    project.todos = projectData.todos.map(todoData => {
      const todo = createTodo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority
      );

      todo.id = todoData.id;
      todo.completed = todoData.completed;

      return todo;
    });

    return project;
  });
}