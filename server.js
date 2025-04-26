const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

const users = [
  { username: "alice", age: 25, email: "alice@example.com" },
  { username: "bob", age: 30, email: "bob@example.com" },
  { username: "charlie", age: 28, email: "charlie@example.com" },
];

app.use(express.json());

app.post("/signup", (req, res) => {
  const { username, age, email } = req.body;

  if (!username || !age || !email) {
    return res.status(400).send("All fields are required");
  }
  const ExistingUser = users.find((user) => user.email === email);
  if (ExistingUser) {
    return res.status(400).send("User already exists");
  }

  users.push({ username, age, email });
  res.status(202).send("user added successfully");
});

app.get("/users", (req, res) => {
  const { email, username, age } = req.body;
  const ExistUser = users.find(
    (user) =>
      user.email === email || user.username === username || user.age === age
  );
  if (!ExistUser) {
    return res.status(404).send("user not found");
  }
  res.status(200).send(ExistUser);
});

app.listen(port, (req, res) => {
  console.log("server is running on port 3000");
});
