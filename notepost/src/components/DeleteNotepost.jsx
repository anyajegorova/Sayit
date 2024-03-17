import { useState } from 'react';
import AlertModal from './AlertModal';
import './styles/DeleteNotepost.css';

const DeleteNotepost = ({ notepostId, getNoteposts }) => {
    const [showAlert, setShowAlert] = useState(false);
    const handleClick = () => {
        setShowAlert(true)
    }
    const deleteNotepost = async () => {
        console.log('Deleting notepost ', notepostId)
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('http://localhost:8000/delete_notepost', {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    'body': JSON.stringify({ notepostId: notepostId.toString() }),
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

    return (
        <>
            <div className='delete_notepost_container'>
                <div id='close' onClick={() => handleClick()}>
                    ✖
                </div>
            </div>
            {showAlert ? (
                <AlertModal
                    setShowAlert={setShowAlert}
                    deleteNotepost={deleteNotepost}
                />) : null}
        </>

    )
}

export default DeleteNotepost;

