import './NotepostList.css';
import Notepost from './Notepost';
import CreateNotepost from './CreateNotepost';
import { useEffect, useState } from 'react';
const NotepostList = ({ userId }) => {
  const [showModal, setShowModal] = useState(false)
  const [newNotepost, setNewNotepost] = useState({
    userId: '',
    name: '',
    date: '',
    content: ''

  })
  const [noteposts, setNoteposts] = useState([])

  //Get all noteposts
  useEffect(() => {
    getNoteposts();
  }, [userId, noteposts])

  //Get all noteposts
  const getNoteposts = async () => {
    try {
      const response = await fetch('http://localhost:8000/noteposts', {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json'
        },
        'credentials': 'include'
      })

      const data = await response.json();
      const dataArray = await data.noteposts;
      const filteredData = dataArray.filter((notepost) => notepost.owner === userId);

      setNoteposts(filteredData);

    } catch (error) {
      console.log('Error getting noteposts ', error)
    }
  }



  const openModal = () => {
    setShowModal(true)
    console.log("Model opened by:", userId)
  }

  return (
    <div className='main_container'>
      <section id='notepost_section'>
        <button onClick={openModal}>
          New Notepost +
        </button>
        <CreateNotepost showModal={showModal} setShowModal={setShowModal} newNotepost={newNotepost} setNewNotepost={setNewNotepost} userId={userId} />
        <div className='noteposts'>
          {noteposts?.map((notepost) => (<Notepost key={notepost.name} name={notepost.name} date={notepost.date} content={notepost.content} />))}
        </div>
      </section>
    </div>
  );
}

export default NotepostList;