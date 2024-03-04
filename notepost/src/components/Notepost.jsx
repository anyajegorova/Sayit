import { useState, useEffect } from 'react';
import Like from './Like';
import './Notepost.css';

import { jwtDecode } from 'jwt-decode';


const Notepost = ({
    name,
    date,
    content,
    setShowAlert,
    setCurrentNotepostName,
    currentMode,
    avatar,
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

    const avatarBlob = new Blob([avatar], { type: 'image/png' });
    const avatarUrl = URL.createObjectURL(avatarBlob);


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
    // // Get user avatar
    // const getAvatar = async () => {
    //     if (token) {
    //         try {


    //             const avatarResponse = await fetch('http://localhost:8000/get_user_avatar/', {
    //                 'method': 'POST',
    //                 'headers': {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`,
    //                 },
    //                 'body': JSON.stringify({ username }),
    //                 'credentials': 'include'
    //             });
    //             const avatarBlob = await avatarResponse.blob();
    //             const avatarUrl = URL.createObjectURL(avatarBlob);
    //             setUserAvatar(avatarUrl);

    //         }
    //         catch (error) {
    //             console.log('Error getting avatar ', error)
    //         }
    //     }
    // }

    return (
        <div className='notepost'><h1 id='notepost_name'>{name}</h1>
            {(currentMode == 'public') ? <img id='notepost_avatar' src={`http://localhost:8000/uploads/${avatar}`} alt='avatar' /> : null}
            {(currentMode == 'edit') ? <div id='close' onClick={() => openDeleteAlert(name)}>✖</div> : null}
            {(currentMode == 'public') ? <div id='owner'>{username}</div> : null}
            <Like onToggleLike={toggleLike} isFavourite={isFavourite} likes={like} />

            <div className='notepost_info'>

                <h2 id='notepost_content'>{content}</h2>
            </div>

            <h1 id='notepost_date'>{date}</h1>

        </div>
    )
}

export default Notepost;
