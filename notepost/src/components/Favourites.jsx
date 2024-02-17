import { useState, useEffect } from 'react';
import Notepost from './Notepost';
import './Favourites.css';
import Cookies from 'js-cookie';

const Favourites = () => {
    const [favourites, setFavourites] = useState([])
    const userId = localStorage.getItem('userId');
    
    useEffect(() => {
        getFavourites()
    }, [])

const getFavourites = async () => {
    try {
        const response = await fetch(`http://localhost:8000/favourites/${userId}`, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
            'credentials': 'include'
        })
        const data = await response.json();
        console.log(data, 'Favourites')
        const formattedNotepost = data.map((notepost) => ({
            name: notepost.name,
            date: notepost.date,
            content: notepost.content,
            ownerEmail: notepost.ownerEmail,
            notepostId: notepost.notepostId,
            likedBy: notepost.likedBy,
            likeCount: notepost.likeCount,
        }))
        setFavourites(formattedNotepost);
        console.log(formattedNotepost, 'Formatted favourites')
    } catch (error) {
        console.log('Error getting favourites ', error)
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
                            setShowAlert={''}
                            setCurrentNotepostName={''}
                            currentMode={''}
                            ownerEmail={''}
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