import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './Profile.css'
const Profile = ({ userId }) => {
    const [user, setUser] = useState({
        username: '',
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
                setUser({ username: data.username, email: data.email })
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
                    <div id='info'>
                        <h3>Username</h3>
                        <div className='profile_username'>{user.username}</div>
                    </div>
                    <div id='info'>
                        <h3>Email</h3>
                        <div className='profile_email'>{user.email}</div>
                    </div>
                    <div>
                        <h4>Change Password</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;