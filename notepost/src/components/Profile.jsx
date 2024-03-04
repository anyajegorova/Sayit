import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        avatar: ''

    })
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [changePassword, setChangePassword] = useState(false)



    const firstCharacter = user.username.charAt(0);

    const navigate = useNavigate();

    useEffect(() => {
        getUser()
    }, [])

    const handleAvatarClick = () => {
        document.getElementById('avatarInput').click()
    }

    const handleAvatarChange = async (e) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const formData = new FormData();
                formData.append('avatar', e.target.files[0])
                const response = await fetch('http://localhost:8000/avatar', {
                    'method': 'POST',
                    'headers': {
                        'Authorization': `Bearer ${token}`,
                    },
                    'body': formData,
                    'credentials': 'include'
                })
                const data = await response.json();
                if (response.status === 200) {
                    getUser()
                }
                console.log(data)
            } catch (error) {
                console.log('Error changing avatar ', error)
            }
        } else {
            console.log('No token found')
            navigate('/login')
        }
    }

    const changePasswordHandler = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const response = await fetch('http://localhost:8000/change_password', {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    'body': JSON.stringify({ oldPassword, newPassword, newPasswordConfirmation }),
                    'credentials': 'include'
                })
                const data = await response.json();
                if (response.status === 200) {
                    setChangePassword(false)
                    setNewPassword('')
                    setNewPasswordConfirmation('')
                    setOldPassword('')
                    setSuccess(true)
                    setTimeout(() => {
                        setSuccess(false)
                    }, 3000)

                }
                console.log(data)
            } catch (error) {
                console.log('Error changing password ', error)
            }
        } else {
            console.log('No token found')
            navigate('/login')
        }
    }

    const getUser = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const response = await fetch('http://localhost:8000/profile', {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    'credentials': 'include'
                })
                const data = await response.json();

                setUser({ username: data.username, email: data.email, avatar: data.avatar.data })
                console.log(data.avatar.data, 'Avatar DATA')
                if (data.avatar.data !== null) {
                    // Fetch and set the avatar image
                    const avatarResponse = await fetch('http://localhost:8000/get_avatar', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                        credentials: 'include',
                    });
                    const avatarBlob = await avatarResponse.blob();
                    const avatarUrl = URL.createObjectURL(avatarBlob);
                    setUser((prevUser) => ({ ...prevUser, avatar: avatarUrl }));
                }

            } catch (error) {
                console.log('Error getting noteposts ', error)
            }
        } else {
            console.log('No token found')
        }
    }
    return (
        <div className='profile_page'>
            {user.avatar !== null ? <div className='avatar'>
                <img src={user.avatar} alt='Avatar' className='avatar_img' onClick={handleAvatarClick} />
                <input type='file' id='avatarInput' onChange={handleAvatarChange} accept='image/*' name='avatar'
                />
            </div>

                :
                <div className='avatar'>{firstCharacter}
                    <input type='file' id='avatarInput' onChange={handleAvatarChange} accept='image/*' name='avatar'
                    /></div>
            }
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
                        {success ? <div className='success'>Password changed successfully</div> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;