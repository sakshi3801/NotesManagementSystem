const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const filesRoute = require("./routes/files");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MONGODB"))
  .catch((err) => console.log(err));

app.use("/api/files", filesRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen("5000", () => {
  console.log("server online");
});
