import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import { userQueryOptions } from '../../lib/api';

export const Route = createFileRoute('/_authenticated/profile')({
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
            <h1 className='text-center font-bold text-2xl my-6'>Your Profile</h1>
            <p className='text-center font-bold text-lg my-[6em]'>Hello {data.user.given_name}</p>
            <a href="/api/logout" className="text-center font-bold ml-[45%] hover:text-red-500">Logout</a>
        </div>
    )
}
