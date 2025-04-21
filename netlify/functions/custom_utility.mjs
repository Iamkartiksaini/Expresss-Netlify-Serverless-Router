import GenerateResponse from "../../custom-light-utility/GenrateResponse";
import NetlifyRouter from "../../custom-light-utility/Router";
import usersData from "../store/users.json";

const netlifyfilePath = "/.netlify/functions/custom_utility"; // IMPORTANT
// FOR DEV MODE: const netlifyfilePath = "/.netlify/functions/custom_utility"; // IMPORTANT
const router = new NetlifyRouter();

router.get("/help", async (props) => {
  const { params, query, body, request, context } = props;
  const baseUrl = request.url;
  return GenerateResponse({
    body: {
      data: "Hello this is a root route of custom_utility uri",
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
    },
  });
});

router.get("/users", async (props) => {
  const { params, query, body, request, context } = props;
  return GenerateResponse({
    body: { data: usersData, message: "Users List" },
  });
});

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
  const { params, query, body, request, context } = props;
  return GenerateResponse({
    body: {
      data: "User Added Successfully (Simulation)",
      payload: body,
    },
    other: {
      status: 201,
    },
  });
});

router.delete("/users/:id", async (props) => {
  const { params, query, body, request, context } = props;
  const userId = params.id;
  const userDetails = usersData.find((user) => user.id == userId);
  return GenerateResponse({
    body: {
      data: userDetails,
      message: "User Deleted Successfully (Simulation)",
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
