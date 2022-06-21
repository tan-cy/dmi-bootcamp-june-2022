type Todo = {
  id: string;
  value: string;
};

const loadList = async () => {
  const todos = await getAllTodos();
  todos.forEach((todo) => {
    createListItem(todo.value, todo.id);
  });
};

(() => {
  loadList();
  const button = document.getElementById("add");
  if (!button) throw new Error("Add button is missing");
  button.onclick = () => {
    addButtonClicked();
  };
})();

const createListItem = (todo: string, id: string) => {
  const list = document.getElementById("todo-list");
  if (!list) throw new Error("Element not found");
  
  const listItem = document.createElement("li");
  listItem.id = id;
  listItem.classList.add("list-group-item");
  listItem.innerHTML = `${todo} <button id=${id}-Delete class='btn btn-danger float-end'>Delete</button>`;
  list.appendChild(listItem);

  const listItemDeleteButton = document.getElementById(`${id}-Delete`);
  if (!listItemDeleteButton) throw new Error("Delete button not found");
  listItemDeleteButton.onclick = () => {
    deleteButtonClicked(id);
  }
}

const deleteListItem = (id: string) => {
  const list = document.getElementById("todo-list");
  if (!list) throw new Error("Element not found");
  const deleteItem = document.getElementById(id);
  if (!deleteItem) throw new Error("Item to delete not found");
  list.removeChild(deleteItem);
}

const addButtonClicked = async () => {
  const newItem = (document.getElementById("todo-input") as HTMLInputElement).value;
  const id = (await createTodo(newItem)).id;
  createListItem(newItem, id);
}

const deleteButtonClicked = async (id: string) => {
  deleteTodo(id);
  deleteListItem(id);
}

async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch("http://localhost:3000/todos");
  return response.json();
}


async function createTodo(newItem: string): Promise<Todo> {
  const response = await fetch("http://localhost:3000/todo", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      value: newItem,
    }),
  });
  return response.json();
}

async function deleteTodo(id: string): Promise<Todo> {
  const response = await fetch(`http://localhost:3000/todo/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
