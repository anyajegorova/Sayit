import { useState } from 'react';
import './styles/Topic.css';

const Topic = ({ topics, onTopicChange, onClose }) => {
    const [activeTopic, setActiveTopic] = useState(null);

    const handleClick = (id) => {
        onTopicChange(id);
        setActiveTopic(id);
        window.innerWidth < 768 && onClose();
    }

    return (
        <div className='topic_container'>
            {topics?.map((topic) => (
                <button
                    className={`topic_button ${activeTopic === topic._id ? 'active' : ''}`}
                    key={topic.name + topic.date}
                    onClick={() => handleClick(topic._id)}
                >
                    {topic.name}
                </button>
            ))}
        </div>
    );
}

export default Topic;