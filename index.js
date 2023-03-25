const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
require("dotenv").config();

app.use(express.json());
app.use("/api/v1", require("./src/v1/routes/auth"));

//connect DB
mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log("connected DB");
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(PORT, () => {
	console.log(`server is running on PORT ${PORT}`);
});
