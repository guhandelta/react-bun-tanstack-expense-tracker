import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { ExpensesRoutes } from './routes/expenses';
import { serveStatic } from 'hono/bun';

const app = new Hono();

// Utilize the logger middleware from Hono
app.use('*', logger());

app.route('/api/expenses', ExpensesRoutes);

// Hosting the static files, generated from the buiid, from the frontend/dist folder
app.get('*', serveStatic({ root:'./frontend/dist' }));

/* Fallback: The server can handle any API routes, but if the reqquest does not match any of the API routes on the server, then it will serve the React app using the index.html file from the frontend/dist folder.

Anything that is not handled by the API would be handled by the React app without throwing a 404 or anyother perplexign server errors, which gives a better user experience */
app.get('*', serveStatic({ path: './frontend/dist/index.html' }));

export default app;