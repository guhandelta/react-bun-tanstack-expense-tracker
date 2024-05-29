import { GrantType, createKindeServerClient, type SessionManager, type UserType } from "@kinde-oss/kinde-typescript-sdk";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { createFactory, createMiddleware } from "hono/factory";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
    authDomain: process.env.KINDE_DOMAIN || '',
    clientId: process.env.KINDE_CLIENT_ID || '',
    clientSecret: process.env.KINDE_CLIENT_SECRET,
    redirectURL: process.env.KINDE_REDIRECT_URI || '',
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI,
});

/* Kinde does have any opinion on how the session details would be stored, so when a users logs in or registers, the session details are stored in a token that it returns, which would be used to identify and authorize the current user, and how the tokens are stored is up to the developer.

In this app, the session details are stored in a cookie, so every request that is made to the server would contain the user details, to make it easier to authenticate and authorize the user and the request, at the server side. It is common for a React app to store the cookie in local storage, or session storage, but using cookies here is just a preference. */

let store: Record<string, unknown> = {};
// The entire system of funcitons that are used to manage the session by storing/handling the data from the server(tokens) in the cookie
export const sessionManager = (c: Context): SessionManager => ({
    // Get any of the items stored in the cookie, when required
    async getSessionItem(key: string) {
        const result = getCookie(c, key);
        return result;
    },
    // Anytime the server sends back a token, it will be stored in a cookie, in the browser
    async setSessionItem(key: string, value: unknown) {
        const cookieOptions = {
            httpOnly: true, // To make sure it cannot be accessed by JavaScript
            secure: true, // To make sure a SSL connection is req and it is only sent over HTTPS
            sameSite: "Lax", // To make sure to avoid CSRF attacks
        } as const;

        // Makes sure that the tokens sent from the server is set as a cookie
        if (typeof value === "string") {
            setCookie(c, key, value, cookieOptions);
        } else {
            setCookie(c, key, JSON.stringify(value), cookieOptions);
        }
    },

    // Delete the item out of the cookie to remove/end the session
    async removeSessionItem(key: string) {
        deleteCookie(c, key);
    },
    async destroySession() {
        ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
            deleteCookie(c, key);
        });
    },
});

/*The user details, esp the user name, ID would be required when accessing any of the expense routes, as all of the expenses routes should only work for any user who is currently logged in. the logic writen for the route /api/me would be required for every single authenticated route in the backend.

A custom middleware is composed in this file to make the user check logic written for /api/me, be available to all the other routes */

type Env = {
    Variables:{
        user: UserType, // Type of the user that is fetched from getUserProfile()
    }
};

export const getUser = createMiddleware<Env>(async (c, next) => {
    try {
        const manager = sessionManager(c);
        const isAuthenticated = await kindeClient.isAuthenticated(manager); // Boolean: true or false

        if(!isAuthenticated){
            return c.json({ error: "Unauthorized" }, 401);
        }
        
        // If the user is authenticated, send the user data to the client, when accessing the /api/me route
        const user = await kindeClient.getUserProfile(manager);
        
        // Instead of sending the user data, it is stored in the cookie, so that it can be accessed by the client
        /* await */ c.set("user", user);
        await next();
    } catch (error) {
        console.error(error);
        return c.json({ error: "Unauthorized" }, 401);
    }
})