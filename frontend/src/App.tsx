
// import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import './App.css' 
import { api } from './lib/api';
import { useQuery } from '@tanstack/react-query';

function App() {

  async function getTotalSpent() {
    const res = await api.expenses['total-spent'].$get();

    if (!res.ok) {
      throw new Error('Failed to fetch total spent');
    }

    const { total } = await res.json();
    return total;
  }

  /*with React 19, the entire functionality of useState and useEffect hooks here, can be shrunk within the use() hook
  const totalSpent = use(api.expenses['total-spent'].$get());

  Even Suspense and SuspenseQuery can be used to handle the loading state of the data, and use Suspense Boundaies and Error Boundaries, but Tanstack Query provides a lot more options
  */

  const { isPending, data, error } = useQuery({ queryKey: ['total-spent'], queryFn: getTotalSpent });

  error && <p>Error: { error.message }</p>

  return (
    <>
      <Card className='w-[350px] m-auto'>
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>This is what you've spent:</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{ isPending ? '...' : data }</p>
        </CardContent>
      </Card>
    </>
  )
}

export default App
