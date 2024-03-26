import './styles/Navbar.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ loggedIn, logout, onMenuClick, isMenuOpen }) => {
    const username = localStorage.getItem('username');
    console.log(username, 'Username')

    const handleMenuClick = () => {
        onMenuClick();
    }


    return (
        <nav>
            <div className='logo_container'>
                <h1 id='logo'>Say it{loggedIn ? ' ,' : ' !'} </h1>
                <h1> {loggedIn ? username : null}</h1>
            </div>
            <ul id='navbar_list'>
                {loggedIn ? (
                    <><li><NavLink to='/public_noteposts' id='link' className={({ isActive }) => (isActive ? "activeLink" : 'none')}>All Noteposts</NavLink></li>
                        <li><NavLink to='/all_noteposts' id='link' className={({ isActive }) => (isActive ? "activeLink" : 'none')}> My Noteposts</NavLink></li>
                        <li><NavLink to='/favourites' id='link' className={({ isActive }) => (isActive ? "activeLink" : 'none')}>Likes</NavLink></li>
                        <li><NavLink to='/profile' id='link' className={({ isActive }) => (isActive ? "activeLink" : 'none')}>Profile</NavLink></li>
                        <li onClick={logout} className='logout' id='logout'>Logout</li>
                    </>

                ) :
                    <li>
                        <NavLink to='/login' className='login'>Login</NavLink>
                    </li>}
            </ul>
            <div className='hamburger_menu_container' onClick={handleMenuClick}>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0">
                    </g>
                    <g id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                    </g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M4 6H20M4 12H20M4 18H20"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                        </path>
                    </g>
                </svg>
            </div>

        </nav>

    )

}

export default Navbar;