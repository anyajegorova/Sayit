import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AllNoteposts.css'
import Notepost from '../components/Notepost';
import CreateNotepostArea from '../components/CreateNotepostArea';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

const AllNoteposts = ({ mode }) => {
    const [noteposts, setNoteposts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768 ? true : false);
    const [currentTopic, setCurrentTopic] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        getAllNoteposts();
        setLoading(false)
    }, [])

    useEffect(() => {
        window.scrollTo(0, document.getElementById('anchor').offsetTop - 100)
        console.log('notepost dependency useeffect')
    }, [noteposts])

    useEffect(() => {
        getAllNoteposts();
        window.scrollTo(0, document.getElementById('anchor').offsetTop - 100)
    }, [currentTopic, mode])

    const handleCloseSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleTopicChange = (id) => {
        setCurrentTopic(id)
    }
    const token = localStorage.getItem('token');

    const getAllNoteposts = async () => {
        if (token) {
            try {
                const response = await fetch('https://sayit-api.onrender.com/public_noteposts', {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json',
                    },
                    'credentials': 'include',
                    body: JSON.stringify({ topic: currentTopic })
                })
                const data = await response.json();
                if (response.ok) {
                    const formattedNoteposts = data.map((notepost) => ({
                        date: notepost.date,
                        content: notepost.content,
                        ownerEmail: notepost.ownerEmail,
                        avatar: notepost.avatar.data,
                        username: notepost.username,
                        notepostId: notepost.notepostId.toString(),
                        likedBy: notepost.likedBy,
                        likeCount: notepost.likeCount,
                        topic: notepost.topic
                    }))
                    setNoteposts(formattedNoteposts);
                } else if (response.status === 404) {
                    toast.error('No posts found!')
                } else if (response.status === 500) {
                    toast.error('Oops! Something went wrong. Please, try again.')
                }

            } catch (error) {
                toast.error('Oops! Something went wrong. Please, try again.')

            }
        } else {
            navigate('/login');
        }

    }

    return (
        <div className="all_noteposts_section_container">
            <Sidebar
                onClose={handleCloseSidebar}
                isSidebarOpen={isSidebarOpen}
                onTopicChange={handleTopicChange}
                mode={mode}
            />
            <div className={`all_noteposts_container ${isSidebarOpen ? 'sidebar_open' : 'sidebar_closed'}`}>
                <div className='all_noteposts'>
                    {loading ? (
                        <h1>Loading..</h1>
                    ) : (
                        noteposts?.map((notepost) => (
                            <Notepost
                                key={notepost.notepostId + notepost.date + notepost.username}
                                date={notepost.date}
                                content={notepost.content}
                                currentMode={mode}
                                ownerEmail={notepost.ownerEmail}
                                avatar={notepost.avatar}
                                username={notepost.username}
                                notepostId={notepost.notepostId}
                                favourites={notepost.likedBy}
                                likeCount={notepost.likeCount}
                                setNoteposts={setNoteposts}
                            />))
                    )
                    }

                </div>
                <div className='create_notepost_container'>
                    <CreateNotepostArea getAllNoteposts={getAllNoteposts} currentTopic={currentTopic} />
                </div>
                <div id='anchor'></div>
            </div>

        </div>
    );
}

export default AllNoteposts;