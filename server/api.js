const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("dotenv").config(); // Load environment variables
const configs = require("./src/common/contant");

// Servers configuration

const app = express();

const routes = require("./src/module/route");
const expressPort = process.env.EXPRESS_PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    return res.status(200).json({});
  }
  next();
});

// Define routes here

app.use("/api", routes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello !! TESTING DB Updated",
    url: `${req.protocol}://${req.get("host")}`,
  });
});

mongoose
  .connect(configs.mongoUrl.TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected!!!");

    app.listen(expressPort, () =>
      console.log(`Server running on port ${expressPort}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
