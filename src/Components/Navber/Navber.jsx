import React, { use, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const Navber = ({ theme, toggleTheme }) => {
    
    const { user, signOutUser, loader } = use(AuthContext)

    
    // console.log(user)
    const handleSignOut = () => {
        signOutUser()
    }
    // console.log(user)

    const links = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/find-partners">Find Partners</NavLink>
            </li>

            {/* Only show if user is logged in */}
            {user && (
                <li>
                    <NavLink to="/create-partner-profile">Create Partner Profile</NavLink>
                </li>
            )}

            {/* Only show if some other condition is true */}
            {user && (
                <li>
                    <NavLink to="/my-connection">My Connection</NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="navbar bg-secondary z-999 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className=" menu menu-lg dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-primary">
                        {links}
                    </ul>
                </div>
                <Link to={'/'} className='flex justify-center items-center'>
                    <img src="https://img.icons8.com/?size=100&id=XzAcd8pN-P8p&format=png&color=000000" className='w-8 md:w-10' alt="" />
                    <span className="text-xl md:text-2xl font-bold text-white ml-1">StudyMate</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex text-white">
                <ul className="menu menu-horizontal px-1 text-lg">
                    {links}

                </ul>
            </div>
            <div className="navbar-end">

                {
                    
                    
                user ?
                    <>
                        <div className="dropdown dropdown-end mr-3">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.photoURL} />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-lg dropdown-content rounded-box z-1 mt-3 w-32 p-2 shadow bg-primary">
                                <li>
                                    <Link to={'/profile'} className="justify-between">
                                        Profile
                                    </Link>
                                </li>
                                <li><a onClick={handleSignOut}>Logout</a></li>
                            </ul>
                        </div>
                    </>
                    :
                    <>





                        <Link to={'/signin'} className="btn btn-xs md:btn-md btn-dash btn-primary animate-bounce scale-102 mr-1 md:mr-3 text-white">Sign in</Link>
                        <Link to={'/register'} className="btn btn-xs md:btn-md btn-dash btn-primary text-white">Register</Link>

                    </>}
                <button
                    onClick={toggleTheme}
                    className="btn btn-xs md:btn-md btn-dash btn-primary ml-1 md:ml-3 text-white"
                    title="Toggle Light/Dark"
                >
                    {theme === 'light' ? 'Dark' : 'Light'}
                </button>
            </div>
        </div>

    );
};

export default Navber;