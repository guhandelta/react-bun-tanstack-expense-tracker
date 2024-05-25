import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

type Expense = {
    id: number;
    title: string;
    amount: number;
};

const fakeExpenses: Expense[] = [
    {id: 1, title: 'Groceries', amount: 100},
    {id: 2, title: 'Rent', amount: 1000},
    {id: 3, title: 'Car', amount: 5000},
];

const createExpenseSchema = z.object({
    title: z.string().min(3).max(50),
    amount: z.number().int().positive(),
});

// The endpoints can be chained togetheror created separately as done in an Node/Express app
export const ExpensesRoutes = new Hono()
    .get('/', async c => {
        return c.json(fakeExpenses)
    })
    // zValidator() happens before the route is reached and made sure the data passed in is valid
    .post('/', zValidator("json", createExpenseSchema), async c => {
        const data = await c.req.valid("json"); // .json() is replaced with valid("json"), which contain anything that was validated before the route
        // An Expense object is created from the data received from the request only if it matches the TS Object that it is expected to be, else it will throw an error
        const expense = createExpenseSchema.parse(data);
        fakeExpenses.push({ ...expense, id: fakeExpenses.length+1});
        console.log(expense);
        
        return c.json(expense);
    })