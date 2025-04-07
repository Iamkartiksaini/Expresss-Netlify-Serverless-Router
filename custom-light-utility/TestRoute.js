import NetlifyRouter from "./Router";
const router = new NetlifyRouter();

router.get("/test", async (props) => {
  const { params, query, body, request, context } = props;
  return new Response("hello this is a get request");
});

router.get("/test2/:name", async (props) => {
  const { params, query, body, request, context } = props;
  return new Response("hello this is /test2/" + params?.name);
});

router.post("/hello", async (props) => {
  const { params, query, body, request, context } = props;
  return new Response("hello this is a post request");
});

router.post("/hello/:test", async (props) => {
  const { params, query, body, request, context } = props;
  return new Response("hello this is a post hello/:test params request");
});

export default async function handler(request, context) {
  try {
    return await router.handleRequest(
      request,
      context,
      "/.netlify/functions/testRoutes"
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
