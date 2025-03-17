# Express-Netlify-Serverless-Router

The Netlify Serverless Functions Router Utility provides an easy and intuitive way to create serverless functions on Netlify, similar to how you would define routes in Express.js. This utility simplifies the process of handling HTTP requests and routing, making it easier to build scalable serverless applications.

## Features

- Easy route definition similar to Express.js
- Simplified handling of HTTP requests
- Scalable serverless applications on Netlify

## Installation

To install the Netlify Serverless Router Utility, you can use npm. Make sure to install the required dependencies:

```bash
npm install express serverless-http body-parser
```

## Usage

Here is a basic example of how to use the Netlify Serverless Router Utility:

```javascript
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
    res.status(200).send({ data: "success" });
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
```

## Examples

You can test the following endpoint:

[https://serverless-ejs.netlify.app/.netlify/functions/main/new](https://serverless-ejs.netlify.app/.netlify/functions/main/new)
