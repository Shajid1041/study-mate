import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const Navber = () => {
    const { user, signOutUser } = use(AuthContext)
    const handleSignOut = () => {
        signOutUser()
    }


    const links = <>
        <li>
            <NavLink to="/">Home</NavLink>
        </li>
        <li>
            <NavLink to="/find-partners">Find Partners</NavLink>
        </li>
    </>

    return (
        <div className="navbar bg-transparent absolute z-999 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="text-white menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to={'/'} className="text-2xl font-bold text-white">StudyMate</Link>
            </div>
            <div className="navbar-center hidden lg:flex text-white">
                <ul className="menu menu-horizontal px-1 text-lg">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {user ?
                <>
                <div className="dropdown dropdown-end mr-3">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-32 p-2 shadow text-white">
                        <li>
                            <a className="justify-between">
                                Profile
                            </a>
                        </li>
                                <li><a onClick={handleSignOut}>Logout</a></li>
                    </ul>
                </div>
                </>
                :
                <>
                    <Link to={'/signin'} className="btn btn-sm md:btn-md btn-dash btn-primary animate-bounce scale-102 mr-3">Sign in</Link>
                    <Link to={'/register'} className="btn btn-sm md:btn-md btn-dash btn-primary">Register</Link>
                </>}
            </div>
        </div>

    );
};

export default Navber;