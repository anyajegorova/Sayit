import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ loggedIn, logout }) => {

    return (
        <nav>
            <h1>Noteposts</h1>
            <ul>
                <li><Link to='/public_noteposts' className='link'>All Noteposts</Link></li>
                <li><Link to='/all_noteposts' className='link'> My Noteposts</Link></li>
                {loggedIn ? (
                    <>
                        <li><Link to='/profile' className='link'>Profile</Link></li>
                        <li onClick={logout} className='link' id='logout'>Logout</li>
                    </>

                ) :
                    <li>
                        <Link to='/login' >Login</Link>
                    </li>}
            </ul>
        </nav>

    )

}

export default Navbar;