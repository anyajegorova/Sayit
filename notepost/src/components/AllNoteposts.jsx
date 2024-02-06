import { useState, useEffect } from 'react';

import './AllNoteposts.css'
import Notepost from './Notepost';
const AllNoteposts = ({mode}) => {
    const [noteposts, setNoteposts] = useState([]);


    useEffect(() => { getAllNoteposts() }, [])

    const getAllNoteposts = async () => {
        try {
            const response = await fetch('http://localhost:8000/public_noteposts', {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                },
                'credentials': 'include'
            })

            const data = await response.json();

            const formattedNoteposts = data.map((notepost) => ({
                name: notepost.name,
                date: notepost.date,
                content: notepost.content,
                ownerEmail: notepost.ownerEmail,
                username: notepost.username,
                isFavourite: notepost.isFavourite
            }))
            console.log('Here', response)

            setNoteposts(formattedNoteposts);

        } catch (error) {
            console.log('Error getting noteposts ', error)
        }
    }

    return (
        <div className='all_noteposts_container'>
            <div className='all_noteposts'>
                {noteposts?.map((notepost) => (
                    <Notepost key={notepost.name}
                        name={notepost.name}
                        date={notepost.date}
                        content={notepost.content}
                        isFavourite={notepost.isFavourite}
                        setShowAlert={''}
                        setCurrentNotepostName={''}
                        currentMode={mode}
                        ownerEmail={notepost.ownerEmail}
                        username={notepost.username}
                    />))}
            </div>
        </div>
    );
}

export default AllNoteposts;