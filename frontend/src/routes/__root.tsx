import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

interface MyRouterContext {
    // Specifying type of data that would be in the context Object
    queryClient: QueryClient,
}

// This file would be the entry point for all the routes. Every page could have a NavBar and custom content for itself(<Outlet />)
export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: Root,
})

function NavBar(){
    return (
        <div className=" items-center flex gap-2 max-w-2xl m-auto py-8">
            <Link to="/" className="[&.active]:font-bold [&.active]:underline  text-white [&.active]:underline-offset-8 [&.active]:text-green-400 hover:text-blue-400">
                Home
            </Link>&emsp;
            <Link to="/about" className="[&.active]:font-bold [&.active]:underline [&.active]:underline-offset-8 [&.active]:text-green-400 hover:text-blue-400">
                About
            </Link>&emsp;
            <Link to="/expenses" className="[&.active]:font-bold [&.active]:underline  [&.active]:underline-offset-8 [&.active]:text-green-400 hover:text-blue-400">
                Expenses
            </Link>&emsp;
            <Link to="/addExpense" className="[&.active]:font-bold [&.active]:underline mr-4 [&.active]:underline-offset-8 [&.active]:text-green-400 hover:text-blue-400">
                Add Expenses
            </Link>
            <Link to="/profile" className="[&.active]:font-bold [&.active]:underline  right-0 [&.active]:underline-offset-8 [&.active]:text-green-400 hover:text-blue-400">
                Profile
            </Link>
        </div>
    )
}

function Root(){
    return (
        <>
            <NavBar />
            <hr />
            {/* The Outlet would have all the sub routes */}
            <div className="p-2 flex gap-2 max-w-2xl m-auto">
                <Outlet />
            </div>
            <TanStackRouterDevtools />
        </>
    )
}