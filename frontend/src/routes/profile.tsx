import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export const Route = createFileRoute('/profile')({
    component: Profile,
})

async function getCurrentUser() {
    const res = await api.me.$get();

    if (!res.ok) {
        throw new Error('Server Error!');
    }

    const data = await res.json();
    return data;
}

function Profile() {

    const { isPending, data, error } = useQuery({ 
        queryKey: ['get-current-user'], 
        queryFn: getCurrentUser 
    });

    if(isPending){
        return 'Loading...'
    }
    if(error){
        return 'Not logged in!'
    }

    return(
        <div className="p-2">
            <h3>Your Profile</h3>
            <p>Hello {data.user.given_name}</p>
        </div>
    )
}
