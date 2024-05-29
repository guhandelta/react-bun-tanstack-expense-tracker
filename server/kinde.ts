import { GrantType, createKindeServerClient, type SessionManager } from "@kinde-oss/kinde-typescript-sdk";
import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

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
