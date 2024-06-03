import { index, numeric, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

/*
    This is the current structure of the entire table, which can be modified later. One benefit of using drizzle here is that it is not required to perform any create_table or alter_table tasks later, rather executing the same task by modifying this object to be the current state of the database. Then, apply migration to apply the changes, which will be what has been specified here, and TypeScript safety is also available here, by default.
*/
export const expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    title: text('title').notNull(),
    /*
        Expense has an numeric value, which should also hold a decimal value or floating point numbers due to the fact that one of the expenses has a decimal number.

        This is a decimal number => numeric('amount', { precision: 12, scale: 2 })

        But JS doesn't have any sense about a decimal numbers, though it has doubles but it cannot be used here to represent decimal numbers because they are not accurate.
    */
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
}, 
// creating indexes, as per how the data will be queried/accessed. It is a good practice to create indexes on the columns that will be queried oftenm=, to make the querying faster
(expenses) => {
    return {
        // creating an index for userId as it will be used as the index to query expenses by user
        userIdIndex: index('name_idx').on(expenses.userId),
    }
});