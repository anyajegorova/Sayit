import './styles/Home.css';
import './styles/fonts.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = ({ loggedIn }) => {
    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleClick = (loggedIn) => {
        loggedIn ? navigate('/public_noteposts') : navigate('/login')
    }
    return (
        <>
            <section className='home_page'>
                <div className='slogan_container'>
                    <span className={isVisible ? 'show' : ''}>Express, Impress, and Simply Say it!</span>
                </div>
                <div className='description_container'>
                    <div className={`description one ${isVisible ? 'showOne' : ''} `}>
                        <svg viewBox="0 0 64 64"
                            xmlns="http://www.w3.org/2000/svg"
                            strokeWidth="2"
                            stroke="#ffffff"
                            fill="none">
                            <g id="SVGRepo_bgCarrier"
                                strokeWidth="0">
                            </g>
                            <g id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                            </g>
                            <g id="SVGRepo_iconCarrier">
                                <line x1="50.4" y1="24.38" x2="58.3" y2="23.14">
                                </line>
                                <line x1="47.93" y1="17.11" x2="52.87" y2="14.2">
                                </line>
                                <line x1="42.89" y1="11.73" x2="46.21" y2="4.51">
                                </line>
                                <line x1="33.45" y1="10.69" x2="33.41" y2="4.96">
                                </line><line x1="24.29" y1="12.09" x2="21.62" y2="4.51">
                                </line>
                                <line x1="17.99" y1="17.03" x2="12.96" y2="14.29">
                                </line><line x1="15.78" y1="23.97" x2="8.03" y2="22.66">
                                </line>
                                <path d="M26.22,45.47c0-5.16-3.19-9.49-4.91-12.69A12.24,12.24,0,0,1,19.85,27c0-6.79,6.21-12.3,13-12.3">
                                </path>
                                <path d="M39.48,45.47c0-5.16,3.19-9.49,4.91-12.69A12.24,12.24,0,0,0,45.85,27c0-6.79-6.21-12.3-13-12.3">
                                </path>
                                <rect x="23.63" y="45.19" width="18.93" height="4.25" rx="2.12">
                                </rect>
                                <rect x="24.79" y="49.43" width="16.61" height="4.25" rx="2.12">
                                </rect>
                                <path d="M36.32,53.68v.84a3.23,3.23,0,1,1-6.44,0v-.84">
                                </path>
                                <path d="M24.57,26.25a7.5,7.5,0,0,1,7.88-7.11">
                                </path>
                            </g>
                        </svg>
                        <span >1. Create a topic</span>
                    </div>

                    <div className={`description two ${isVisible ? 'showTwo' : ''} `}>
                        <svg viewBox="0 0 64 64"
                            xmlns="http://www.w3.org/2000/svg"
                            strokeWidth="2"
                            stroke="#ffffff"
                            fill="none">
                            <g id="SVGRepo_bgCarrier"
                                strokeWidth="0">
                            </g>
                            <g id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                            </g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M56.58,28.81c0,10.72-11,19.41-24.58,19.41A29.53,29.53,0,0,1,28.33,48c-2.08-.24-7.92,7.19-9.79,6.56-1.51-.51.9-9-.43-9.73-6.46-3.5-10.69-9.37-10.69-16,0-10.72,11-19.4,24.58-19.4S56.58,18.09,56.58,28.81Z"
                                    strokeLinecap="round">
                                </path>
                                <polyline points="23.38 28.55 23.38 28.55 23.88 28.55" strokeLinecap="round">
                                </polyline>
                                <polyline points="32 28.55 32 28.55 32.5 28.55" strokeLinecap="round">
                                </polyline>
                                <polyline points="40.36 28.55 40.36 28.55 40.86 28.55" strokeLinecap="round">
                                </polyline>
                            </g>
                        </svg>
                        <span >2. Say anything you want</span>
                    </div>

                    <div className={`description three ${isVisible ? 'showThree' : ''} `}>
                        <svg viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier"
                                strokeWidth="0">
                            </g>
                            <g id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                            </g>
                            <g id="SVGRepo_iconCarrier">
                                <path fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                    stroke="#ffffff"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                </path>
                            </g>
                        </svg>
                        <span >3. Like what others say</span>
                    </div>


                </div>
                <div className='button_container'>
                    {loggedIn ?
                        <button onClick={() => handleClick(loggedIn)}>See all posts</button> :
                        <button onClick={() => handleClick(loggedIn)}>Login</button>}
                </div>

            </section>
        </>
    )
}

export default Home;