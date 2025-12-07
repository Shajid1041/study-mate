import React from 'react';
import Navber from '../Components/Navber/Navber';
import Footer from '../Components/Footer/Footer';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navber></Navber>
            <main className="flex-1">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default Root;