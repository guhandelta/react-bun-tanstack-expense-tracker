import { Hono } from "hono";
import { kindeClient, sessionManager } from "../kinde";

// The app can access teh KindClient anytime it needs to do something with user authentication

export const authRoute = new Hono()
// Since the session needs access to the current context, and since the session is set as a function, the current context  is passed to the session
.get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c));
    return c.redirect(loginUrl.toString());
})
.get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c));
    return c.redirect(registerUrl.toString());
})
// What Kinde will call once it's done logging in/registering the user
.get("/callback", async (c) => {
    const url = new URL(c.req.url);
    await kindeClient.handleRedirectToApp(sessionManager(c), url);
    return c.redirect("/");
})
.get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
})
// This route is just to check with the server if the user is authenticated or not
.get('/me', async (c) => {
    const manager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(manager); // Boolean: true or false

    if(!isAuthenticated){
        return c.json({ error: "Unauthorized" }, 401);
    }

    // If the user is authenticated, send the user data to the client, when accessing the /api/me route
    const user = await kindeClient.getUserProfile(manager);
    return c.json({ user });
});