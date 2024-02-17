import { useState, useEffect } from 'react';
import Like from './Like';
import './Notepost.css';
const Notepost = ({
    name,
    date,
    content,
    setShowAlert,
    setCurrentNotepostName,
    currentMode,
    username,
    notepostId,
    favourites,
    likeCount,
    setNoteposts

}) => {

    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [isFavourite, setIsFavourite] = useState(userId && favourites?.includes(userId) ? true : false);
    const [like, setLike] = useState(likeCount);

    const token = localStorage.getItem('token');

    const openDeleteAlert = () => {
        setShowAlert(true)
        setCurrentNotepostName(name)
    }

    useEffect(() => {
        setUserId(localStorage.getItem('userId'))
        console.log(userId, 'userId')
    }, [])

    const toggleLike = () => {
        onToggleLike(notepostId)
    }

    const onToggleLike = async (notepostId) => {
        try {
            const response = await fetch(`http://localhost:8000/toggle_like/${userId}/like`, {
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
                console.log(like, isFavourite)
                console.log(updatedNotepost, 'Updated notepost')


                console.log('Favourites updated')
            } else {
                console.log('Error updating like')
            }

        } catch (error) {
            console.error('Error updating like', error)

        }
    }
    return (
        <div className='notepost'>
            {(currentMode == 'edit') ? <div id='close' onClick={openDeleteAlert}>✖</div> : null}
            {(currentMode == 'public') ? <div id='owner'>By: {username}</div> : null}
            <Like onToggleLike={toggleLike} isFavourite={isFavourite} likes={like} />

            <div className='notepost_info'>
                <h1 id='notepost_name'>{name}</h1>
                <h1 id='notepost_date'>{date}</h1>
            </div>

            <h2 id='notepost_content'>{content}</h2>
        </div>
    )
}

export default Notepost;
