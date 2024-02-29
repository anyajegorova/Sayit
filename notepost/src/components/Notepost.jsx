import { useState, useEffect } from 'react';
import Like from './Like';
import './Notepost.css';

import {jwtDecode} from 'jwt-decode';


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
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);

    const [isFavourite, setIsFavourite] = useState(decodedToken && favourites?.includes(decodedToken.id));
    const [like, setLike] = useState(likeCount);


    const openDeleteAlert = (name) => {
        setShowAlert(true)
        setCurrentNotepostName(name)
    }

    useEffect(() => {
        setIsFavourite(decodedToken && favourites?.includes(decodedToken.id));

    }, [favourites, decodedToken])

    const toggleLike = () => {
        onToggleLike(notepostId)
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
            {(currentMode == 'edit') ? <div id='close' onClick={() => openDeleteAlert(name)}>✖</div> : null}
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
