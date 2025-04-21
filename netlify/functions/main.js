const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();

app.use(bodyParser.json());
app.use("/.netlify/functions/main", router); // IMPORTANT: path must route to lambda
// FOR DEV MODE: app.use("/.netlify/functions/main", router);
const userRouter = require("../../Routes/user");

router.use("/users", userRouter);

router.get("/", async (req, res) => {
  const baseUrl = req.url;
  return res.json({
    data: "Hello this is a root route of Express js uri",
    allAvailableRoutes: [
      {
        method: "GET",
        name: "Get Users",
        path: baseUrl + "users",
      },
      {
        method: "GET",
        name: "Get User By Id",
        path: baseUrl + "users/:id",
      },
      {
        method: "POST",
        name: "Add User",
        path: baseUrl + "users",
      },
      {
        method: "DELETE",
        name: "Delete User By Id",
        path: baseUrl + "users/:id",
      },
    ],
  });
});

module.exports = app;
module.exports.handler = serverless(app);
