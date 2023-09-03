import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginView.css';
import { useState } from 'react';
import authService from '../utils/authService';

interface User {
    token: string;
    email: string;
    id: string;
} 

const LoginView = () => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const navigate = useNavigate()

    const onLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await authService.login({ email, password })

        if(res.data) {
            const user: User = res.data
            localStorage.setItem('user', user.token)
            localStorage.setItem('token', user.token)
            navigate('/projects')
        }

    }

    return (
        <div className="login-container">
            <div className="login-form">
                <img className='logo' src='/TaskHub.png' alt='logo' />
                <h2>Welcome back!</h2>
                <form onSubmit={onLogIn}>
                    <input 
                        type="email" 
                        className="input-field" 
                        placeholder="Email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        className="input-field" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-button dark-bg">Log in</button>
                </form>

                <div className='signup-link'>
                    <span>Don't have an account?</span>
                    <Link to='signup'>Signup</Link>
                </div>
            </div>
            <div className="login-image-container">
                <img src="/loginImg.png" alt="Log in" className="login-image" />
            </div>
        </div>
    );
}

export default LoginView;
