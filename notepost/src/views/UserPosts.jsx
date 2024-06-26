import './styles/NotepostList.css';
import { useNavigate } from 'react-router-dom';
import Notepost from '../components/Notepost';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import handleToggleLike from '../utils/toggleLikeUtils';

const UserPosts = ({ mode }) => {
  const [noteposts, setNoteposts] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    getNoteposts()
  }, [])
  const token = localStorage.getItem('token');

  const onToggleLike = async (notepostId) => {
    handleToggleLike(notepostId, token, setNoteposts, toast);
  };


  //Get all user noteposts
  const getNoteposts = async () => {
    console.log('Getting noteposts')
    if (token) {
      try {
        const response = await fetch('https://sayit-api.onrender.com/all_noteposts', {
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
            date: notepost.date,
            content: notepost.content,
            ownerEmail: notepost.ownerEmail,
            username: notepost.username,
            notepostId: notepost.notepostId,
            likedBy: notepost.likedBy,
            likeCount: notepost.likeCount,
          }))
          setNoteposts(formattedNoteposts);
        } else if (response.status === 404) {
          setNoteposts([])
          toast.info('You have no posts yet!')
        } else if (response.status === 500) {
          toast.error('Oops! Something went wrong. Please, try again.')
        }
      } catch (error) {
        toast.error('Oops! Something went wrong. Please, try again.')
      }
    } else {
      navigate('https://sayit-api.onrender.com/login')
      toast.error('Please, login!')
    }
  }

  return (
    <div className='main_container'>
      <section id='notepost_section'>
        <div className='noteposts'>
          {noteposts?.map((notepost) => (
            <Notepost
              key={notepost.notepostId + notepost.date + notepost.username}
              date={notepost.date}
              content={notepost.content}
              username={notepost.username}
              currentMode={mode}
              notepostId={notepost.notepostId}
              favourites={notepost.likedBy}
              likeCount={notepost.likeCount}
              setNoteposts={setNoteposts}
              getNoteposts={getNoteposts}
              handleToggleLike={onToggleLike}
            />))}
        </div>
      </section>
    </div>
  )
}
export default UserPosts;