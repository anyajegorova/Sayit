import { useState } from 'react';
import AlertModal from './AlertModal';
import './styles/DeleteNotepost.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DeleteNotepost = ({ notepostId, getNoteposts }) => {
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setShowAlert(true)
    }
    const deleteNotepost = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('/delete_notepost', {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    'body': JSON.stringify({ notepostId: notepostId.toString() }),
                    'credentials': 'include'
                })
                if (response.ok) {
                    getNoteposts();
                    setShowAlert(false)
                    toast.success('Notepost deleted successfully')

                } else {
                    toast.error('Error deleting notepost')
                }


            } catch (error) {
                toast.error('Oops! Something went wrong. Please try again later.')
            }
        } else {
            console.log('No token found')
            navigate('/login')
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

