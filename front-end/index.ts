type Todo = {
  id: string;
  value: string;
};

(async () => {
  const list = document.getElementById("todo-list");
  if (!list) throw new Error("Element not found");
  const todos = await getAllTodos();
  todos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML = `${todo.value} <button class='btn btn-danger float-end'>Delete</button>`;
    list.appendChild(listItem);
  });
})();

async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch("http://localhost:3000/todos");
  return response.json();
}

async function createTodo(): Promise<Todo> {
  const response = await fetch("http://localhost:3000/todo", {
    method: "POST",
    body: JSON.stringify({
      value: "Task 1",
    }),
  });
  return response.json();
}
