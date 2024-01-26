import { useState, useEffect } from 'react'
import './App.css'
import NotepostList from './components/NotepostList';

import { Link } from 'react-router-dom';
import MainRoutes from './components/MainRoutes';
import Cookies from 'js-cookie';

function App() {
  const [userId, setUserId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    token ? setLoggedIn(true) : setLoggedIn(false);
  }, [])


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
      <MainRoutes setUserId={setUserId} setLoggedIn={setLoggedIn}/>
      {loggedIn ? (<>
        <ul>
          <li>
            <Link to='/all_noteposts'>
              <NotepostList userId={userId} />
              All My Noteposts
              {console.log('UserId in App.jsx:', userId)}

            </Link>
          </li>
        </ul>

      </>
      ) : null}
    </div>


  )
}

export default App
