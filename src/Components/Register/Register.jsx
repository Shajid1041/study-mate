import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';

const Register = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(0);
    const { user, createUser, setProfileData, googleAccess } = use(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const pattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    const handleHideShow = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        const photo = event.target.photoURL.value;
        const check = pattern.test(password);

        if (!check) {
            return setError('Weak password! Please provide a strong password.');
        }

        setError('');

        createUser(email, password)
            .then(() => {
                return setProfileData(name, photo);
            })
            .then(() => {
                navigate(location.state || '/');

                const newUser = {
                    name: name,
                    email: email,
                    photoUrl: photo || '/default-avatar.png'
                };


                return axios.post('https://srudy-mate-server.vercel.app/user', newUser, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            })
            .then(res => {
                const data = res.data;
                console.log('User saved in MongoDB:', data);

                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your Registration has been complete",
                    showConfirmButton: false,
                    timer: 1500
                });

                setSuccess(true);
                event.target.reset();
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response?.data?.error || error.message || 'Failed to create account.',
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
                setError(error.response?.data?.error || error.message || 'Failed to create account.');
            });
    };

    const handleGoogle = (event) => {
        event.preventDefault();
        setError('');

        googleAccess()
            .then(result => {
                const user = result.user;
                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL || '/default-google-avatar.png'
                };


                return axios.post('https://srudy-mate-server.vercel.app/user', newUser, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            })
            .then(res => {
                const data = res.data;
                console.log('Google user saved in MongoDB:', data);

                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your Registration has been complete",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate(location.state || '/');
            })
            .catch(error => {
                console.error('Google sign-in error:', error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response?.data?.error || error.message || 'Failed to sign in with Google.',
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
                setError(error.response?.data?.error || error.message || 'Failed to sign in with Google.');
            });
    };

    return (
        <div className="mt-10 flex justify-center items-center min-h-screen bg-base-200 p-6">
            <div className="card w-full max-w-md shadow-xl bg-base-100 p-6 border border-secondary">
                <h2 className="text-2xl md:text-4xl font-extrabold text-secondary mb-6 leading-tight text-center">
                    Register
                </h2>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full placeholder-gray-600"
                        name='name'
                        required
                    />

                    <input
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered w-full placeholder-gray-600"
                        name='email'
                        required
                    />

                    <input
                        type="text"
                        placeholder="Your Photo URL"
                        className="input input-bordered w-full placeholder-gray-600"
                        name='photoURL'
                        required
                    />

                    <div className='relative'>
                        <input
                            type={showPassword ? "text" : "password"}
                            name='password'
                            className="input input-bordered w-full placeholder-gray-600"
                            placeholder="Password"
                        />
                        <button
                            onClick={handleHideShow}
                            className='btn btn-xs absolute top-2 right-2'
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div className='ml-3 mb-5'>
                        {
                            error
                                ? <p className='text-red-600'>{error}</p>
                                : <p className='text-sm font-extralight'>
                                    Password must have 6+ chars, A–Z, a–z
                                </p>
                        }
                    </div>

                    <button className="btn btn-secondary w-full" type="submit">
                        Register
                    </button>
                </form>

                <div className="divider">OR</div>

                <button
                    onClick={handleGoogle}
                    className="btn btn-outline btn-secondary w-full"
                >
                    Continue with Google
                </button>

                <p className='mt-4 text-center text-[16px]'>
                    Already have an account?
                    <Link className='link link-hover text-blue-700 font-semibold' to={'/signin'}>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
