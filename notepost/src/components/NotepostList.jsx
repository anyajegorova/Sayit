import './NotepostList.css';
import Notepost from './Notepost';
import CreateNotepost from './CreateNotepost';
import AlertModal from './AlertModal';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const NotepostList = ({ userId, loggedIn }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [newNotepost, setNewNotepost] = useState({
    userId: '',
    name: '',
    date: Date.now(),
    content: ''

  })
  const [noteposts, setNoteposts] = useState([])
  const [currentNotepostName, setCurrentNotepostName] = useState('')
  useEffect(() => {
    if (userId) {
      getNoteposts();
      console.log('useEffect getNoteposts ', userId)
    } else {
      console.log('useEffect NO FOUND getNoteposts ', userId)
    }

  }, [userId, showModal])

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

  // Delete notepost
  const deleteNotepost = async (name) => {
    console.log('Deleting notepost ', name)
    const token = Cookies.get('token');

    if (!userId) {
      console.log('No userId found')
      return
    }

    if (token) {
      try {
        const response = await fetch('http://localhost:8000/delete_notepost', {
          'method': 'POST',
          'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          'body': JSON.stringify({ userId, name: name.toString() }),
          'credentials': 'include'
        })
        console.log(response, 'Here')
        setShowAlert(false)
        getNoteposts();

      } catch (error) {
        console.log('Error deleting notepost ', error)
        console.log(name, userId, token)
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
        <CreateNotepost
          showModal={showModal}
          setShowModal={setShowModal}
          newNotepost={newNotepost}
          setNewNotepost={setNewNotepost}
          userId={userId} />
        <div className='noteposts'>
          {noteposts?.map((notepost) => (
            <Notepost key={notepost.name}
              name={notepost.name}
              date={notepost.date}
              content={notepost.content}
              setShowAlert={setShowAlert}
              setCurrentNotepostName={setCurrentNotepostName}
              mode={'edit'}
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