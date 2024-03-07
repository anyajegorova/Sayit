import { useState, useEffect } from 'react';

import './styles/AllNoteposts.css'
import Notepost from '../components/Notepost';
import CreateNotepostArea from '../components/CreateNotepostArea';

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

            const formattedNoteposts = data.map((notepost) => ({
                name: notepost.name,
                date: notepost.date,
                content: notepost.content,
                ownerEmail: notepost.ownerEmail,
                avatar: notepost.avatar.data,
                username: notepost.username,
                notepostId: notepost.notepostId,
                likedBy: notepost.likedBy,
                likeCount: notepost.likeCount,
            }))
            setNoteposts(formattedNoteposts);

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
                            avatar={notepost.avatar}
                            username={notepost.username}
                            notepostId={notepost.notepostId}
                            favourites={notepost.likedBy}
                            likeCount={notepost.likeCount}
                            setNoteposts={setNoteposts}
                        />))
                )
                }

            </div>
            <div className='create_notepost_container'>
                <CreateNotepostArea getAllNoteposts={getAllNoteposts}/>
            </div>
        </div>
    );
}

export default AllNoteposts;