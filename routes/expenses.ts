import { Hono } from "hono";

type Expense = {
    id: string;
    title: string;
    amount: number;
};

const expenses: Expense[] = [
    {id: '1', title: 'Groceries', amount: 100},
    {id: '2', title: 'Rent', amount: 1000},
    {id: '3', title: 'Car', amount: 5000},
];

// The endpoints can be chained togetheror created separately as done in an Node/Express app
export const ExpensesRoutes = new Hono()
    .get('/', async c => {
        return c.json(expenses)
    })
    .post('/', async c => {
        const expense:Expense = await c.req.json();
        console.log(expense);
        
        return c.json(expense);
    })