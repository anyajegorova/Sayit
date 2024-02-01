import { useState, useEffect } from 'react';
import './Notepost.css';
const Notepost = ({ name, date, content, setShowAlert, setCurrentNotepostName, currentMode, ownerEmail }) => {
    const openDeleteAlert = () => {
        setShowAlert(true)
        setCurrentNotepostName(name)
    }

    useEffect(() => {
        console.log('Notepost mode: ', currentMode)

    }, [])
    return (
        <div className='notepost'>
            {(currentMode == 'edit') ? <div id='close' onClick={openDeleteAlert}>✖</div> : null}
            {(currentMode == 'public') ? <div id='owner'>{ownerEmail}</div> : null}
            <div className='notepost_info'>
                <h1 id='notepost_name'>{name}</h1>
                <h1 id='notepost_date'>{date}</h1>
            </div>

            <h2 id='notepost_content'>{content}</h2>
        </div>
    )
}

export default Notepost;