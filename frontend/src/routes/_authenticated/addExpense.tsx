import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
// import type { FieldApi } from '@tanstack/react-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'

export const Route = createFileRoute('/_authenticated/addExpense')({
    component: AddExpense
})

function AddExpense(){
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
            title: '',
            amount: 0
        },
        onSubmit: async ({ value }) => {
            await new Promise((resolve) => setTimeout(resolve, 3000));

            const res = await api.expenses.$post({ json: value });
            if(!res.ok) throw new Error('Error adding expense');

            navigate({ to: '/expenses' });
        }
    });


    return (
        <div className="p-2">
            <h2 className=' font-bold text-center my-4'>Add Expense</h2>
                {/* <form.Provider> */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            void form.handleSubmit();
                        }}
                        className="max-w-xl m-auto"
                    >
                            <form.Field 
                                name="title"
                                children={(field) => (
                                    <>
                                        <Label htmlFor={field.name}>Title:</Label>&emsp;
                                        <Input
                                            id={field.name}
                                            className='bg-gray-900'
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {/* To show the validation state of the current Field, usually it's wrapped in a function and used as a component Eg: <FieldInfo /> */}
                                        {field.state.meta.touchedErrors ? (
                                            <em>{field.state.meta.touchedErrors}</em>
                                        ) : null}
                                    </>
                                )}
                            /> 
                            <br /><br /><br />
                            <form.Field 
                                name="amount"
                                children={(field) => (
                                    <>
                                        <Label htmlFor={field.name}>Amount:</Label>&emsp;
                                        <Input
                                            id={field.name}
                                            className='bg-gray-900'
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            type='number'
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                        />
                                        {/* To show the validation state of the current Field, usually it's wrapped in a function and used as a component Eg: <FieldInfo /> */}
                                        {field.state.meta.touchedErrors ? (
                                            <em>{field.state.meta.touchedErrors}</em>
                                        ) : null}
                                    </>
                                )}
                            />
                            <br /><br /><br />
                            <form.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                                children={([canSubmit, isSubmitting]) => (
                                <Button type="submit" disabled={!canSubmit}>
                                    {isSubmitting ? 'Adding Expense...' : 'Add Expense'}
                                </Button>
                                )}
                            />
                    </form>
                {/* </form.Provider> */}
        </div>
    )
}

