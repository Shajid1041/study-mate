import React, { useState, useEffect } from 'react';
import Navber from '../Components/Navber/Navber';
import Footer from '../Components/Footer/Footer';
import { Outlet } from 'react-router';

const Root = () => {
    const [theme, setTheme] = useState('light');

    // Load theme from localStorage or default to light
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
        document.documentElement.setAttribute('data-theme', storedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="flex flex-col min-h-screen bg-base-100 transition-colors duration-500">
            <Navber theme={theme} toggleTheme={toggleTheme} />
            <main className="flex-1">
                <Outlet context={{ theme }} />
            </main>
            <Footer />
        </div>
    );
};

export default Root;
