
import './Like.css';

const Like = ({ onToggleLike, isFavourite, likes }) => {
    return (
        <div className='favourite' onClick={onToggleLike} id={`${isFavourite ? 'isFavourite' : ''}`}>
           {likes > 0 ? likes : null} ❤ 
        </div>
    );
};



export default Like