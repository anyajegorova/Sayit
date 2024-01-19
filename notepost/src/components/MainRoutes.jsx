import { Routes, Route } from 'react-router-dom'
import Login from './Login';
import Profile from './Profile';
const MainRoutes = ({ setUserEmail, setUserId }) => {
    return (
        <Routes>
            <Route path='/login' element={<Login mode='login' setUserEmail={setUserEmail} setUserId={setUserId}/>} />
            <Route path='/register' element={<Login mode='register' setUserEmail={setUserEmail} setUserId={setUserId}/>} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
    )
}

export default MainRoutes;