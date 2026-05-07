import createProject from "./project";

const STORAGE_KEY = "todoAppData";

// Save projects to localStorage
export function saveProjects(projects) {
  // Convert factory objects into plain objects
  const plainProjects = projects.map((project) => ({
    name: project.name,
    todos: project.getTodos(),
  }));

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(plainProjects)
  );
}

// Load projects from localStorage
export function loadProjects() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!data || data.length === 0) {
    return [createProject("Default")];
  }

  // Rebuild projects and todos 
  return data.map(projectData => {
    const project = createProject(projectData.name);

    // Properly restore todos into closure
    projectData.todos?.forEach((todoData) => {
      project.addTodo(todoData);
    });

    return project;
  });
}