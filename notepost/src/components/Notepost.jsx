import './Notepost.css';
const Notepost = ({ name, date, content, setShowAlert, currentNotepostName, setCurrentNotepostName }) => {

    const openDeleteAlert = () => {
        setShowAlert(true)
        setCurrentNotepostName(name)
    }
    return (
        <div className='notepost'>
            <div id='close' onClick={openDeleteAlert}>✖</div>
            <div className='notepost_info'>
                <h1 id='notepost_name'>{name}</h1>
                <h1 id='notepost_date'>{date}</h1>
            </div>

            <h2 id='notepost_content'>{content}</h2>
        </div>
    )
}

export default Notepost;