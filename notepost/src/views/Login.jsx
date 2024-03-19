import './styles/Login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
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

                // //Logging all local storage
                // for (let i = 0; i < localStorage.length; i++) {
                //     const key = localStorage.key(i);
                //     const value = localStorage.getItem(key);
                //     console.log(`${key}: ${value}`);
                // }

                navigate('/public_noteposts')

            } else {
                console.log('Login failed')
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
                // toast.success('User created successfully!', {
                //     position: "top-center",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: 'dark'
                // })
                console.log('User created successfully!');
            } else {
                console.log('User creation failed')
            }


        } catch (error) {
            console.error('Authentication error ', error)
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