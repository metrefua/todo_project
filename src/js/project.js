import createTodo from "./todo";

export default function createProject(name = "Default") {
  let todos = [];

  // Get Todos
  const getTodos = () => todos;

  // Add Todo
  const addTodo = (todoData) => {
    const todo = createTodo(todoData);
    todos.push(todo);
    return todo;
  };

  //Remove todo
  const removeTodo = (id) => {
    todos = todos.filter(
      (todo) => String(todo.id) !== String(id)
    );
  };

  // Get todo by ID
  const getTodoById = (id) => {
    return todos.find(
      (todo) => String(todo.id) === String(id)
    );
  };

  // Update todo
  const updateTodo = (id, newData) => {
    const todo = getTodoById(id);
    if (todo) {
      todo.update(newData);
    }
  };

  return {
    name,
    getTodos,
    addTodo,
    removeTodo,
    getTodoById,
    updateTodo,
  };
}