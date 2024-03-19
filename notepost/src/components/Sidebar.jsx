import { useEffect, useState } from 'react';
import Topic from './Topic';
import './styles/Sidebar.css';

const Sidebar = ({ onClose, isSidebarOpen, onTopicChange, mode }) => {
    const [newTopic, setNewTopic] = useState('')
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [generalTopic, setGeneralTopic] = useState('')

    const handleClose = () => {
        onClose();
    }
    useEffect(() => {
        getTopics()
    }, [])

    const token = localStorage.getItem('token');

    const getTopics = async () => {
        try {
            setLoading(true)
            const response = await fetch('http://localhost:8000/topics', {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                'credentials': 'include'
            })
            const data = await response.json();
            setTopics(data)
            console.log('Topics fetched:', data);
            setLoading(false)
        }
        catch (error) {
            console.error(error)
        }
    }

    const addTopic = async () => {
        if (newTopic === '') {
            console.error('Topic cannot be empty')
        } else {
            try {
                const response = await fetch('http://localhost:8000/new_topic', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    'credentials': 'include',
                    body: JSON.stringify({ topic: newTopic })
                })
                const data = await response.json();
                console.log(data)
                setNewTopic('')
                getTopics()


            } catch (error) {
                console.error('Error adding topic', error)
            }
        }

    }


    return (
        <div className={`sidebar ${isSidebarOpen ? 'sidebar_open' : 'sidebar_closed'}`}>
            <div className={`${isSidebarOpen ? 'topics_container' : 'hidden_topics_container'}`}>
                {loading ? (
                    <div>Loading topics...</div>
                ) : (
                    <>
                        <input onChange={(e) => { setNewTopic(e.target.value) }} id='topic_input' placeholder='Type here..'></input>
                        <button onClick={addTopic}>New Topic</button>
                        <div className="topics_list">
                            <Topic topics={topics} onTopicChange={onTopicChange} />
                        </div>
                    </>
                )}
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