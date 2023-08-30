import '../styles/LoginView.css';

const LoginView = () => {
    return (
        <div className="login-container">
            <div className="login-form">
                <img className='logo' src='/TaskHub.png' alt='logo' />
                <h2>Welcome back!</h2>
                <form>
                    <input type="email" className="input-field" placeholder="Email" />
                    <input type="password" className="input-field" placeholder="Password" />
                    <button type="submit" className="login-button dark-bg">Log in</button>
                </form>
            </div>
            <div className="login-image-container">
                <img src="/loginImg.png" alt="Log in" className="login-image" />
            </div>
        </div>
    );
}

export default LoginView;
