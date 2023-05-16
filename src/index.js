const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const customer = users.find((customer) => customer.username === username);

  if (!customer) {
    return response.status(404).json({
      error: "username not found!",
    });
  }

  request.customer = customer;

  return next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const result = users.some((user) => user.username === username);

  if (result) {
    return response.status(400).json({
      error: "username already exists!",
    });
  }

  const user = {
    id: uuidv4(),
    name: name,
    username: username,
    todos: [],
  };

  users.push(user);

  return response.status(201).json(user);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { customer } = request;

  return response.json(customer.todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { customer } = request;

  const todos = {
    id: uuidv4(),
    title: title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  customer.todos.push(todos);

  return response.status(201).json(todos);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { id } = request.params; // parâmetro da rota
  const { title, deadline } = request.body;
  const { customer } = request;

  const todo = customer.todos.find((todo) => todo.id === id);

  if (!todo) {
    return response.status(404).json({
      error: "todo not found!",
    });
  }

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.status(201).json(todo);
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { customer } = request;

  const todoDone = customer.todos.find((todo) => todo.id === id);

  if (!todoDone) {
    return response.status(404).json({
      error: "Todo not found!",
    });
  }

  todoDone.done = true;

  return response.json(todoDone);
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { customer } = request;

  const excludeTodo = customer.todos.find((todo) => todo.id === id);

  if (!excludeTodo) {
    return response.status(404).json({
      error: "Todo not found!",
    });
  }

  customer.todos.splice(excludeTodo, 1);

  return response.status(204).send();
});

module.exports = app;
