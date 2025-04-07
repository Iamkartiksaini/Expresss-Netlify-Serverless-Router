class NetlifyRouter {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      DELETE: {},
      PATCH: {},
      // You can add more methods like PUT, DELETE, etc. if needed
    };
  }

  get(path, handler) {
    this.routes.GET[path] = handler;
  }

  post(path, handler) {
    this.routes.POST[path] = handler;
  }

  delete(path, handler) {
    this.routes.DELETE[path] = handler;
  }

  patch(path, handler) {
    this.routes.PATCH[path] = handler;
  }

  // Function to extract path parameters
  extractParams(path, pathname) {
    const pathSegments = path.split("/").filter(Boolean);
    const pathnameSegments = pathname.split("/").filter(Boolean);
    const params = {};
    let isPathMatched = true;

    if (pathSegments.length !== pathnameSegments.length) {
      return null;
    }
    pathSegments.forEach((segment, index) => {
      if (segment.startsWith(":")) {
        const paramName = segment.slice(1);
        params[paramName] = pathnameSegments[index];
      } else {
        isPathMatched = segment === pathnameSegments[index] ? true : null;
      }
    });

    return isPathMatched && params;
  }

  async handleRequest(request, context, functionPath) {
    const method = request.method;
    const url = new URL(request.url);
    const pathname = url.pathname.replace(functionPath, "");
    let body = {};
    if (method === "POST" || method === "PATCH") {
      body = await request.json();
    }
    const query = Object.fromEntries(url.searchParams.entries());
    for (const path in this.routes[method]) {
      const params = this.extractParams(path, pathname);
      if (params !== null) {
        return await this.routes[method][path]({
          params,
          query,
          body,
          request,
          context,
        });
      }
    }

    return new Response(JSON.stringify({ message: "Route Not Found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
export default NetlifyRouter;
