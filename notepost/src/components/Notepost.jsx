import Like from './Like';
import DeleteNotepost from './DeleteNotepost';
import './styles/Notepost.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

const Notepost = ({
    date,
    content,
    currentMode,
    avatar,
    username,
    notepostId,
    likeCount,
    getNoteposts,
    handleToggleLike,
    favourites,

}) => {
    const firstCharacter = username.charAt(0);
    const navigate = useNavigate();

    const toggleLike = () => {
        handleToggleLike(notepostId, likeCount, favourites)
    }

    const handleClick = () => {
        navigate('https://sayit-api.onrender.com/profile')
    }
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token)
    const isFavourite = favourites.includes(decodedToken.id);

    return (
        <div className='notepost'>
            {(currentMode == 'public' && avatar !== null) ? <img id='notepost_avatar' src={`https://sayit-api.onrender.com/uploads/${avatar}`} alt='avatar' /> : null}
            {(currentMode == 'public' && avatar == null) ? <div id='notepost_avatar' onClick={handleClick}>{firstCharacter} </div> : null}
            {(currentMode == 'edit') ? <DeleteNotepost notepostId={notepostId} getNoteposts={getNoteposts} /> : null}
            {(currentMode == 'public') ? <div id='owner'>{username}</div> : null}
            <Like onToggleLike={toggleLike} likes={likeCount} isFavourite={isFavourite} />

            <div className='notepost_info'>
                <h2 id='notepost_content' className={(currentMode == 'edit') ? 'edit' : ''}>{content}</h2>
                <h1 id='notepost_date'>{date}</h1>
            </div>


        </div>
    )
}

export default Notepost;
