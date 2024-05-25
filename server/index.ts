import app from "./app";

const PORT = process.env.PORT || 4000;
Bun.serve({
    port: PORT, // defaults to $BUN_PORT, $PORT, $NODE_PORT otherwise 3000
    // hostname: "mydomain.com", => Can be helpful to manually specify the host IP to bind to, when running this app on a VM defaults to "0.0.0.0"

    // This is the fn() that will be called when any request is made to the server
    // Now all the fetch requests are handled by the Hono library
    fetch: app.fetch
});

console.log("Hello via Bun!");