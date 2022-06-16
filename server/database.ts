type Todo = {
  id: string;
  value: string;
};

export class Database {
  static todos: Todo[] = [];

  constructor() {}

  static add(value: string) {
    const id = Date.now();
    Database.todos.push({
      id: id.toString(),
      value: value,
    });
  }

  static getAll(): Todo[] {
    return Database.todos;
  }

  static delete(id: string) {
    Database.todos = Database.todos.filter((todo) => todo.id !== id);
  }
}
