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
                        <div id='closeAlert' onClick={closeModal}>
                            <svg viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0">
                                </g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                    strokeLinejoin="round">
                                </g>
                                <g id="SVGRepo_iconCarrier">
                                    <g id="Menu / Close_SM">
                                        <path id="Vector"
                                            d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                                            stroke="#000000"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </div>
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