const express = require("express");
var cors = require("cors");

const data = require("./data.json");

const app = express();
const port = 2020;
app.use(cors());

app.get("/products", (req, res) => {
  console.log("product-iin req irlee"), res.status(200).json(data.products);
});
app.get("/users", (res, req) => {
  console.log("users-iin req irlee"), res.status(200).json(data.users);
});

app.listen(port, () => {
  console.log(`server is starting in ${port} port`);
});
