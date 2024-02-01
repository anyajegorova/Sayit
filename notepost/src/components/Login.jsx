import './Login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = ({ mode, setUserId, setLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [currentUser, setCurrentUser] = useState({
        id: '',
        email: ''
    })
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

                console.log(data)
                setLoggedIn(true)
                Cookies.set('token', data.token, { expires: 7 });
                localStorage.setItem('userId', data.id);
                localStorage.setItem('username', data.username);

                console.log('Login successful');
                const saveId = data.id;
                console.log('Login ', saveId)
                setUserId(saveId);
                navigate('/all_noteposts')

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
            const data = response.ok ? await response.json() : console.log('not ok');

            if (response.ok) {
                navigate('/login')
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
                <form>
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