import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import { getUser } from "../kinde";
import { db } from "../db";
import { expenses as expenseTable } from '../db/schema/expenses';
import { eq } from "drizzle-orm";

const fakeExpenses: Expense[] = [
    {id: 1, title: 'Groceries', amount: "100"},
    {id: 2, title: 'Rent', amount: "1000"},
    {id: 3, title: 'Car', amount: "5000"},
];

const expemseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(75),
    // In the database, it is still a numeric(decimal) value, and we can still perform some math operations on it, but as soons as it comes into the JavaScript world it becomes a string, to make sure that everything is safe
    amount: z.string(),
});



const createExpenseSchema = expemseSchema.omit({id: true});

// To get the zod obhect as a TypeScript type
type Expense = z.infer<typeof expemseSchema>;

// The endpoints can be chained togetheror created separately as done in an Node/Express app
export const ExpensesRoutes = new Hono()
    .get('/', getUser, async c => {
        // Grab the user object from the context => extract the User ID to get the expenses for that user
        const user = c.var.user;

        const expenses = await db
            .select()
            .from(expenseTable)
            .where( 
                eq(
                    expenseTable.userId, user.id
                )
            );

        return c.json({ expenses })
    })
    /* Dynamic route that takes in an id as path param and returns the expense with that id
    Hono] allows us to pass in a regex to validate the path param, the one passed in here is for 1 or more numbers only
    If the hte path param is not a number, it will throw a 404 error
    */
    .get('/:id{[0-9]+}', getUser, async c => {
        const id = Number.parseInt(c.req.param('id'));
        const expense = fakeExpenses.find(e => e.id === id);
        if (!expense) {
            // returns a `404 not found` error if the expense with the id is not found
            return c.notFound();
        }
        return c.json({expense})
    })
    .get('/total-spent', getUser, async c => {
        // This is just to simulate a delay in the API response
        await new Promise(resolve => setTimeout(resolve, 1000));
        const total = fakeExpenses.reduce((acc, curr) => acc + +curr.amount, 0);
        return c.json({ total })
    })
    // zValidator() happens before the route is reached and made sure the data passed in is valid
    .post('/', getUser, zValidator("json", createExpenseSchema), getUser, async c => {
        const expense = await c.req.valid("json"); // .json() is replaced with valid("json"), which contain anything that was validated before the route
        // Grab the user details from the user object in the context
        const user = c.var.user;
        
        const result = await db.insert(expenseTable).values({
            //  The expense that has been validated with zod
            ...expense,
            userId: user.id
        })
        // This will go back the result of inserting the expense into the database
        .returning();
        

        c.status(201); // returns a `201 created` status code
        return c.json(result);
    })
    .delete('/:id{[0-9]+}', getUser, async c => {
        const id = Number.parseInt(c.req.param('id'));
        const expense = fakeExpenses.findIndex(e => e.id === id);
        if (!expense) {
            // returns a `404 not found` error if the expense with the id is not found
            return c.notFound();
        }
        const deletedExpense = fakeExpenses.splice(expense, 1)[0];
        return c.json({ expense: deletedExpense})
    })