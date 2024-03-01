import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'

import MainRoutes from './components/MainRoutes';
import Navbar from './components/Navbar';
import Cookies from 'js-cookie';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [saveUserId, setSaveUserId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);
    }
  }, [])

  const logout = () => {
    Cookies.remove('token');
    setLoggedIn(false);
    setSaveUserId('');
    console.log('Logout ', saveUserId)
    navigate('/login')
  }

  
  return (
    <div className='main_page'>
      <Navbar loggedIn={loggedIn} logout={logout} />
      <MainRoutes
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
    </div>
  )
}

export default App
