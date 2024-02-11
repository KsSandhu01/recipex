import React, { useState } from 'react'
import { auth } from './../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Registration = () => {



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Cpassword, setCPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleCPasswordChange = (event) => {
        setCPassword(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();

    };
    const handleLogin = () => {
        createUserWithEmailAndPassword(auth, email, password, Cpassword).then(
            (e) => {
                // console.log("hihiyiy", e);
                toast("Registration Successful");
                window.location.href = "/login";
            }
        ).catch((e) => {

            console.log(e);
            toast("already registered");
            console.log(e.status);
        })

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
            <div>

                <div class="login-form">
                    <header>Sign Up</header>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" placeholder="Email address" required
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div>
                            <input type="password" placeholder="Password" required
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div>
                            <input type="password" placeholder="Confirm Password" required
                                value={Cpassword}
                                onChange={handleCPasswordChange}
                            />
                        </div>
                        <div>

                            <input type="submit" value="Submit" className='login-btn' />
                        </div>
                        <div>
                            <Link to="/login">already have account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Registration