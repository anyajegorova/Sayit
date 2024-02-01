import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './Profile.css'
const Profile = ({ userId }) => {
    const [user, setUser] = useState({
        email: ''

    })

    useEffect(() => {
        getUser()
        console.log(userId)
    }, [])

    const getUser = async () => {
        const token = Cookies.get('token');

        if (token) {
            try {
                const response = await fetch('http://localhost:8000/profile', {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    'body': JSON.stringify({ userId }),
                    'credentials': 'include'
                })
                const data = await response.json();
                setUser({ email: data.email })
            } catch (error) {
                console.log('Error getting noteposts ', error)
            }
        } else {
            console.log('No token found')
        }
    }
    return (
        <div className='profile_page'>
            <h1>Profile</h1>
            <div className='profile_container'>
                <div className='profile'>

                    This is Profile page of {user.email}
                </div>
            </div>
        </div>
    )
}

export default Profile;