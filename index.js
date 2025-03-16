const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Hello, Netlify Serverless Functions!");
});

app.use(express.json());

app.post("/api/data", (req, res) => {
  // Handle the POST request and process the data
  const data = req.body;
  // Perform some logic with the data
  res.json({ message: "Data received successfully" });
});

exports.handler = (event, context, callback) => {
  const { method, url, body } = event;
  const req = { method, url, body };
  const res = {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    send: (data) => {
      callback(null, {
        statusCode: res.statusCode,
        body: JSON.stringify(data),
        headers: res.headers,
      });
    },
  };

  app(req, res);
};
