const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv/config");
const api = process.env.API_URL;
const productsRouter = require("./routes/products");
const categoryRouter = require("./routes/categories");

//middleware
app.use(cors);
app.options("*", cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoryRouter);
mongoose
  .connect(process.env.CONNECTION_STRING, {})
  .then(() => {
    console.log("Database connection is ready");
  })
  .catch((err) => {
    console.log(err);
    console.log(process.env.CONNECTION_STRING);
  });

app.listen(8000, () => {
  console.log("Server running http://localhost:8000");
});
