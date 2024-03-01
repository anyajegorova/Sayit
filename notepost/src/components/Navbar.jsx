import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = ({ loggedIn, logout }) => {

    const username = localStorage.getItem('username');
    console.log(username, 'Username')

    return (
        <nav>
            <div className='logo_container'>
                <h1 id='logo'>Say it{loggedIn ? ' ,' : ' !'} </h1>
                <h1> {username ? username : null}</h1>
            </div>

            <ul>
                <li><NavLink to='/public_noteposts' className='link'>All Noteposts</NavLink></li>

                {loggedIn ? (
                    <>
                        <li><NavLink to='/all_noteposts' className='link' activeClassName='activeLink'> My Noteposts</NavLink></li>
                        <li><NavLink to='/favourites' className='link' activeClassName='activeLink'>Likes</NavLink></li>
                        <li><NavLink to='/profile' className='link' activeClassName='activeLink'>Profile</NavLink></li>
                        <li onClick={logout} className='logout' id='logout'>Logout</li>
                    </>

                ) :
                    <li>
                        <NavLink to='/login' className='login'>Login</NavLink>
                    </li>}
            </ul>
        </nav>

    )

}

export default Navbar;