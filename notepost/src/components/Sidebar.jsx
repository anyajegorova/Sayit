import { useEffect, useState } from 'react';
import Topic from './Topic';
import './styles/Sidebar.css';
import { toast } from 'react-toastify';

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
            const response = await fetch('/topics', {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                'credentials': 'include'
            })
            if (response.ok) {
                const data = await response.json();
                setTopics(data)
                console.log('Topics fetched:', data);
                setLoading(false)
            } else {
                toast.error('Unable to load topics. Please try again.')
            }

        }
        catch (error) {
            console.error(error)
            toast.error('Oops! Something went wrong. Please try again.')
        }
    }

    const addTopic = async () => {
        if (newTopic === '') {
            console.error('Topic cannot be empty')
            toast.error('Topic cannot be empty')
        } else {
            try {
                const response = await fetch('/new_topic', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    'credentials': 'include',
                    body: JSON.stringify({ topic: newTopic })
                })
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setNewTopic('')
                    getTopics()

                } else {
                    console.error('Error adding topic')
                    toast.error('Oops! Something went wrong. Please try again.')
                }


            } catch (error) {
                console.error('Error adding topic', error)
                toast.error('Oops! Something went wrong. Please try again.')
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
                            <Topic topics={topics} onTopicChange={onTopicChange} onClose={onClose} />
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