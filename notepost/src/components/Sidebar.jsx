import Topic from './Topic';
import './styles/Sidebar.css';

const Sidebar = ({ onClose, isSidebarOpen }) => {
    console.log(onClose)
    const handleClose = () => {
        onClose();
    }
    return (
        <div className={`sidebar ${isSidebarOpen ? 'sidebar_open' : 'sidebar_closed'}`}>
            <div className={`${isSidebarOpen ? 'topics_container' : 'hidden_topics_container'}`}>
                <button>New Topic</button>
                <div className="topics_list">
                    <Topic />
                </div>
            </div>
            <div className='hide_sidebar'>
                <button onClick={handleClose}>
                    {isSidebarOpen ?
                        <svg viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0">
                            </g>
                            <g id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M15 6L9 12L15 18"
                                    stroke="#ffffff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                </path>
                            </g>
                        </svg>
                        :

                        <svg viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0">
                            </g>
                            <g id="SVGRepo_tracerCarrier"
                                strokeLinecap="round" strokeLinejoin="round">
                            </g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M9 6L15 12L9 18"
                                    stroke="#ffffff" strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                </path>
                            </g>
                        </svg>}

                </button>
            </div>
        </div>
    )
}

export default Sidebar;