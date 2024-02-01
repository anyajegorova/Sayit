import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './Profile.css'
const Profile = ({ userId }) => {
    const [user, setUser] = useState({
        username: '',
        email: ''

    })

    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')
    const [oldPassword, setOldPassword] = useState('')

    const [changePassword, setChangePassword] = useState(false)

    useEffect(() => {
        getUser()
        console.log(userId)
    }, [])

    const changePasswordHandler = async () => {
        const token = Cookies.get('token');

        if (token) {
            try {
                const response = await fetch('http://localhost:8000/change_password', {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    'body': JSON.stringify({ userId, oldPassword, newPassword, newPasswordConfirmation }),
                    'credentials': 'include'
                })
                const data = await response.json();
                console.log(data)
            } catch (error) {
                console.log('Error changing password ', error)
            }
        } else {
            console.log('No token found')
        }
    }

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
            <h1>{user.username}</h1>
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
                    <div className='change_password_container'>
                        <button id='change_password' onClick={() => setChangePassword(!changePassword)}>Change Password</button>
                        {changePassword ?
                            (<>
                                <input type='password' placeholder='Old Password' id='change_password_input' onChange={e => setOldPassword(e.target.value)} />
                                <input type='password' placeholder='New Password' id='change_password_input' onChange={e => setNewPassword(e.target.value)} />
                                <input type='password' placeholder='Confirm New Password' id='change_password_input' onChange={e => setNewPasswordConfirmation(e.target.value)} />
                                <div className='change_password_buttons'>
                                    <button onClick={changePasswordHandler} id='yes'>Submit</button>
                                    <button onClick={() => setChangePassword(!changePassword)} id='no'>Cancel</button>
                                </div>
                            </>)
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;