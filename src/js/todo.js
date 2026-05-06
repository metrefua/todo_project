export default function createTodo({
  title,
  description = "",
  dueDate = "",
  priority = "low",
  completed = false,
  id = Date.now()
}) {
  return {
    id,
    title,
    description,
    dueDate,
    priority,
    completed,

    toggleComplete() {
      this.completed = !this.completed;
    },

    update(data) {
      this.title = data.title ?? this.title;
      this.description = data.description ?? this.description;
      this.dueDate = data.dueDate ?? this.dueDate;
      this.priority = data.priority ?? this.priority;
    }
  };
}