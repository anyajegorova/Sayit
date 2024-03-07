import './styles/NotepostList.css';
import { useNavigate } from 'react-router-dom';
import Notepost from '../components/Notepost';
import { useEffect, useState } from 'react';

const NotepostList = ({ mode }) => {
  const [noteposts, setNoteposts] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    getNoteposts()
  }, [])
  const token = localStorage.getItem('token');

  //Get all user noteposts
  const getNoteposts = async () => {
    if (token) {
      try {
        const response = await fetch('http://localhost:8000/all_noteposts', {
          'method': 'POST',
          'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          'credentials': 'include'
        })
        if (response.ok) {
          const data = await response.json();
          const formattedNoteposts = data.map((notepost) => ({
            name: notepost.name,
            date: notepost.date,
            content: notepost.content,
            ownerEmail: notepost.ownerEmail,
            username: notepost.username,
            notepostId: notepost.notepostId,
            likedBy: notepost.likedBy,
            likeCount: notepost.likeCount,
          }))

          setNoteposts(formattedNoteposts);
        } else {
          console.error('Error getting noteposts. Status:', response.status);
          const errorData = await response.json();
          console.error('Error Data:', errorData);
          if (response.status === 401) {
            console.error('Invalid or expired token. Redirecting to login...');
            navigate('/login');
          }
        }



      } catch (error) {
        console.log('Error getting noteposts ', error)
      }
    } else {
      console.log('No token found')
      navigate('/login')

    }

  }

  return (
    <div className='main_container'>
      <section id='notepost_section'>
        <div className='noteposts'>
          {noteposts?.map((notepost) => (
            <Notepost key={notepost.name}
              name={notepost.name}
              date={notepost.date}
              content={notepost.content}
              username={notepost.username}
              currentMode={mode}
              notepostId={notepost.notepostId}
              favourites={notepost.likedBy}
              likeCount={notepost.likeCount}
              setNoteposts={setNoteposts}
              getNoteposts={getNoteposts}
            />))}
        </div>
      </section>
    </div>
  )
}
export default NotepostList;