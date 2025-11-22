import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Fixed Navbar */}
            <Navbar />
            
            {/* Main Content Area with top padding to account for fixed navbar */}
            <main className="flex-grow pt-1"> {/* Adjust pt-20 based on your navbar height */}
                <Outlet />
            </main>
            
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Layout;