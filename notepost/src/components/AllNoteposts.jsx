import { useState, useEffect } from 'react';

import './AllNoteposts.css'
import Notepost from './Notepost';
const AllNoteposts = () => {
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
            console.log('Here', response)
            console.log(data)
            setNoteposts(data);

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
                        mode={'public'} 
                        ownerEmail={notepost.ownerEmail}
                        />))}
            </div>
        </div>
    );
}

export default AllNoteposts;