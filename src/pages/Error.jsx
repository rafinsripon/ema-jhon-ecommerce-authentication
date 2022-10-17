import React from 'react';
import { useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError();
    return (
        <div className='text-center mt-28'>
            <h1 className='text-4xl font-bold text-pink-500'>Oops!</h1>
            <p className='text-2xl font-semibold'>Sorry, an unexpected error has occurred.</p>
            {error && (
                <div>
                    <p>{error.statusText || error.message}</p>
                    <p>{error.status}</p>
                </div>
            )}
        </div>
    );
};

export default Error;