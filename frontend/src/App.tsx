import { useEffect, useState } from 'react'
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

function App() {

  useEffect(() => {
    async function fetchTotalSpent() {

      const res = await api.expenses['total-spent'].$get();
      const { total } = await  res.json();
      setTotalSpent(total);
    }
    fetchTotalSpent();
  }, []);

  const [totalSpent, setTotalSpent] = useState(0)

  return (
    <>
      <Card className='w-[350px] m-auto'>
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>This is what you've spent:</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{totalSpent}</p>
        </CardContent>
      </Card>
    </>
  )
}

export default App
