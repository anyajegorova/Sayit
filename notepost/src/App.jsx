import { useState, useEffect } from 'react'
import './App.css'

import { Link, useNavigate } from 'react-router-dom';
import MainRoutes from './components/MainRoutes';
import Navbar from './components/Navbar';
import Cookies from 'js-cookie';

function App() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [tokenState, setTokenState] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    setTokenState(token);
    console.log('Token in App.jsx:', token);
  }, [])

  useEffect(() => {
    const token = Cookies.get('token');
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');

    console.log('Token in App.jsx:', token);
    if (token) {
      setLoggedIn(true);
      setUserId(storedUserId);
      setUsername(storedUsername);

    } else {
      setLoggedIn(false);
      setUserId('');
    }

  }, [tokenState])

  useEffect(() => {
    console.log('UserId in App.jsx:', userId);
    console.log('LoggedIn in App.jsx:', loggedIn);
  }, [userId]);

  const logout = () => {
    Cookies.remove('token');
    setLoggedIn(false);
    setUserId('');
    console.log('Logout ', userId)
    navigate('/login')
  }
  return (
    <div className='home_page'>
      <Navbar loggedIn={loggedIn} logout={logout} />
      <MainRoutes
        userId={userId}
        setUserId={setUserId}
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
      />
    </div>
  )
}

export default App
