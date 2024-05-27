import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/addExpense')({
    component: AddExpense
})

function AddExpense(){
    return (
        <div>Add Expense(s)</div>
    )
}

