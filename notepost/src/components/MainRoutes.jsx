import { Routes, Route } from 'react-router-dom';
import Login from '../views/Login';
import Profile from '../views/Profile';
import UserPosts from '../views/UserPosts';
import AllNoteposts from '../views/AllNoteposts';
import Favourites from '../views/Favourites';

const MainRoutes = ({ loggedIn, setLoggedIn }) => {
    return (
        <Routes>
            <Route path='https://sayit-api.onrender.com/login' element={<Login mode='login' setLoggedIn={setLoggedIn} />} />
            <Route path='https://sayit-api.onrender.com/register' element={<Login mode='register' setLoggedIn={setLoggedIn} />} />
            {loggedIn ? (<Route path='https://sayit-api.onrender.com/favourites' element={<Favourites />} />) : null}
            {loggedIn ? <Route path='https://sayit-api.onrender.com/profile' element={<Profile />} /> : null}
            {loggedIn ? (<Route path='https://sayit-api.onrender.com/all_noteposts' element={<UserPosts mode='edit' />} />) : (<Route path='https://sayit-api.onrender.com/user_noteposts' element={<Login mode='login' setLoggedIn={setLoggedIn} />} />)}
            <Route path='https://sayit-api.onrender.com/public_noteposts' element={<AllNoteposts mode='public' />} />

        </Routes>
    )
}

export default MainRoutes;