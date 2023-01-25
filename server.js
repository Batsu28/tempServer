const express = require("express");
var cors = require("cors");

const app = express();
const port = 2000;

const data = require("./data.json");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/products", (req, res) => {
	console.log("product-iin req irlee"), res.status(200).json(data.products);
});
app.get("/logInUser", (req, res) => {
	console.log("logInUsers-iin req irlee"), res.status(200).json(data.logInUser);
});
app.get("/orders", (req, res) => {
	console.log("users-iin req irlee"), res.status(200).json(data.orders);
});

app.get("/users", (req, res) => {
	console.log("users req"), res.status(200).json(data.users);
});
app.post("/users", (req, res) => {
	const user = req.body;
	data.users.push(user);
	res.status(201).send("uploaded");
	res.status(403).send("error403");
	res.status(404).send("error404");
});

app.listen(port, () => {
	console.log(`server is starting in ${port} port`);
});
