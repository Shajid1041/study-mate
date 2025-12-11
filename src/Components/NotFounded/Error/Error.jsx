import React from 'react';
import { useRouteError } from 'react-router';
import Footer from '../Footer/Footer';
import Navber from '../Navber/Navber';

const Error = () => {
    const error = useRouteError()
    return (
        <div className='flex flex-col justify-between min-h-screen'>
            <Navber></Navber>

            <div className='max-w-screen mx-auto my-15 px-4 text-xl text-center text-red-700 font-semibold '>{error.message}</div>
            <Footer className=''></Footer>
        </div>
    );
};

export default Error;