import './NotepostList.css';
import { useNavigate } from 'react-router-dom';
import Notepost from './Notepost';
import CreateNotepost from './CreateNotepost';
import AlertModal from './AlertModal';
import { useEffect, useRef, useState } from 'react';

const NotepostList = ({ mode }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [newNotepost, setNewNotepost] = useState({
    name: '',
    date: Date.now(),
    content: '',
    isLikedBy: [],


  })
  const [noteposts, setNoteposts] = useState([])
  const [currentNotepostName, setCurrentNotepostName] = useState('');

  const navigate = useNavigate();

  const prevShowModalRef = useRef();

  useEffect(() => {
    getNoteposts()
  }, [])

  useEffect(() => {
    if (prevShowModalRef.current && !showModal) {
      getNoteposts();
    }
    prevShowModalRef.current = showModal;

  }, [showModal])

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
          console.log('Data:', data);
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
          console.log(formattedNoteposts, 'Formatted noteposts')
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
        console.log(token)
      }
    } else {
      console.log('No token found')
      navigate('/login')

    }

  }

  // Delete notepost
  const deleteNotepost = async (name) => {
    console.log('Deleting notepost ', name)
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('http://localhost:8000/delete_notepost', {
          'method': 'POST',
          'headers': {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          'body': JSON.stringify({ name: name.toString() }),
          'credentials': 'include'
        })
        console.log(response, 'Here')
        setShowAlert(false)
        getNoteposts();

      } catch (error) {
        console.log('Error deleting notepost ', error)
      }
    } else {
      console.log('No token found')
    }
  }

  const openModal = () => {
    setShowModal(true)
    console.log("Model opened")
  }


  return (
    <div className='main_container'>
      <section id='notepost_section'>
        <CreateNotepost
          showModal={showModal}
          setShowModal={setShowModal}
          newNotepost={newNotepost}
          setNewNotepost={setNewNotepost} />
        <div className='noteposts'>
          {noteposts?.map((notepost) => (
            <Notepost key={notepost.name}
              name={notepost.name}
              date={notepost.date}
              content={notepost.content}
              setShowAlert={setShowAlert}
              setCurrentNotepostName={setCurrentNotepostName}
              username={notepost.username}
              currentMode={mode}
              notepostId={notepost.notepostId}
              favourites={notepost.likedBy}
              likeCount={notepost.likeCount}
              setNoteposts={setNoteposts}
            />))}
        </div>
      </section>
      <button onClick={openModal} id='add_notepost_button'>
        New Notepost +
      </button>
      {showAlert ? (
        <AlertModal
          setShowAlert={setShowAlert}
          deleteNotepost={deleteNotepost}
          currentNotepostName={currentNotepostName}
        />) : null}
    </div>
  )
}
export default NotepostList;