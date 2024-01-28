import './NotepostList.css';
import Notepost from './Notepost';
import CreateNotepost from './CreateNotepost';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const NotepostList = ({ userId, loggedIn }) => {
  const [showModal, setShowModal] = useState(false)
  const [newNotepost, setNewNotepost] = useState({
    userId: '',
    name: '',
    date: Date.now(),
    content: ''

  })
  const [noteposts, setNoteposts] = useState([])
  useEffect(() => {
    if (userId) {
      getNoteposts();
      console.log('useEffect getNoteposts ', userId)
    } else {
      console.log('useEffect NO FOUND getNoteposts ', userId)
    }

  }, [userId])

  //Get all noteposts
  const getNoteposts = async () => {
    console.log('Getting noteposts')
    const token = Cookies.get('token');
    console.log(token)

    if (!userId) {
      console.log('No userId found')
      return
    }
    console.log('userId found')
    if (token) {
      try {
        const response = await fetch('http://localhost:8000/all_noteposts', {
          'method': 'POST',
          'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          'body': JSON.stringify({ userId }),
          'credentials': 'include'
        })
        const data = await response.json();
        console.log('Here', response)
        console.log(data)
        setNoteposts(data);

      } catch (error) {
        console.log('Error getting noteposts ', error)
      }
    } else {
      console.log('No token found')

    }

  }

  const openModal = () => {
    setShowModal(true)
    console.log("Model opened by:", userId)
  }

  return (
    <div className='main_container'>
      <section id='notepost_section'>
        <CreateNotepost showModal={showModal} setShowModal={setShowModal} newNotepost={newNotepost} setNewNotepost={setNewNotepost} userId={userId} />
        <div className='noteposts'>
          {noteposts?.map((notepost) => (<Notepost key={notepost.name} name={notepost.name} date={notepost.date} content={notepost.content} />))}
        </div>
      </section>
      <button onClick={openModal}>
        New Notepost +
      </button>
    </div>
  )
}
export default NotepostList;