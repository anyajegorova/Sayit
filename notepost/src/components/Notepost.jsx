import { useState, useEffect } from 'react';
import Like from './Like';
import DeleteNotepost from './DeleteNotepost';
import './styles/Notepost.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';


const Notepost = ({
    date,
    content,
    currentMode,
    avatar,
    username,
    notepostId,
    favourites,
    likeCount,
    setNoteposts,
    getNoteposts

}) => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const firstCharacter = username.charAt(0);
    const navigate = useNavigate();

    const [isFavourite, setIsFavourite] = useState(decodedToken && favourites?.includes(decodedToken.id));
    const [like, setLike] = useState(likeCount);

    useEffect(() => {
        setIsFavourite(decodedToken && favourites?.includes(decodedToken.id));

    }, [favourites, decodedToken])

    const toggleLike = () => {
        onToggleLike(notepostId)
    }

    const handleClick = () => {
        navigate('/profile')
    }

    const onToggleLike = async (notepostId) => {
        try {
            const response = await fetch(`http://localhost:8000/toggle_like/like`, {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                'body': JSON.stringify({ notepostId }),
                'credentials': 'include'
            })
            console.log(response, 'Response')
            if (response.status === 200) {
                const responseData = await response.json();
                const { updatedNotepost } = responseData;
                console.log('Updated notepost:', updatedNotepost);

                setNoteposts((noteposts) =>
                    noteposts.map((notepost) =>
                        notepost.notepostId === notepostId
                            ? { ...notepost, likedBy: updatedNotepost.likedBy, likeCount: updatedNotepost.likeCount }
                            : notepost
                    )
                );

                setLike(updatedNotepost.likeCount)
                setIsFavourite(!isFavourite);
            } else {
                console.log('Error updating like')
                toast.error('Oops! Something went wrong. Please try again.')

            }

        } catch (error) {
            console.error('Error updating like', error)
            toast.error('Oops! Something went wrong. Please try again.')
        }
    }

    return (
        <div className='notepost'>
            {(currentMode == 'public' && avatar !== null) ? <img id='notepost_avatar' src={`http://localhost:8000/uploads/${avatar}`} alt='avatar' /> : null}
            {(currentMode == 'public' && avatar == null) ? <div id='notepost_avatar' onClick={handleClick}>{firstCharacter} </div> : null}
            {(currentMode == 'edit') ? <DeleteNotepost notepostId={notepostId} getNoteposts={getNoteposts} /> : null}
            {(currentMode == 'public') ? <div id='owner'>{username}</div> : null}
            <Like onToggleLike={toggleLike} isFavourite={isFavourite} likes={like} />

            <div className='notepost_info'>
                <h2 id='notepost_content' className={(currentMode == 'edit') ? 'edit' : ''}>{content}</h2>
                <h1 id='notepost_date'>{date}</h1>
            </div>


        </div>
    )
}

export default Notepost;
