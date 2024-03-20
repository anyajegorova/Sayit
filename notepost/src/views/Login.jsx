import './styles/Login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const Login = ({ mode, setLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                }),
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json();
                setLoggedIn(true)
                Cookies.set('token', data.token, { expires: 7 });
                localStorage.setItem('token', data.token)
                localStorage.setItem('username', data.username);
                navigate('/public_noteposts')

            } else {
                if (response.status === 401) {
                    toast.error('Invalid email or password!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark'
                    })
                } else if (response.status === 500) {
                    toast.error('Oops! Something went wrong. Please, try again.', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark'
                    })
                }

            }

        } catch (error) {
            console.error(error)
        }
    }


    //Register
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })

            if (response.ok) {
                navigate('/login')
                toast.success('User created successfully!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                })
                console.log('Registered successfully!');
            } else {
                if (response.status === 409) {
                    toast.error('User already exists!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark'
                    })
                } else if (response.status === 500) {
                    toast.error('Oops! Something went wrong. Please, try again.', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark'
                    })
                }
            }
        } catch (error) {
            toast.error('Please enter valid credentials!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'
            })
        }
    }

    return (
        <div className='login_page'>
            <div className='login_container'>
                {mode === 'login' ? <h1>Login</h1> : <h1>Register</h1>}
                <form id='login_form'>
                    {mode === 'register' ? <input type="text" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} /> : null}
                    <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                    {mode === 'register' ? <input type="password" placeholder="Confirm Password" /> : null}
                    {mode === 'login' ? <input type="submit" value="Login" onClick={handleLogin} /> : <input type="submit" value="Register" onClick={handleRegister} />}

                    {
                        mode === 'login' ? <h4>Don't have an account? <span id='link' ><Link to='/register'>Register</Link></span></h4> : <h4>Already have an account? <span id='link'><Link to='/login'>Login</Link></span></h4>
                    }
                </form>
            </div>
        </div>

    )
}
export default Login;