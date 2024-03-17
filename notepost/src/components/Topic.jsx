import './styles/Topic.css';


const Topic = ({ topics, onTopicChange }) => {
    
    const handleClick = (id) => {
        onTopicChange(id)
        console.log(id + ' clicked')
    }
    return (
        <div className='topic_container'>
            {topics?.map((topic) => (
                <button className='topic_button' key={topic.name + topic.date} onClick={() => handleClick(topic._id)}>
                    {topic.name}
                </button>

            ))}

        </div>
    )
}

export default Topic;