import { Routes, Route} from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import NotepostList from './NotepostList';
import AllNoteposts from './AllNoteposts';
import Favourites from './Favourites';

const MainRoutes = ({ loggedIn,setLoggedIn }) => {
    return (
        <Routes>
            <Route path='/login' element={<Login mode='login'setLoggedIn={setLoggedIn} />} />
            <Route path='/register' element={<Login mode='register' setLoggedIn={setLoggedIn} />} />
            <Route path='/profile' element={<Profile />} />
            {loggedIn ? (<Route path='/favourites' element={<Favourites />} />) : null}
            {loggedIn ? (<Route path='/all_noteposts' element={<NotepostList mode='edit' />} />) : (<Route path='/user_noteposts' element={<Login mode='login' setLoggedIn={setLoggedIn} />} />)}
            <Route path='/public_noteposts' element={<AllNoteposts mode='public' />} />

        </Routes>
    )
}

export default MainRoutes;