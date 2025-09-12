const express = require('express');
const dotenv = require("dotenv");
dotenv.config();  // ✅ must come first

const app = express();
const PORT = process.env.PORT || 5000;
const ejs = require("ejs");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./routes/user.route");
const adminRoute = require("./routes/admin.route");

app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use("/", userRoute);
app.use("/admin", adminRoute);

const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Mongodb iyaf connected");
  })
  .catch((err) => {
    console.log("Unable to connect to mongodb");
    console.log(err);
  });

app.listen(PORT, () => {
  console.log("Server is Running on port " + PORT);
});
