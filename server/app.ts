import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { ExpensesRoutes } from './routes/expenses';

const app = new Hono();

// Utilize the logger middleware from Hono
app.use('*', logger());

app.route('/api/expenses', ExpensesRoutes);

export default app;