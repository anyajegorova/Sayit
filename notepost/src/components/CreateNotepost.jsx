import './CreateNotepost.css';
import { useState, useEffect } from 'react';

const CreateNotepost = ({ showModal, setShowModal, newNotepost, setNewNotepost, userId }) => {


    const closeModal = () => {
        setShowModal(false)
        console.log('close modal')
    }

    const setName = (e) => {
        setNewNotepost((prev) => ({
            ...prev,
            name: e.target.value
        }))
    }
    const setDate = (e) => {
        setNewNotepost((prev) => ({
            ...prev,
            date: e.target.value
        }))
    }
    const setContent = (e) => {
        setNewNotepost((prev) => ({
            ...prev,
            content: e.target.value
        }))
    }


    useEffect(() => {
        setNewNotepost((prev) => ({
            ...prev,
            userId: userId
        }))
        console.log('useEffect', userId)
    }, [userId]);

    //Create new notepost

    const addNewNotepost = async (e) => {
        e.preventDefault()
        setShowModal(false);
        console.log(newNotepost)
        console.log('create new notepost')
        console.log('New notepost', userId)
        console.log(newNotepost)

        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newNotepost)
            }
            const response = await fetch('http://localhost:8000/noteposts', options);
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                console.log('Success', data);
                console.log('New notepost: ', newNotepost)
            } else {
                console.log('Error', response.status)
            }

        } catch (error) {
            console.error({ message: 'Not able to save notepost' }, error)
        }


    }
    return (<div>
        {showModal ? <div className='modal'>
            <div className='modal_content'>
                <div id='close_modal' onClick={closeModal}>✖</div>
                <div className='modal_header'>
                    <h1>Add a notepost</h1>
                </div>
                <div className='modal_body'>
                    <form>

                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' name='name' placeholder='Name' onChange={setName} />

                        <label htmlFor='date'>Date</label>
                        <input type='date' id='date' name='date' placeholder='Date' onChange={setDate} />

                        <label htmlFor='content'>Content</label>
                        <textarea id='content' name='content' placeholder='Content' onChange={setContent} />

                        <button type='submit' onClick={addNewNotepost}>Add</button>
                    </form>
                </div>
            </div>
        </div> : null}
    </div>




    )
}

export default CreateNotepost;