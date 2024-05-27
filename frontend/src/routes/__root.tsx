import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

// This file would be the entry point for all the routes. Every page could have a NavBar and custom content for itself(<Outlet />)
export const Route = createRootRoute({
    component: Root,
})

function NavBar(){
    return (
        <div className="p-2 flex gap-2 w-full">
            <Link to="/" className="[&.active]:font-bold text-white underline-offset-4">
                Home
            </Link>&emsp;
            <Link to="/about" className="[&.active]:font-bold underline-offset-4">
                About
            </Link>&emsp;
            <Link to="/expenses" className="[&.active]:font-bold underline-offset-4">
                Expenses
            </Link>&emsp;
            <Link to="/addExpense" className="[&.active]:font-bold right-0 underline-offset-4">
                Add Expenses
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
            <Outlet />
            <TanStackRouterDevtools />
        </>
    )
}