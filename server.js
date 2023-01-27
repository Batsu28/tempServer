const cors = require("cors");
const express = require("express");
const { v1: uuidv1 } = require("uuid");

const app = express();
const port = 2000;

const data = require("./data.json");

app.use(cors());
app.use(express.json());

app.get("/products", (req, res) => {
  console.log("product-iin req irlee"), res.status(200).json(data.products);
});
app.get("/logInUser", (req, res) => {
  console.log("logInUsers-iin req irlee"), res.status(200).json(data.logInUser);
});
app.get("/orders", (req, res) => {
  console.log("users-iin req irlee"), res.status(200).json(data.orders);
});

app.post("/products", (req, res) => {
  data.products.push({ ...req.body, id: uuidv1().split("-")[0] });
  res.status(201).send("uploaded");
  res.status(403).send("error403");
});
app.get("/test", (req, res) => {
  console.log("test req irlee"), res.status(200).json(data.test);
});
app.post("/test", (req, res) => {
  console.log(req.body);
  data.test.push({ ...req.body, id: uuidv1() });
  res.status(201).send("uploaded");
  res.status(403).send("error403");
});

app.delete("/test/:id", (req, res) => {
  const filter = data.test.filter((one) => one.id !== req.params.id);
  data.test = filter;
  res.send(`id: ${req.params.id} deleted successfully`);
});
app.patch("/test/:id", (req, res) => {
  console.log("req.params.id");
  console.log(req.body.name);
  let test = data.test.find((fu) => fu.id === req.params.id);

  data.test[data.test.indexOf(test)] = req.body;

  res.send(`id: ${req.params.id} deleted successfully`);
});

// app.put("/products/:id", (req, res) => {
//   console.log(req.params.id);
// });

app.listen(port, () => {
  console.log(`server is starting in ${port} port`);
});
