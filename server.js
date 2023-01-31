const cors = require("cors");
const express = require("express");
const fs = require("fs");

const { v1: uuidv1 } = require("uuid");

const app = express();
const port = 2000;

app.use(cors());
app.use(express.json());

//products

app.get("/products", (req, res) => {
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      let products = JSON.parse(data);
      res.status(200).json(products);
    }
  });
});
app.post("/products", (req, res) => {
  console.log(req.body);
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      let savedData = JSON.parse(data);
      savedData.push({ ...req.body, id: uuidv1().split("-")[0] });
      fs.writeFile("./data/products.json", JSON.stringify(savedData), (err) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.status(200).send({ message: "added" });
        }
      });
    }
  });
});

app.delete("/products/:id", (req, res) => {
  console.log(req.params);
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      let products = JSON.parse(data);
      products = products.filter((product) => product.id !== req.params.id);
      fs.writeFile("./data/products.json", JSON.stringify(products), (err) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.status(200).send({ message: "added" });
        }
      });
    }
  });
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
