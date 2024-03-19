import './styles/MobileMenu.css';
import { NavLink } from 'react-router-dom';

const MobileMenu = ({ isMenuOpen, onMenuClick, logout, loggedIn }) => {
    const handleClick = () => {
        onMenuClick()
    }

    const handleLogout = () => {
        logout()
        onMenuClick()
    }
    return (
        <>
            <div className={isMenuOpen ? 'mobile_menu' : 'mobile_menu_hidden'}>
                <h4 onClick={handleClick}>🗙</h4>
                <ul>
                    {loggedIn ? (
                        <>
                            <li onClick={handleClick}><NavLink to='/public_noteposts' id='link' className={({ isActive }) => (isActive ? "activeLink" : 'none')}>All Noteposts</NavLink></li>
                            <li onClick={handleClick}><NavLink to='/all_noteposts' id='link' className={({ isActive }) => (isActive ? "activeLink" : 'none')}>My Noteposts</NavLink></li>
                            <li onClick={handleClick}><NavLink to='/favourites' id='link' className={({ isActive }) => (isActive ? "activeLink" : 'none')}>Likes</NavLink></li>
                            <li onClick={handleClick}><NavLink to='/profile' id='link' className={({ isActive }) => (isActive ? "activeLink" : 'none')}>Profile</NavLink></li>
                            <li onClick={handleLogout} className='logout'>Logout</li>
                        </>
                    ) :
                        <li onClick={handleClick}>
                            <NavLink to='/login' className='login'>Login</NavLink>
                        </li>}
                </ul>
            </div>
        </>
    )
}

export default MobileMenu;