import { useState, useEffect } from 'react'
import './App.css'
import NotepostList from './components/NotepostList';

import { Link } from 'react-router-dom';
import MainRoutes from './components/MainRoutes';

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  const logout = () => {
    setUserEmail('');
    setUserId('');
  }


  useEffect(() => { console.log(userId) }, [userId])
  return (
    <div className='home_page'>
      <nav>
        <h1>Noteposts {userEmail ? (' of ') : null}{userEmail}</h1>
        <ul>
          <li><Link to='/' id='link'> Home</Link></li>
          {userEmail ? (
            <>
              <li><Link to='/profile' id='link'>Profile</Link></li>
              <li onClick={logout}>Logout</li>
            </>

          ) :
            <li>
              <Link to='/login'>Login</Link>
            </li>}
        </ul>
      </nav>
      <MainRoutes setUserEmail={setUserEmail} setUserId={setUserId} />
      <NotepostList userId={userId} />
    </div>


  )
}

export default App
