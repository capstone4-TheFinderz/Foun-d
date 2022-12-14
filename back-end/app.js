const express = require("express");
const cors = require("cors");
const userController = require("./controllers/users");
const itemsController = require("./controllers/items")
const foundItemsController = require("./controllers/foundItems")
const messagesController = require("./controllers/messages")
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userController);
app.use("/items", itemsController)
app.use("/found", foundItemsController)
app.use("/messages", messagesController)

app.get("/", (req, res) => {
  res.send("Find that missing item!");
});

app.get("*", (req, res) => {
  res.status(404).send("Not found!");
});

module.exports = app;
