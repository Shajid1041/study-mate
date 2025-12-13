import React, { use, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loginEmail, setLoginEmail] = useState('');
    const handleHideShow = (event) => {
        event.preventDefault()
        setShowPassword(!showPassword)
    }

    const { signIn, forgotPassword, googleAccess } = use(AuthContext)

    const emailRef = useRef();
    const handleGoogle = (event) => {
        event.preventDefault();
        googleAccess()
            .then(() => {
                // sweetalert2
                navigate(location.state || '/')
            })
            .catch(error => setError(error.message))
    }

    const handleSigninSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signIn(email, password)
            .then(() => {
                event.target.reset();
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Login successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location.state || '/')
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
                setError(error.message)
            })
    }
    const handleClickForgot = () => {
        document.getElementById('my_modal_3').showModal()
    }
    const handlePasswordReset = () => {
        const email = emailRef.current.value
        // sweetalert2
        forgotPassword(email)
            .then(() => {
                window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
            }).catch(error => setError(error.message))
    }
    return (
        <div>
            <div className=" flex justify-center items-center min-h-screen bg-base-200 p-6">
                <div className="card w-full max-w-md shadow-xl bg-base-100 p-6 border border-secondary">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-secondary mb-6 leading-tight text-center">Sign In</h2>

                    {/* {error && <div className="alert alert-error mb-3">{error}</div>}
          {success && <div className="alert alert-success mb-3">{success}</div>} */}

                    <form
                        onSubmit={handleSigninSubmit}
                        className="space-y-4">
                        <input type="email"
                            name='email'
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="input input-bordered w-full placeholder-gray-600"
                            placeholder="Email" />

                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"} name='password'
                                className="input input-bordered w-full placeholder-gray-600"
                                placeholder="Password" />
                            <button onClick={handleHideShow} className='btn btn-xs absolute top-2  right-2 md:right-2'>{showPassword ? "Hide" : "Show"}</button>
                        </div><div><a onClick={handleClickForgot} className="link link-hover">Forgot password?</a></div>
                        <p className='text-red-600'>{error}</p>

                        <button className="btn btn-secondary w-full" type="submit">
                            Sign In
                        </button>
                    </form>

                    <div className="divider">OR</div>

                    {/* Google Sign In Button */}
                    <button
                        onClick={handleGoogle}
                        className="btn btn-outline btn-secondary w-full"
                    >
                        Continue with Google
                    </button>
                    <p className='mt-4 text-center text-[16px]'>Don't have an account? <Link className='link link-hover text-blue-700 font-semibold' to={'/register'}>Register</Link></p>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">

                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => document.getElementById("my_modal_3").close()}
                    >
                        ✕
                    </button>

                    <div>
                        <h2 className="text-lg font-bold">Reset your password</h2>

                        <input
                            ref={emailRef}
                            defaultValue={loginEmail}
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full mt-2 placeholder-gray-600"
                        />

                        <button
                            className="btn btn-secondary w-full mt-3 "
                            onClick={handlePasswordReset}
                        >
                            Reset Password
                        </button>
                    </div>

                </div>
            </dialog>
        </div>
    );
};

export default Login;