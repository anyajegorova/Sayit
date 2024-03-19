import './styles/AlertModal.css';

const AlertModal = ({ deleteNotepost, setShowAlert }) => {

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
                        <p>Are you sure you want to delete the post? The post will be deleted permanently.</p>
                        <div id='alert_buttons'>
                            <button onClick={closeModal} id='no'>No</button>
                            <button onClick={handleDelete} id='yes'>Yes</button>
                        </div>
                    </div>

                </div>


            </div>
        </>
    )
}

export default AlertModal;