# Netlify Serverless Utility

This repository contains a simple routing utility for Netlify functions, allowing you to define and handle routes easily.

## Features

- Define routes for different HTTP methods (GET, POST, DELETE, PATCH).
- Extract path parameters from URLs.
- Handle requests and responses in a structured way.

## Installation

To use this utility, ensure you have Node.js installed. You can clone this repository and install the necessary dependencies.

## Usage

### Router

The `NetlifyRouter` class allows you to define routes and handle requests.

#### Example

```javascript
import NetlifyRouter from "./Router";
const router = new NetlifyRouter();

router.get("/example", async (props) => {
  return new Response("This is a GET request");
});

router.post("/example/:id", async (props) => {
  const { params } = props;
  return new Response(`This is a POST request with ID: ${params.id}`);
});
```

### TestRoute

The `TestRoute.js` file demonstrates how to use the `NetlifyRouter` to define specific routes.

#### Example

```javascript
import NetlifyRouter from "./Router";
const router = new NetlifyRouter();

router.get("/test", async (props) => {
  return new Response("hello this is a get request");
});

router.get("/test2/:name", async (props) => {
  const { params } = props;
  return new Response("hello this is /test2/" + params?.name);
});

router.post("/hello", async (props) => {
  return new Response("hello this is a post request");
});

router.post("/hello/:test", async (props) => {
  const { params } = props;
  return new Response("hello this is a post hello/:test params request");
});

export default async function handler(request, context) {
  try {
    return await router.handleRequest(
      request,
      context,
      "/.netlify/functions/testRoutes" //pass the files pathname
    );
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

## Running Locally

To test your Netlify functions locally, you can use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify dev
```

This will start a local server and allow you to test your functions.

## License

This project is licensed under the MIT License.
