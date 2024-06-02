import { createFileRoute } from '@tanstack/react-router'
// import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { api } from '../lib/api';
import { useQuery } from '@tanstack/react-query';


export const Route = createFileRoute('/')({
    component: Index
})

async function getTotalSpent() {
    const res = await api.expenses['total-spent'].$get();

    if (!res.ok) {
        throw new Error('Failed to fetch total spent');
    }

    const { total } = await res.json();
    return total;
}

function Index() {

    /*with React 19, the entire functionality of useState and useEffect hooks here, can be shrunk within the use() hook
    const totalSpent = use(api.expenses['total-spent'].$get());

    Even Suspense and SuspenseQuery can be used to handle the loading state of the data, and use Suspense Boundaies and Error Boundaries, but Tanstack Query provides a lot more options
    */

    const { isPending, data, error } = useQuery({ 
        queryKey: ['total-spent'], 
        queryFn: getTotalSpent 
    });

    error && <p>Error: { error.message }</p>

    return (
    <>
        <Card className='w-[350px] m-auto flex'>
            <CardHeader className='mt-[12em]'>
                <CardTitle className='font-bold text-2xl my-4'>Total Spent</CardTitle>
                <CardDescription className='text-xl'>This is what you've spent:</CardDescription>
            </CardHeader>
            <CardContent className='pt-[74%] px-8'>
                <p className='font-bold'>{ isPending ? '...' : data }</p>
            </CardContent>
        </Card>
    </>
    )
}
