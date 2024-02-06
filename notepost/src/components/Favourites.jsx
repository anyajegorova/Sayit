import { useState, useEffect } from 'react';
import Notepost from './Notepost';
import './Favourites.css';
import Cookies from 'js-cookie';

const Favourites = ({ userId }) => {

    const [favourites, setFavourites] = useState([])

    useEffect(() => {
        getFavourites()
    }, [])

    const getFavourites = async () => {
        const token = Cookies.get('token');
        console.log('USER ID HERE', userId)
        console.log('TOKEN HERE FAVOURITES', token)
        if (token) {
            try {
                const response = await fetch('http://localhost:8000/favourites', {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    'body': JSON.stringify({ userId }),
                    'credentials': 'include'
                })
                const data = await response.json();
                console.log(data, 'FAVOURITES DATA HERE');
                if (response.status === 200) {
                    // setFavourites(data);
                    console.log(data, 'Favourites')
                } else {
                    console.log('Error getting favourites')
                }
            } catch (error) {
                console.log('Error getting favourites ', error)
            }
        } else {
            console.log('No token found')
        }

    }
    return (
        <div className="Favourites">
            <h1>Favourites</h1>
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
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Favourites;