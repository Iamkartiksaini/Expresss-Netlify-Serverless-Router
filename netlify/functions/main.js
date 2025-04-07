const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();

app.use(bodyParser.json());
app.use("/.netlify/functions/main", router); // path must route to lambda
// app.use("/", router);
const userRouter = require("../../Routes/user");

router.use("/user", userRouter);

router.get("/new", async (req, res) => {
  try {
    res
      .status(200)
      .send({ data: "This is GET /new request", message: "success" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "bad request" });
  }
});

router.get("/new/:id", async (req, res) => {
  try {
    res.status(200).send({ data: "id", id: req.params.id });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "bad request" });
  }
});

module.exports = app;
module.exports.handler = serverless(app);
