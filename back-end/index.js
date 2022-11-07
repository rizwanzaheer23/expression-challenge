require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const CarRoutes = require("./routes/CarRoutes");
const MakerRoutes = require("./routes/MakerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/cars", CarRoutes);
app.use("/makers", MakerRoutes);

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Mongodb connected");
  app.listen(process.env.PORT, () => {
    console.log("Server started");
  });
});
