import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notepost from '../components/Notepost';
import './styles/Favourites.css';

const Favourites = () => {
    const [favourites, setFavourites] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getFavourites()
    }, [])

    const token = localStorage.getItem('token');

    const getFavourites = async () => {
        if (token) {
            try {
                const response = await fetch("http://localhost:8000/favourites/", {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    'credentials': 'include'
                })
                const data = await response.json();
                const formattedNotepost = data.map((notepost) => ({
                    name: notepost.name,
                    date: notepost.date,
                    content: notepost.content,
                    ownerEmail: notepost.ownerEmail,
                    avatar: notepost.avatar.data,
                    notepostId: notepost.notepostId,
                    likedBy: notepost.likedBy,
                    likeCount: notepost.likeCount,
                }))
                setFavourites(formattedNotepost);
            } catch (error) {
                console.log('Error getting favourites ', error)
            }
        } else {
            console.log('No token found')
            navigate('/login')
        }
    }
    return (
        <div className="Favourites">
            <div className="favourites_container">
                <div className="favourites_list">
                    {favourites?.map((notepost) => (
                        <Notepost
                            key={notepost.name}
                            name={notepost.name}
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
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Favourites;