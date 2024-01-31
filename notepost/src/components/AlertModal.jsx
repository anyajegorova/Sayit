import './AlertModal.css';

const AlertModal = ({ setShowAlert, deleteNotepost, currentNotepostName }) => {

    const closeModal = () => {
        setShowAlert(false)
    }

    const handleDelete = () => {
        deleteNotepost(currentNotepostName)
        setShowAlert(false)
    }

    return (
        <>
            <div className='alert_container'>
                <div className='modal_alert'>
                    <div id='close' onClick={closeModal}>✖</div>
                    <h1>Delete {`"${currentNotepostName}"`} ?</h1>
                    <p>Are you sure you want to delete {`"${currentNotepostName}"`}? The post will be deleted permanently.</p>
                    <div id='alert_buttons'>
                        <button onClick={handleDelete} id='yes'>Yes</button>
                        <button onClick={closeModal} id='no'>No</button>
                    </div>
                </div>


            </div>
        </>
    )
}

export default AlertModal;