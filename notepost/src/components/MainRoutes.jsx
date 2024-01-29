import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import NotepostList from './NotepostList';
const MainRoutes = ({ setUserId, setLoggedIn, userId, loggedIn }) => {
    return (
        <Routes>
            <Route path='/login' element={<Login mode='login' setUserId={setUserId} setLoggedIn={setLoggedIn} />} />
            <Route path='/register' element={<Login mode='register' setUserId={setUserId} setLoggedIn={setLoggedIn} />} />
            <Route path='/profile' element={<Profile />} />
            {loggedIn ? (<Route path='/all_noteposts' element={<NotepostList userId={userId} />} />) : (<Route path='/all_noteposts' element={<Login mode='login' setUserId={setUserId} setLoggedIn={setLoggedIn} />} />)}
        </Routes>
    )
}

export default MainRoutes;