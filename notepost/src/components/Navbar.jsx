import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ loggedIn, logout }) => {

    const username = localStorage.getItem('username');
    console.log(username, 'Username')

    return (
        <nav>
            <h1> {username}</h1>
            <ul>
                <li><Link to='/public_noteposts' className='link'>All Noteposts</Link></li>

                {loggedIn ? (
                    <>
                        <li><Link to='/all_noteposts' className='link'> My Noteposts</Link></li>
                        <li><Link to='/profile' className='link'>Profile</Link></li>
                        <li><Link to='/favourites' className='link'>Favourites</Link></li>
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