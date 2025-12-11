import React from 'react';
import { Link } from 'react-router';

const NotFounded = () => {
    return (
        <div className="h-full max-w-screen mx-auto py-10 ">
            
            <h1 className="text-2xl md:text-4xl font-extrabold text-secondary mb-6 leading-tight text-center mt-20">Not Founded</h1>

            <div className='flex justify-center items-center mt-5'>
                <Link to="/find-partners" className="btn btn-secondary text-white ">Go Back</Link>
            </div>
        </div>

    );
};

export default NotFounded;