import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'

import MainRoutes from './components/MainRoutes';
import Navbar from './components/Navbar';
import Cookies from 'js-cookie';
import MobileMenu from './components/MobileMenu';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [saveUserId, setSaveUserId] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);
    }
  }, [])


  const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem('token');
    setLoggedIn(false);
    setSaveUserId('');
    console.log('Logout ', saveUserId)
    navigate('https://sayit-api.onrender.com/login')
  }

  const onMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }


  return (
    <div className="main_page">
      <Navbar loggedIn={loggedIn} logout={logout} onMenuClick={onMenuClick} isMenuOpen={isMenuOpen} />
      <MainRoutes
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <MobileMenu isMenuOpen={isMenuOpen} onMenuClick={onMenuClick} logout={logout} loggedIn={loggedIn}/>
    </div>
  )
}

export default App
