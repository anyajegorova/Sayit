import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import NotepostList from './NotepostList';
import AllNoteposts from './AllNoteposts';
import { useEffect } from 'react';
const MainRoutes = ({ setUserId, setLoggedIn, userId, loggedIn }) => {
    const [saveUserId, setSaveUserId] = useState('')

    useEffect(() => { setSaveUserId(userId) }, [userId])
    return (
        <Routes>
            <Route path='/login' element={<Login mode='login' setUserId={setUserId} setLoggedIn={setLoggedIn} />} />
            <Route path='/register' element={<Login mode='register' setUserId={setUserId} setLoggedIn={setLoggedIn} />} />
            <Route path='/profile' element={<Profile userId={saveUserId} />} />
            {loggedIn ? (<Route path='/all_noteposts' element={<NotepostList userId={saveUserId} loggedIn={loggedIn} mode='edit' />} />) : (<Route path='/user_noteposts' element={<Login mode='login' setUserId={setUserId} setLoggedIn={setLoggedIn}/>} />)}
            <Route path='/public_noteposts' element={<AllNoteposts mode='public'/>} />

        </Routes>
    )
}

export default MainRoutes;