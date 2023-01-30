const cors = require("cors");
const express = require("express");
const { v1: uuidv1 } = require("uuid");

const app = express();
const port = 2000;

const data = require("./data.json");

app.use(cors());
app.use(express.json());

//products

app.get("/products", (req, res) => {
  console.log("product list avah req irlee"),
    res.status(200).json(data.products);
});
app.post("/products", (req, res) => {
  data.products.push({ ...req.body, id: uuidv1().split("-")[0] });
  res.status(201).send("product uploaded");
  res.status(403).send("product error403");
});
app.delete("/products/:id", (req, res) => {
  console.log(req.params);
  data.products = data.products.filter(
    (product) => product.id !== req.params.id
  );
  res.send(`product id: ${req.params.id} is deleted successfully`);
});
app.put("/products/:id", (req, res) => {
  console.log(req.params.id);
  res.send(`${req.params.id}`);
});

//logInUser

app.get("/logInUser", (req, res) => {
  console.log("logInUsers list avah req irlee"),
    res.status(200).json(data.logInUser);
});

//orders

app.get("/orders", (req, res) => {
  console.log("order list avah req irlee"), res.status(200).json(data.orders);
});

// tests

app.get("/test", (req, res) => {
  console.log("test req irlee"), res.status(200).json(data.tests);
});
app.post("/test", (req, res) => {
  console.log(req.body);
  data.tests.push({ ...req.body, id: uuidv1() });
  res.status(201).send("test uploaded");
  res.status(403).send("test error403");
});
app.delete("/test/:id", (req, res) => {
  const filter = data.tests.filter((one) => one.id !== req.params.id);
  data.tests = filter;
  res.send(`test id: ${req.params.id} deleted successfully`);
});
app.patch("/test/:id", (req, res) => {
  console.log("req.params.id");
  console.log(req.body.name);
  let test = data.tests.find((test) => test.id === req.params.id);

  data.tests[data.tests.indexOf(test)] = req.body;

  res.send(`test id: ${req.params.id} edited successfully`);
});

app.listen(port, () => {
  console.log(`server is starting in ${port} port`);
});
