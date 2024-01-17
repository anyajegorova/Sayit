import { useState } from 'react'
import './App.css'

import { Link } from 'react-router-dom';
import MainRoutes from './components/MainRoutes';

function App() {
  const [userEmail, setUserEmail] = useState('');

  return (
    <div className='home_page'>
      <nav>
        <h1>Noteposts {userEmail ? (' of ') : null}{userEmail}</h1>
        <ul>
          <li><Link to='/'> Home</Link></li>
          {userEmail ? (
            <>
              <li><Link to='/profile'>Profile</Link></li>
              <Link to='/logout'>Logout</Link>
            </>

          ) :
            <li>
              <Link to='/login'>Login</Link>
            </li>}


        </ul>
      </nav>
      <MainRoutes setUserEmail={setUserEmail} />
    </div>


  )
}

export default App
