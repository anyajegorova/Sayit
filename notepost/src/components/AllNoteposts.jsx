import { useState, useEffect } from 'react';

import './AllNoteposts.css'
import Notepost from './Notepost';
const AllNoteposts = ({mode}) => {
    const [noteposts, setNoteposts] = useState([]);

    // const formatDate = (date) => {
    //     const options = { day: 'numeric', month: 'long', year: 'numeric' };
    //     const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    //     return formattedDate;
    // }

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
                ownerEmail: notepost.ownerEmail
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
                        setShowAlert={''}
                        setCurrentNotepostName={''}
                        currentMode={mode}
                        ownerEmail={notepost.ownerEmail}
                    />))}
            </div>
        </div>
    );
}

export default AllNoteposts;