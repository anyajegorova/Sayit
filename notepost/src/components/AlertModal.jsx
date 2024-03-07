import './styles/AlertModal.css';

const AlertModal = ({  notepostName, deleteNotepost, setShowAlert }) => {

    const closeModal = () => {
        setShowAlert(false)
    }

    const handleDelete = () => {
        deleteNotepost()
    }

    return (
        <>
            <div className='alert_container'>
                <div className='modal_alert'>
                    <div className='content_container'>
                        <div id='closeAlert' onClick={closeModal}>✖</div>
                        <h1>Delete {`"${notepostName}"`} ?</h1>
                        <p>Are you sure you want to delete {`"${notepostName}"`}? The post will be deleted permanently.</p>
                        <div id='alert_buttons'>
                            <button onClick={handleDelete} id='yes'>Yes</button>
                            <button onClick={closeModal} id='no'>No</button>
                        </div>
                    </div>

                </div>


            </div>                                                         
        </>
    )
}

export default AlertModal;