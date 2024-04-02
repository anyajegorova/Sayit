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
                <h4 onClick={handleClick}>
                    <svg viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0">
                        </g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                            strokeLinejoin="round">
                        </g>
                        <g id="SVGRepo_iconCarrier">
                            <g id="Menu / Close_SM">
                                <path id="Vector"
                                    d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                                    stroke="#ffffff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                </path>
                            </g>
                        </g>
                    </svg>
                </h4>
                <ul>
                    <li onClick={handleClick}><NavLink to='/' id='link' className={({ isActive }) => (isActive ? "activeLink" : 'none')}>Home</NavLink></li>
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