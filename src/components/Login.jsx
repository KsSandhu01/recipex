import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { auth } from './../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setInitialLoginStatus, setLoggedIn } from '../services/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleLogin = () => {
        // try {
        signInWithEmailAndPassword(auth, email, password).then(
            (e) => {
                // console.log("hihiyiy", e)
                toast("Login Successful");
                setTimeout(() => {
                   
                    localStorage.clear();
                    setInitialLoginStatus();
                    setLoggedIn();

                    window.location.href = "/";
                  }, 2000);
            }
        ).catch((e) => {
            console.log(e)
        })
        // } catch (error) {
        //   console.error(error.message);
        // }
    };
    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            <div class="login-form">
                <header>Login</header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Email address"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div>
                        <a href="/">Forgot password?</a>
                    </div>
                    <div className='d-flex justify-center'>
                        <input type="submit" value="Login" className='login-btn w-100' />
                    </div>
                    <div>
                        <Link to="/sign-up">Sign Up</Link>
                    </div>
                </form>
            </div>
        </>

    )
}

export default Login