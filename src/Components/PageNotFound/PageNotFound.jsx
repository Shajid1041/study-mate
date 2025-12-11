import React from 'react';
import { Link } from 'react-router';

const PageNotFound = () => {
    return (
        <div className="h-full max-w-screen mx-auto py-10 px-4">
            
            <h1 className="text-2xl md:text-4xl font-extrabold text-secondary mb-6 leading-tight text-center mt-20">Page Not Found</h1>

            <div className='flex justify-center items-center mt-5'>
                <Link to="/" className="btn btn-secondary text-white ">Go Home</Link>
            </div>
        </div>

    );
};

export default PageNotFound;