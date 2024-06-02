/* _authenticated.tsx would be a wrapper on any route that needs to be authenticated, by prefixing the routes with _authenticated

When any of the pages within the _authenticated route is accessed, the user object will be checked, and if the user object is null, the user will be redirected to the login page */

// import { userQueryOptions } from '@/lib/api'
import { userQueryOptions } from '@/lib/api';
import { createFileRoute, Outlet } from '@tanstack/react-router'

const Login = () => {
    return <div>
        <h1 className="text-center font-bold text-xl my-6">
            You have to be Logged in to access this page
        </h1>        
        <h6 className="text-center mt-6">
            <a href="/api/login" className="text-lg font-bold hover:text-green-300">Login</a>
        </h6>
    </div>
}

const Component = () => {
    const { user } = Route.useRouteContext();
    if (!user) {
        return <Login />
    }

    return <Outlet />

}

/* src/routes/_authenticated.tsx
This will be a wrapper on any route that needs to be authenticated */
export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({ context }) => {
        // Before loading any pages, check if the user is logged in
        // userQueryOptions
        // only the queryClient can be used here instead of useQuery() hook, as this is not a component
        const queryClient = context.queryClient;
        // This is what that is determinig if the user is logged in or not. This is a way to check if the UI is raelly making a request to the server to check if the user is logged in, by fetching the user object
        try {
            const data = await queryClient.fetchQuery(userQueryOptions);
            return data;
        } catch (error) {
            console.log('User is not logged in:\t', error);
            return { user: null };
        }
    },
    // This is where the component will be rendered and this has access to the user object from beforeLoad()
    component: Component
})