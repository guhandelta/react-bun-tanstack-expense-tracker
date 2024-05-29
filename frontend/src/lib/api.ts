
import { hc } from 'hono/client'
import { type ApiRoutes } from '@server/app'
import { queryOptions } from '@tanstack/react-query';

const client = hc<ApiRoutes>('/');

export const { api } = client;

async function getCurrentUser() {
    const res = await api.me.$get();

    if (!res.ok) { 
        throw new Error('Server Error!');
    }

    const data = await res.json();
    return data;
}

export const userQueryOptions = queryOptions({ 
    queryKey: ['get-current-user'], 
    queryFn: getCurrentUser,
    // When one page uses this query, the data will be cached, to prevent and anyother pages to make the request. The data will be available until it is invalidated by the user by a page refresh or by logging out and logging in
    staleTime: Infinity,
});