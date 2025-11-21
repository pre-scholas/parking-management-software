import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/lots">Parking Lots</Link></li>
                <li><Link to="/reservations">Reservations</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/login">Logout</Link></li>
            </ul>
        </nav>
    )
}
export default Navbar;