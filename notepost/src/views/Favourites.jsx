import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notepost from '../components/Notepost';
import './styles/Favourites.css';
import { toast } from 'react-toastify';
import handleToggleLike from '../utils/toggleLikeUtils';

const Favourites = () => {
    const [favourites, setFavourites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getFavourites()
    }, [])

    const onToggleLike = async (notepostId) => {
        handleToggleLike(notepostId, token, setFavourites, toast);
    };


    const token = localStorage.getItem('token');

    const getFavourites = async () => {
        if (token) {
            try {
                const response = await fetch("https://sayit-api.onrender.com/favourites/", {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    'credentials': 'include'
                })
                console.log(response.status)
                if (response.ok) {
                    const data = await response.json();
                    const formattedNotepost = data.map((notepost) => ({
                        date: notepost.date,
                        content: notepost.content,
                        ownerEmail: notepost.ownerEmail,
                        username: notepost.username,
                        avatar: notepost.avatar.data,
                        notepostId: notepost.notepostId,
                        likedBy: notepost.likedBy,
                        likeCount: notepost.likeCount,
                    }))
                    setFavourites(formattedNotepost);
                } else if (response.status === 404) {
                    toast.info("You don't have any likes yet!")
                } else {
                    toast.error('Oops! Something went wrong. Please try again later.')
                }

            } catch (error) {
                console.log('Error getting favourites ', error)
                toast.error('Oops! Something went wrong. Please try again later.')
            }
        } else {
            console.log('No token found')
            navigate('https://sayit-api.onrender.com/login')
        }
    }
    return (
        <div className="favourites">
            <div className="favourites_container">
                <div className="favourites_list">
                    {favourites?.map((notepost) => (
                        <Notepost
                            key={notepost.notepostId + notepost.date + notepost.username}
                            username={notepost.username}
                            date={notepost.date}
                            content={notepost.content}
                            currentMode={'public'}
                            ownerEmail={notepost.ownerEmail}
                            avatar={notepost.avatar}
                            isFavourite={notepost.isFavourite}
                            notepostId={notepost.notepostId}
                            favourites={notepost.likedBy}
                            likeCount={notepost.likeCount}
                            setNoteposts={setFavourites}
                            handleToggleLike={onToggleLike}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Favourites;