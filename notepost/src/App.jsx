import { useState, useEffect } from 'react'
import './App.css'

import { Link } from 'react-router-dom';
import MainRoutes from './components/MainRoutes';
import Cookies from 'js-cookie';

function App() {
  const [userId, setUserId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [tokenState, setTokenState] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    setTokenState(token);
    console.log('Token in App.jsx:', token);
  }, [])

  useEffect(() => {
    const token = Cookies.get('token');
    const storedUserId = localStorage.getItem('userId');
    console.log('Token in App.jsx:', token);
    if (token) {
      setLoggedIn(true);
      setUserId(storedUserId);

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
  }
  return (
    <div className='home_page'>
      <nav>
        <h1>Noteposts</h1>
        <ul>
          <li><Link to='/' id='link'> Home</Link></li>
          {loggedIn ? (
            <>
              <li><Link to='/profile' id='link'>Profile</Link></li>
              <li onClick={logout} id='link'>Logout</li>
            </>

          ) :
            <li>
              <Link to='/login' >Login</Link>
            </li>}
        </ul>
      </nav>
      <MainRoutes userId={userId} setUserId={setUserId} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
    </div>


  )
}

export default App
