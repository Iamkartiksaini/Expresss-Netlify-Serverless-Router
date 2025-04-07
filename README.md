# Express-Netlify-Serverless-Router

The **Netlify Serverless Functions Router Utility** provides an easy and intuitive way to create serverless functions on Netlify—similar to defining routes in Express.js. This utility simplifies handling HTTP requests and routing, making it easier to build scalable serverless applications.

---

## 🚀 1. The Custom Light Utility Way

Here’s a basic example of how to use the **Netlify Serverless Router Utility**:

```javascript
import NetlifyRouter from "../../Custom-light-utility/Router";
import GenerateResponse from "../../custom-light-utility/GenrateResponse"; // Optional

const netlifyfilePath = "/.netlify/functions/custom_utility"; // Important
const router = new NetlifyRouter();

router.get("/users/:id", async (props) => {
  const { params, query, body, request, context } = props;
  const userId = params.id;
  const userDetails = usersData.find((user) => user.id == userId);

  return GenerateResponse({
    body: userDetails,
    header: {
      "Set-Cookie":
        "netlify_functions=custom_utility; Max-Age=10; HttpOnly; Secure; SameSite=Strict",
    },
  });
});

router.post("/users", async (props) => {
  const { body } = props;
  return GenerateResponse({
    body: {
      data: "User Added Successfully (Simulation)",
      extra: body,
    },
    other: {
      status: 201,
    },
  });
});

export default async function handler(request, context) {
  try {
    return await router.handleRequest(request, context, netlifyfilePath);
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
```

### 🔗 Example Endpoints

- [Get Help](https://serverless-ejs.netlify.app/.netlify/functions/custom_utility/help)
- [Get Users List](https://serverless-ejs.netlify.app/.netlify/functions/custom_utility/users)
- [Get User by ID](https://serverless-ejs.netlify.app/.netlify/functions/custom_utility/users/1)

---

## ⚙️ 2. The Express Way

Here is a basic example of how to use the **Netlify Serverless Router** with **Express.js**:

### ✅ Features

- Easy route definition similar to Express.js
- Simplified handling of HTTP requests
- Scalable serverless applications on Netlify

---

### 📦 Installation

Install the required dependencies:

```bash
npm install express serverless-http body-parser
```

---

### 🧩 Example Code

```javascript
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();

app.use(bodyParser.json());
app.use("/.netlify/functions/main", router); // IMPORTANT: path must route to lambda
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
```

### 🔗 Example Endpoints

- [Get Root](https://serverless-ejs.netlify.app/.netlify/functions/main/)
- [Get Users List](https://serverless-ejs.netlify.app/.netlify/functions/main/users)
- [Get User by ID](https://serverless-ejs.netlify.app/.netlify/functions/main/users/1)
