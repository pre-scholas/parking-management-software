// Import React hooks and router components
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Main navigation component for the parking management app
function Navbar() {
    // Hook for programmatic navigation (redirects)
    const navigate = useNavigate();
    // Hook to get current URL path for active link highlighting
    const location = useLocation();
    // State to track if user is logged in
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // State to store user data from localStorage
    const [user, setUser] = useState(null);

    // Effect runs once when component mounts
    useEffect(() => {
        // Dynamically load Ionicons library for navigation icons
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
        script.type = 'module';
        document.head.appendChild(script);
        
        // Check if user is already logged in by looking for stored token
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        // Convert token to boolean: !!token ensures true/false instead of string/null
        setIsAuthenticated(!!token);
        // Parse and set user data if it exists
        if (userData) {
            setUser(JSON.parse(userData));
        }
        
        // Cleanup function: remove script when component unmounts
        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []); // Empty dependency array means this runs only once

    // Function to handle user logout
    const handleLogout = () => {
        // Clear authentication data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Update component state
        setIsAuthenticated(false);
        setUser(null);
        // Redirect to login page
        navigate('/login');

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