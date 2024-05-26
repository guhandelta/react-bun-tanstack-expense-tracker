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
    fetch('http://localhost:4000/api/expenses/total-spent')
      .then(res => res.json())
      .then(data => setTotalSpent(data.total))
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
