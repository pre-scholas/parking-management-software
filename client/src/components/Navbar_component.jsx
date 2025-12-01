// Import React hooks and router components
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth, useTheme } from '../hooks';

// Main navigation component for the parking management app
function Navbar() {
    // Hook for programmatic navigation (redirects)
    // Hook to get current URL path for active link highlighting
    const location = useLocation();
    // Custom hook for authentication state and actions
    const { user, isAuthenticated, logout } = useAuth();
    // Custom hook for theme management
    const { toggleTheme, isDark } = useTheme();



    // Function to handle user logout
    const handleLogout = () => {
        logout(); // Use the logout function from useAuth hook
    };

    // Helper function to check if current page matches given path (for active styling)
    const isActive = (path) => location.pathname === path;

    // Render the navigation sidebar
    return (
        <div className="navigation">
            <ul>
                {/* Home page link - always visible */}
                <li className={isActive('/') ? 'active' : ''}>
                    <Link to="/">
                        <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                        <span className="title">Home</span>
                    </Link>
                </li>
                {/* Parking lots page - browse available parking facilities */}
                <li className={isActive('/lots') ? 'active' : ''}>
                    <Link to="/lots">
                        <span className="icon"><ion-icon name="car-outline"></ion-icon></span>
                        <span className="title">Parking Lots</span>
                    </Link>
                </li>
                {/* Reservations page - view and manage bookings */}
                <li className={isActive('/reservations') ? 'active' : ''}>
                    <Link to="/reservations">
                        <span className="icon"><ion-icon name="calendar-outline"></ion-icon></span>
                        <span className="title">Reservations</span>
                    </Link>
                </li>
                {/* Profile page - user account settings */}
                <li className={isActive('/profile') ? 'active' : ''}>
                    <Link to="/profile">
                        <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                        <span className="title">Profile</span>
                    </Link>
                </li>
                {/* Theme toggle */}
                <li>
                    <button onClick={toggleTheme} style={{background: 'none', border: 'none', width: '100%', textAlign: 'left'}}>
                        <span className="icon"><ion-icon name={isDark ? 'sunny-outline' : 'moon-outline'}></ion-icon></span>
                        <span className="title">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                </li>
                {/* Conditional rendering: show logout button if authenticated, login link if not */}
                {isAuthenticated ? (
                    <li>
                        {/* Logout button - clears session and redirects */}
                        <button onClick={handleLogout} style={{background: 'none', border: 'none', width: '100%', textAlign: 'left'}}>
                            <span className="icon"><ion-icon name="log-out-outline"></ion-icon></span>
                            <span className="title">Logout</span>
                        </button>
                    </li>
                ) : (
                    <li className={isActive('/login') ? 'active' : ''}>
                        {/* Login link - for unauthenticated users */}
                        <Link to="/login">
                            <span className="icon"><ion-icon name="log-in-outline"></ion-icon></span>
                            <span className="title">Login</span>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}
// Export component for use in other parts of the app
export default Navbar;