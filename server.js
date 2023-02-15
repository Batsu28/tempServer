const cors = require("cors");
const express = require("express");
const fs = require("fs");

const { v1: uuidv1 } = require("uuid");

const app = express();
const port = 2000;

app.use(cors());
app.use(express.json());

// get Products && Product (Client)

app.get("/productsFilter/:cate/:num", (req, res) => {
  fs.readFile("./data/products.json", (error, data) => {
    if (error) {
      res.status(500).send({ message: error });
    } else {
      let products = JSON.parse(data);
      let category = req.params.cate;
      let num = req.params.num;

      if (category === "all") {
        num == 0
          ? res.status(200).send(products.slice(0, 8))
          : res
              .status(200)
              .send(products.slice(0 + (num - 1) * 16, 16 + (num - 1) * 16));
      } else if (category === "popular") {
        num == 0
          ? res.status(200).send(products.slice(0, 8))
          : res.status(200).send(products.slice(0, 8));
      } else if (category === "sale") {
        let filteredProds = products.filter((product) => product.sale > 0);
        num == 0
          ? res.status(200).send(filteredProds.slice(0, 8))
          : res
              .status(200)
              .send(
                filteredProds.slice(0 + (num - 1) * 16, 16 + (num - 1) * 16)
              );
      } else {
        let filteredProds = products.filter(
          (product) => product.category === category
        );

        num == 0
          ? res.status(200).json(filteredProds.slice(0, 8))
          : res
              .status(200)
              .json(
                filteredProds.slice(0 + (num - 1) * 16, 16 + (num - 1) * 16)
              );
      }
    }
  });
});

app.get("/product/:id", (req, res) => {
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      let products = JSON.parse(data);
      let product = products.filter((product) => product.id === req.params.id);
      res.status(200).json(...product);
    }
  });
});

app.get("/products/lastPage", (req, res) => {
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      let products = JSON.parse(data);
      res.status(200).json(Math.ceil(products.length / 16));
    }
  });
});
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
          res.status(200).send(`product nemeglee`, products);
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
          res.status(200).send(`${req.params.id} id ustlaa`, products);
        }
      });
    }
  });
});

app.put("/products/:id", (req, res) => {
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      let products = JSON.parse(data);
      let patchedProduct = products.find((test) => test.id === req.params.id);

      products[products.indexOf(patchedProduct)] = {
        ...req.body,
        id: req.params.id,
      };

      fs.writeFile("./data/products.json", JSON.stringify(products), (err) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          res.status(200).send(`${req.params.id} id product uurchlult orloo`);
        }
      });
    }
  });
});

//logInUser

app.post("/user-log-in", (req, res) => {
  fs.readFile("./data/users.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      let users = JSON.parse(data);
      let logIn = req.body;
      let user = users.find(
        (user) =>
          user.username === logIn.username &&
          user.password === logIn.password &&
          user.role === "user"
      );
      console.log("check", user);
      if (user.length > 0) {
        res.status(200).send(user);
      } else {
        res.status(403).send({ message: "username password buruu bna" });
      }
    }
  });
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
