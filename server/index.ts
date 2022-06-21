import express from "express";
import cors from "cors";
import { Database } from "./database";
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/todos", (req, res) => {
  const todos = Database.getAll();
  res.status(200).send(todos);
});

app.post("/todo", (request, res) => {
  const value = request.body.value;
  const id = Database.add(value);
  res.status(201).send({ message: "Successfully created todo", id: id });
});

app.delete("/todo/:id", (req, res) => {
  const id = req.params.id;
  const todo = Database.getTodo(id);
  if (!todo) {
    res.status(404).send({ message: "todo does not exist" });
  } else {
    Database.delete(id);
    res.status(200).send({ message: "Successfully deleted todo" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
