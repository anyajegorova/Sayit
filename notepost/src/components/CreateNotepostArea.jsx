import { useState, useEffect } from 'react';
import './styles/CreateNotepostArea.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Skeleton from '@mui/material/Skeleton';

const CreateNotepostArea = ({ getAllNoteposts, currentTopic, scrollToBottom }) => {
    const token = localStorage.getItem('token');
    const [avatar, setAvatar] = useState(null);
    const [newNotepost, setNewNotepost] = useState({
        content: '',
        topic: currentTopic
    });
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getAvatar()
        setLoading(false)
    }, [])

    const username = localStorage.getItem('username');
    const firstCharacter = username.charAt(0);

    const handleClick = () => {
        navigate('/profile')
    }

    const getAvatar = async () => {
        if (token) {
            try {
                const avatarResponse = await fetch('https://sayit-api.onrender.com/get_avatar', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    credentials: 'include',
                });
                if (avatarResponse.status == 404) {
                    setAvatar(null)
                } else if (avatarResponse.ok && avatarResponse !== null) {
                    const avatarBlob = await avatarResponse.blob();
                    const avatarUrl = URL.createObjectURL(avatarBlob);
                    setAvatar(avatarUrl);
                    setLoading(false)
                }
            } catch (error) {
                toast.error('Oops! Something went wrong. Please, try again.')
            }
        } else {
            console.error('No token found')
            navigate('https://sayit-api.onrender.com/login')
        }

    }

    const createNotepost = async (e) => {
        e.preventDefault();
        if (!currentTopic) {
            return toast.error('Please, select a topic!')
        }
        try {
            const response = await fetch('https://sayit-api.onrender.com/create_notepost', {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                'body': JSON.stringify(newNotepost),
                'credentials': 'include'
            })
            if (response.ok) {
                setNewNotepost({ content: '', topic: currentTopic })
                getAllNoteposts();
                scrollToBottom()
            }

            if (response.status === 500) {
                toast.error('Oops! Something went wrong. Please, try again.')

            }
        } catch (error) {
            toast.error('Oops! Something went wrong. Please, try again.')
        }
    }
    return (
        <>
            <section className='create_notepost_area'>

                <div className='create_notepost'>
                    <form id='create_notepost_form'>
                        {loading ?
                            (<Skeleton variant='circular' width={80} height={80} overlay={true} sx={{ position: 'absolute', left: -40 }} />)

                            :
                            (
                                (avatar !== null ?
                                    <img src={avatar} alt='Avatar' className='create_notepost_avatar' onClick={handleClick} />
                                    :
                                    <div className='create_notepost_avatar' onClick={handleClick}>{firstCharacter}
                                    </div>
                                )
                            )
                        }


                        <div className='input_container'>
                            <textarea
                                id='content_input'
                                placeholder='Type here..'
                                value={newNotepost.content}
                                onChange={(e) => setNewNotepost({ content: e.target.value, topic: currentTopic })}
                                maxLength="200"
                            />
                        </div>
                        <button
                            type='submit'
                            onClick={createNotepost}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 9.51001L12 6.51001L15 9.51001" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 6.51001V14.51" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 16.51C9.89 17.81 14.11 17.81 18 16.51" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CreateNotepostArea;