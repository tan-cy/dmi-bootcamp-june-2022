let todos: string[] = [];
const addButton = document.getElementById("add");
if (addButton === null) {
  // Handle it somehow
  throw new Error("Will handle it later...");
}

addButton.onclick = () => {
  const todoInputHtmlElement = document.getElementById("todo-input");
  if (todoInputHtmlElement === null) {
    // Handle it somehow
    throw new Error("Will handle it later...");
  }
  const todoInput = (todoInputHtmlElement as HTMLInputElement).value;
  todos.push(todoInput);

  const todoList = document.getElementById("todo-list");
  if (todoList === null) {
    // Handle it somehow
    throw new Error("Will handle it later...");
  }

  const listItem = document.createElement("li");
  listItem.classList.add("list-group-item");
  const buttonId = Date.now();
  listItem.id = buttonId.toString();
  listItem.innerHTML = `${todoInput} <button id='${buttonId}' class='btn btn-danger float-end'>Delete</button>`;
  todoList.appendChild(listItem);

  const button = document.getElementById(buttonId.toString());
  if (button === null) {
    // Handle it somehow
    throw new Error("Will handle it later...");
  }

  button.onclick = () => {
    const newTodos = todos.filter((todo, index) => index !== buttonId);
    todos = newTodos;
    reRenderList(buttonId.toString());
  };
};

const reRenderList = (nodeId: string) => {
  const todoList = document.getElementById("todo-list");
  const nodeToRemove = document.getElementById(nodeId);
  if (todoList === null || nodeToRemove === null) {
    // Handle it somehow
    throw new Error("Will handle it later...");
  }
  todoList.removeChild(nodeToRemove);
};
