import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const Register = () => {

    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const location = useLocation()
    const navigate = useNavigate(0)
    const { user, createUser, setProfileData, googleAccess } = use(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const pattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;



    const handleHideShow = (event) => {
        event.preventDefault()
        setShowPassword(!showPassword)
    }

    // const handleGoogle = (event) => {
    //     event.preventDefault();
    //     googleAccess()
    //         .then(() => {
    //             navigate(location.state || '/')
    //             // sweetalert2
    //         })
    //         .catch(error => setError(error.message))
    // }

    // const handleRegisterSubmit = (event) => {
    //     event.preventDefault();
    //     const email = event.target.email.value;
    //     const password = event.target.password.value;
    //     const name = event.target.name.value;
    //     const photo = event.target.photoURL.value;
    //     const check = pattern.test(password)
        
    //     if (!check) {
    //         return setError('week password! please give an strong password')

    //     }
    //     setError('')

    //     createUser(email, password)
    //         .then(() => {
    //             // sweetalert2
    //             navigate(location.state || '/')
    //             setProfileData(name, photo).then(() =>
    //                 setSuccess(true)
    //             ).catch(error => setError(error.message))
    //             event.target.reset();
    //         })
    //         .catch(error => setError(error.message))
    // }

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
                // Update profile with name and photo
                return setProfileData(name, photo);
            })
            .then(() => {
                // Prepare user data for backend
                const newUser = {
                    name: name,
                    email: email,
                    photoUrl: photo || '/default-avatar.png'
                };

                // Send to your server
                return fetch('http://localhost:3000/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });
            })
            .then(res => res.json())
            .then(data => {
                console.log('User saved in MongoDB:', data);
                setSuccess(true);
                navigate(location.state || '/');
                event.target.reset();
            })
            .catch(error => {
                console.error('Registration error:', error);
                setError(error.message || 'Failed to create account.');
            });
    };

    const handleGoogle = (event) => {
        event.preventDefault();
        setError('');

        googleAccess()
            .then(result => {
                // Extract user info from Firebase result
                const user = result.user;
                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL || '/default-google-avatar.png'
                };

                // Send to your backend
                return fetch('http://localhost:3000/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });
            })
            .then(res => res.json())
            .then(data => {
                console.log('Google user saved in MongoDB:', data);
                navigate(location.state || '/');
                // Optional: Swal.fire('Success!', 'Signed in with Google!', 'success');
            })
            .catch(error => {
                console.error('Google sign-in error:', error);
                setError(error.message || 'Failed to sign in with Google.');
            });
    };



    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 p-6">
            <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
                <h2 className="text-3xl font-bold text-center mb-4">Register</h2>

                {error && <div className="alert alert-error mb-3">{error}</div>}
          {success && <div className="alert alert-success mb-3">{success}</div>}

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full"
                        name='name'
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered w-full"
                        name='email'
                        required
                    />
                    <input
                        type="text"
                        placeholder="Your Photo URL"
                        className="input input-bordered w-full"
                        name='photoURL'
                        required
                    />

                    <div className='relative'>
                        <input
                            type={showPassword ? "text" : "password"} name='password'
                            className="input input-bordered w-full"
                            placeholder="Password" />
                        <button onClick={handleHideShow} className='btn btn-xs absolute top-2 right-2 md:right-2'>{showPassword ? "Hide" : "Show"}</button>

                    </div>
                    <div className='ml-3 mb-5'>
                        {
                            error ? <p className='text-red-600'>{error}</p>
                                : <p className='text-sm font-extralight'>Password must have 6+ chars, A–Z, a–z, 0–9 & !@#$%^&*</p>
                        }   
                    </div>

                    <button className="btn btn-secondary w-full" type="submit">
                        Register
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
                <p className='mt-4 text-center text-[16px]'>Already have an account? <Link className='link link-hover text-blue-700 font-semibold' to={'/signin'}>Sign In</Link></p>
            </div>
        </div>

    );
};

export default Register;