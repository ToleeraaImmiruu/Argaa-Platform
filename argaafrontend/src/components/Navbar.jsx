import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

// Reusable NavLink component for consistent styling
const CustomNavLink = ({ to, children }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`
        }
    >
        {children}
    </NavLink>
);

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false); // Close menu on logout
        navigate('/');
    };

    // This effect closes the mobile menu if the window is resized to a larger screen
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderLinks = (isMobile = false) => (
        <div className={`flex items-center ${isMobile ? 'flex-col space-y-4' : 'space-x-4'}`}>
            {/* Always visible links */}
            {user?.role !== "admin" && <CustomNavLink to="/">Dashboard</CustomNavLink>}
            
            {/* Tourist-specific links */}
            {user?.role === 'tourist' && (
                <CustomNavLink to="/my-bookings">My Bookings</CustomNavLink>
            )}

            {/* Guide-specific links */}
            {user?.role === 'guide' && (
                <CustomNavLink to="/create-tour">Create Tour</CustomNavLink>
            )}

            {/* Admin-specific links */}
            {user?.role === 'admin' && (
                <CustomNavLink to="/admin/tours">Admin Panel</CustomNavLink>
            )}
            <CustomNavLink to="/custom-tours">Community Trips</CustomNavLink>
            <CustomNavLink to="/about">About Us</CustomNavLink>

        </div>
    );

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-gray-800">
                            Argaa<span className="text-blue-600">Platform</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        {user && renderLinks()}
                    </div>

                    {/* Desktop Auth Buttons / User Info */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="text-sm text-gray-600">Hi, {user.firstName}!</span>
                                <button onClick={handleLogout} className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Login</Link>
                                <Link to="/signup" className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Sign Up</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="md:hidden"
                        id="mobile-menu"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                            {user ? (
                                <>
                                    {renderLinks(true)}
                                    <div className="pt-4 mt-4 border-t border-gray-200">
                                        <p className="mb-2 text-gray-600">Welcome, {user.firstName}!</p>
                                        <button onClick={handleLogout} className="w-full text-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <Link to="/login" className="block w-full px-3 py-2 text-base font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Login</Link>
                                    <Link to="/signup" className="block w-full px-3 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Sign Up</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;