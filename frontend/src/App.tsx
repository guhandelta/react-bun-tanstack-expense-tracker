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

function App() {

  useEffect(() => {
    async function fetchTotalSpent() {
      fetch('/api/expenses/total-spent')
      .then(res => res.json())
      .then(({ total }) => setTotalSpent(total))
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
