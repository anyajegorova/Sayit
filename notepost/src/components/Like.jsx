
import './styles/Like.css';

const Like = ({ onToggleLike, likes, isFavourite }) => {
    return (
        <div className='favourite' onClick={onToggleLike}
            id={`${isFavourite ? 'isFavourite' : ''}`}
        >
            {likes > 0 ? likes : null} ❤
        </div>
    );
};



export default Like