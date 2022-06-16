import express from "express";
import { Database } from "./database";
const app = express();
const port = 3000;
app.use(express.json());

app.get("/todos", (req, res) => {
  const todos = Database.getAll();
  res.status(200).send(todos);
});

app.post("/todo", (req, res) => {
  const value = req.body.value;
  Database.add(value);
  res.status(201).send({ message: "Successfully created todo" });
});

app.delete("/todo/:id", (req, res) => {
  const id = req.params.id;
  Database.delete(id);
  res.status(200).send({ message: "Successfully deleted todo" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
