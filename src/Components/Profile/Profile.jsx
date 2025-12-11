import React, { use, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Profile = () => {
    const { user, setProfileData, setLoader } = use(AuthContext);
    const [error, setError] = useState('');
    const [updateclick, setUpdateClick] = useState(true);

    const handleUpdateProfileClick = () => {
        setUpdateClick(!updateclick);
    };

    const handleClickSave = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const photo = event.target.photo.value;

        setProfileData(name, photo)
            .then(() => {
                setUpdateClick(true);
                setLoader(false);
            })
            .catch((error) => setError(error.message));
    };

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* LEFT — USER INFO */}
            <div className="flex flex-col items-center lg:items-start gap-5 col-span-1 lg:col-span-2">
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-48 h-48 rounded-full ring-2 ring-offset-2 overflow-hidden">
                        <img src={user.photoURL} alt="User" />
                    </div>
                </div>

                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-semibold">{user.displayName}</h1>
                    <p className="link link-hover">{user.email}</p>
                </div>

                {/* Update Profile Button / Form */}
                <div className="w-full mt-5">
                    {updateclick ? (
                        <>
                            <button
                                onClick={handleUpdateProfileClick}
                                className="btn btn-secondary w-full lg:w-auto hover:scale-105 transition"
                            >
                                Update Profile
                            </button>
                            <p className="text-red-600 text-sm text-center font-mono mt-2">{error}</p>
                        </>
                    ) : (
                        <form onSubmit={handleClickSave} className="w-full">
                            <fieldset className="fieldset bg-base-200 border-base-300 rounded-xl p-4 shadow-sm">
                                <legend className="fieldset-legend font-semibold">Update Details</legend>

                                <input
                                    type="text"
                                    name="name"
                                    className="input input-bordered w-full mb-3"
                                    placeholder="New Name"
                                />

                                <input
                                    type="text"
                                    name="photo"
                                    className="input input-bordered w-full mb-3"
                                    placeholder="New Photo URL"
                                />

                                <button className="btn btn-secondary w-full">Save</button>
                            </fieldset>
                        </form>
                    )}
                </div>
            </div>

            {/* RIGHT — NOTES UPLOAD */}
            <div className="col-span-1 lg:col-span-3">
                <h1 className="text-5xl md:text-6xl text-secondary font-extrabold leading-tight">
                    Hi {user.displayName}
                </h1>

                <h2 className="text-xl md:text-2xl text-gray-700 mt-2">
                    You wanna share your notes with us?
                </h2>

                <fieldset className="fieldset bg-base-200 border border-base-300 rounded-xl w-full p-6 mt-8 shadow-sm">
                    <legend className="fieldset-legend text-lg font-semibold text-secondary px-3">
                        Upload Your Notes
                    </legend>

                    <div className="flex flex-col gap-5 mt-4">
                        <textarea
                            className="textarea textarea-bordered w-full min-h-[150px] focus:outline-secondary"
                            name="notes"
                            placeholder="Write or paste your notes here..."
                        ></textarea>

                        <input
                            type="text"
                            className="input input-bordered w-full focus:outline-secondary"
                            placeholder="Subject Name (e.g., Physics)"
                        />

                        <input
                            type="text"
                            className="input input-bordered w-full focus:outline-secondary"
                            placeholder="Topic Name (e.g., Newton's Laws)"
                        />

                        <button className="btn bg-secondary text-white hover:bg-secondary/90 w-fit px-8 font-semibold">
                            Upload
                        </button>
                    </div>
                </fieldset>
            </div>
        </div>
    );
};

export default Profile;
