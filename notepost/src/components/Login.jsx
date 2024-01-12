import './Login.css';
import { useState } from 'react';

const Login = () => {
    const [mode, setMode] = useState('login');

    const changeMode = () => {
        mode === 'login' ? setMode('register') : setMode('login');
    }


    const handleClick = (e) => {
        e.preventDefault();
        console.log('Login button clicked');
    }
    return (
        <div className='login_page'>
            <div className='login_container'>
                {mode === 'login' ? <h1>Login</h1> : <h1>Register</h1>}
                <form>
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    {mode === 'register' ? <input type="password" placeholder="Confirm Password" /> : null}
                    {mode === 'login' ? <input type="submit" value="Login" onClick={handleClick} /> : <input type="submit" value="Register" onClick={handleClick} />}

                    {
                        mode === 'login' ? <h4>Don't have an account? <span id='link' onClick={changeMode}>Register</span></h4> : <h4>Already have an account? <span id='link' onClick={changeMode}>Login</span></h4>
                    }


                </form>
            </div>
        </div>

    )
}
export default Login;