import createTodo from "./todo";

export default function createProject(name = "Default") {
  let todos = [];

  const getTodos = () => todos;

  const addTodo = (todoData) => {
    const todo = createTodo(todoData);
    todos.push(todo);
    return todo;
  };

  const removeTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
  };

  const getTodoById = (id) => {
    return todos.find(todo => todo.id === id);
  };

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
    updateTodo
  };
}