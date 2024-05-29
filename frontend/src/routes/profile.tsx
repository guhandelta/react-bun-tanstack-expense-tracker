import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { userQueryOptions } from '../lib/api';

export const Route = createFileRoute('/profile')({
    component: Profile,
})

function Profile() {

    const { isPending, data, error } = useQuery(userQueryOptions);

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
