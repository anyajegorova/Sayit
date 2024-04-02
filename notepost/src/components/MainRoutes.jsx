import { Routes, Route } from 'react-router-dom';
import Home from '../views/Home';
import Login from '../views/Login';
import Profile from '../views/Profile';
import UserPosts from '../views/UserPosts';
import AllNoteposts from '../views/AllNoteposts';
import Favourites from '../views/Favourites';

const MainRoutes = ({ loggedIn, setLoggedIn }) => {
    return (
        <Routes>
            <Route exact path='/' element={<Home loggedIn={loggedIn} />} />
            <Route path='/login' element={<Login mode='login' setLoggedIn={setLoggedIn} />} />
            <Route path='/register' element={<Login mode='register' setLoggedIn={setLoggedIn} />} />
            {loggedIn ? (<Route path='/favourites' element={<Favourites />} />) : null}
            {loggedIn ? <Route path='/profile' element={<Profile />} /> : null}
            {loggedIn ? (<Route path='/all_noteposts' element={<UserPosts mode='edit' />} />) : (<Route path='/user_noteposts' element={<Login mode='login' setLoggedIn={setLoggedIn} />} />)}
            <Route path='/public_noteposts' element={<AllNoteposts mode='public' />} />

        </Routes>
    )
}

export default MainRoutes;