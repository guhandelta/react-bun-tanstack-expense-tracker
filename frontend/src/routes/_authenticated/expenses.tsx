import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from '@/components/ui/skeleton';


export const Route = createFileRoute('/_authenticated/expenses')({
    component: Expenses
})

type Expense = { 
    id: number, 
    title: string 
    amount: string, 
}

function Expenses() {

    async function getAllExpenses() {
        const res = await api.expenses.$get();

        if (!res.ok) {
            throw new Error('Failed to fetch total spent');
        }

        const expenses = await res.json();
        return expenses;
    }

    const { isPending, data, error } = useQuery({ 
        queryKey: ['get-all-expenses'], 
        queryFn: getAllExpenses 
    });

    data && console.log('data:\t',typeof data);

    error && <p>Error: { error.message }</p>

    return (
        <div className="p-2 max-w-3xl mx-auto">
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="border border-double border-white w-[100px]">ID</TableHead>
                        <TableHead className="border border-double border-white w-[100px]">Title</TableHead>
                        <TableHead className="border border-double border-white text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {isPending ? 
                    Array(3).fill(0).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell className="font-medium">
                                <Skeleton className="h-4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4" />
                            </TableCell>
                        </TableRow>            
                    ))
                :
                data?.map(({ id, amount, title }: Expense) => (
                    <TableRow>
                        <TableCell className="border border-solid border-white font-medium text-center">{id}</TableCell>
                        <TableCell className='border border-solid border-white text-center'>{title}</TableCell>
                        <TableCell className='border border-solid border-white text-center'>{amount}</TableCell>
                    </TableRow>            
                ))
                }
                </TableBody>
            </Table>
        </div>
    )
    
}