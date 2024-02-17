import { useState, useEffect } from 'react';

import './AllNoteposts.css'
import Notepost from './Notepost';

const AllNoteposts = ({ mode }) => {
    const [noteposts, setNoteposts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllNoteposts();
        setLoading(false)
    }, [])

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
            console.log(data, 'All noteposts')

            const formattedNoteposts = data.map((notepost) => ({
                name: notepost.name,
                date: notepost.date,
                content: notepost.content,
                ownerEmail: notepost.ownerEmail,
                username: notepost.username,
                notepostId: notepost.notepostId,
                likedBy: notepost.likedBy,
                likeCount: notepost.likeCount,
            }))
            console.log('Here', response)
            setNoteposts(formattedNoteposts);
            console.log(formattedNoteposts, 'Formatted noteposts')

        } catch (error) {
            console.log('Error getting noteposts ', error)
        }
    }

    return (
        <div className='all_noteposts_container'>
            <div className='all_noteposts'>
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    noteposts?.map((notepost) => (
                        <Notepost key={notepost.name}
                            name={notepost.name}
                            date={notepost.date}
                            content={notepost.content}
                            setShowAlert={''}
                            setCurrentNotepostName={''}
                            currentMode={mode}
                            ownerEmail={notepost.ownerEmail}
                            username={notepost.username}
                            notepostId={notepost.notepostId}
                            favourites={notepost.likedBy}
                            likeCount={notepost.likeCount}
                            setNoteposts={setNoteposts}
                        />))
                )




                }

            </div>
        </div>
    );
}

export default AllNoteposts;