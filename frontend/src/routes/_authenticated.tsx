// _authenticated.tsx would be a wrapper on any route that needs to be authenticated, by prefixing the routes with _authenticated
// import { userQueryOptions } from '@/lib/api'
import { createFileRoute, Outlet } from '@tanstack/react-router'

const Login = () => {
    return <div>Login</div>
}

const Component = () => {
    const { user } = Route.useRouteContext();
    // 
    if (!user) {
        return <Login />
    }

    return <Outlet />

}

// src/routes/_authenticated.tsx
// This will be a wrapper on any route that needs to be authenticated
export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async () => {
        // Before loading any pages, check if the user is logged in
        // userQueryOptions
        return {
            user: null // With user object being null, any authenticated route will redirect to the login page, so a better way to create authenticated routes would be to prefix teh routes with _authenticated
        }
    },
    // This is where the component will be rendered and this has access to the user object from beforeLoad()
    component: Component
})