import { Routes, Route } from 'react-router-dom';
import Login from '../views/Login';
import Profile from '../views/Profile';
import NotepostList from '../views/NotepostList';
import AllNoteposts from '../views/AllNoteposts';
import Favourites from '../views/Favourites';

const MainRoutes = ({ loggedIn, setLoggedIn }) => {
    return (
        <Routes>
            <Route path='/login' element={<Login mode='login' setLoggedIn={setLoggedIn} />} />
            <Route path='/register' element={<Login mode='register' setLoggedIn={setLoggedIn} />} />
            {loggedIn ? (<Route path='/favourites' element={<Favourites />} />) : null}
            {loggedIn ? <Route path='/profile' element={<Profile />} /> : null}
            {loggedIn ? (<Route path='/all_noteposts' element={<NotepostList mode='edit' />} />) : (<Route path='/user_noteposts' element={<Login mode='login' setLoggedIn={setLoggedIn} />} />)}
            <Route path='/public_noteposts' element={<AllNoteposts mode='public' />} />

        </Routes>
    )
}

export default MainRoutes;