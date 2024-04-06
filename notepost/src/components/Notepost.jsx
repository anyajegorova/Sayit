import Like from './Like';
import DeleteNotepost from './DeleteNotepost';
import './styles/Notepost.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import Skeleton from '@mui/material/Skeleton';

const Notepost = ({
    date,
    content,
    currentMode,
    avatar,
    username,
    notepostId,
    likeCount,
    getNoteposts,
    handleToggleLike,
    favourites,

}) => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const firstCharacter = username.charAt(0);
    const navigate = useNavigate();

    const toggleLike = () => {
        handleToggleLike(notepostId, likeCount, favourites)
    }

    const handleClick = () => {
        navigate('/profile')
    }
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const isFavourite = favourites.includes(decodedToken.id);

    useEffect(() => {
        getPostAvatar();
    })

    const getPostAvatar = async () => {
        try {
            const avatarResponse = await fetch('https://sayit-api.onrender.com/get_user_avatar', {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                'credentials': 'include',
                body: JSON.stringify({ username: username })
            })
            if (avatarResponse.ok) {
                const avatarBlob = await avatarResponse.blob();
                const avatarUrl = URL.createObjectURL(avatarBlob);
                setAvatarUrl(avatarUrl);
                setLoading(false)
            } else {
                console.log('Error fetching data', avatarResponse.statusText)
            }

        } catch (error) {
            console.error('Error fetching data', error)
        }
    }

    return (
        <div className='notepost'>
            {loading ? (
                <Skeleton variant='circular' width={50} height={50} overlay={true} sx={{ position: 'absolute', top: 25, left: -25 }} />
            ) : (
                (currentMode === 'public' && avatar !== null) ? (
                    <img id='notepost_avatar' src={avatarUrl} alt='avatar' />
                ) : (
                    null
                )
            )}
            {(currentMode == 'public' && avatar == null) ? <div id='notepost_avatar' onClick={handleClick}>{firstCharacter} </div> : null}
            {(currentMode == 'edit') ? <DeleteNotepost notepostId={notepostId} getNoteposts={getNoteposts} /> : null}
            {(currentMode == 'public') ? <div id='owner'>{username}</div> : null}
            <Like onToggleLike={toggleLike} likes={likeCount} isFavourite={isFavourite} />

            <div className='notepost_info'>
                <h2 id='notepost_content' className={(currentMode == 'edit') ? 'edit' : ''}>{content}</h2>
                <h1 id='notepost_date'>{date}</h1>
            </div>


        </div>
    )
}

export default Notepost;
