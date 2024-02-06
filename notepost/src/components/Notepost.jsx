import { useState, useEffect } from 'react';
import './Notepost.css';
const Notepost = ({ name, date, content, isFavourite, setShowAlert, setCurrentNotepostName, currentMode, ownerEmail, username }) => {

    const [currentlyFavourite, setCurrentlyFavourite] = useState(isFavourite);

    const openDeleteAlert = () => {
        setShowAlert(true)
        setCurrentNotepostName(name)
    }

    useEffect(() => {
        console.log('Notepost mode: ', currentMode)
        console.log(username)
        console.log(isFavourite)
    }, [])

    const toggleFavourite = () => {
        setCurrentlyFavourite(!currentlyFavourite)
        console.log(currentlyFavourite)
        console.log('Favourite toggled')
        console.log(currentlyFavourite)
    }
    return (
        <div className='notepost'>
            {(currentMode == 'edit') ? <div id='close' onClick={openDeleteAlert}>✖</div> : null}
            {(currentMode == 'public') ? <div id='owner'>{username}</div> : null}
            <div className='favourite' onClick={() => toggleFavourite()} id={`${currentlyFavourite ? 'isFavourite' : ''}`}>❤</div>
            <div className='notepost_info'>
                <h1 id='notepost_name'>{name}</h1>
                <h1 id='notepost_date'>{date}</h1>
            </div>

            <h2 id='notepost_content'>{content}</h2>
        </div>
    )
}

export default Notepost;