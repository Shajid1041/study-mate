import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className='bg-black'>
            <div className="footer sm:footer-horizontal bg-neutral text-neutral-content pt-10 px-10 mb-5 md:mb-0">
                <aside>
                    <Link to={'/'} className='flex justify-center items-center'>
                        <img src="https://img.icons8.com/?size=100&id=XzAcd8pN-P8p&format=png&color=000000" className='w-10' alt="" />
                        <span className="text-2xl font-bold text-white ml-1">StudyMate</span>
                    </Link>
                    <p>
                        StudyMate — A platform built for smart study & collaboration.
                        <br />
                        Helping students share notes & learn together since 2024.
                    </p>
                </aside>

                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col justify-center items-center gap-4">
                        
                        <a href="#">
                            <img className='h-8 w-8' src="https://i.postimg.cc/FRhQ2ppm/sl-z-072523-61700-01.jpg" alt="" />
                        </a>
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </nav>
            </div>

            <p className='sm:footer-horizontal bg-neutral text-neutral-content text-center py-3'>
                Copyright © {new Date().getFullYear()} StudyMate — All rights reserved
            </p>
        </footer>
    );
};

export default Footer;
