import React, { use, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';



const Profile = () => {


    const { user, setProfileData, setLoader } = use(AuthContext)
    const [error, setError] = useState('')
    const [updateclick, setUpdateClick] = useState(true)


    const handleUpdateProfileClick = () => {
        setUpdateClick(!updateclick)
    }
    const handleClickSave = (event) => {
        event.preventDefault();
        const name = event.target.name.value
        const photo = event.target.photo.value

        setProfileData(name, photo)
            .then(() => {
                setUpdateClick(!updateclick)
                setLoader(false)
            }).catch(error => setError(error.message))



    }

    return (
        <div className='max-w-[1140px] px-5 mx-auto grid grid-cols-5 grid-3 xl:grid-rows-8'>
            <div className='flex flex-col xl:flex-row justify-center items-center gap-5 my-5 xl:my-15 col-span-5 xl:col-span-2 row-span-1 xl:row-span-4 '>
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-50 rounded-full ring-2 ring-offset-2">
                        <img src={user.photoURL} />
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl'>{user.displayName}</h1>
                    <p className='link link-hover'>{user.email}</p>
                </div>
            </div>
            <div className='order-3 xl:order-2 flex justify-end col-span-5 xl:col-span-3 row-span-1 xl:row-span-8 xl:mt-50'>
                <div className='max-w-[90vw] md:max-w-[800px] mx-auto'>
                    <h1 className='text-7xl text-secondary font-semibold'>Hi {user.displayName}</h1>
                    <h2 className='text-3xl'>You wanna share your notes with us?</h2>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 my-5 ">
                        <legend className="fieldset-legend ml-10">Upload Your Notes</legend>
                        <div className="">
                            
                            <textarea className='w-full input m-3   ' name="" id=""></textarea>
                            <input type="text" className="input m-3" placeholder="" />
                            <input type="text" className="input m-3" placeholder="" />
                            <button className="btn join-item ">Upload</button>
                        </div>
                    </fieldset>
                </div>
            </div>
            <div className='mx-auto xl:ml-8 my-5 xl:my-0 row-span-1 xl:row-span-4 order-2 xl:order-3 col-span-5 xl:col-span-2 '>
                {updateclick ?
                    <>
                        <button onClick={handleUpdateProfileClick}
                            className='btn btn-secondary transition duration-500 ease-in-out 
            transform hover:scale-105'>Update Profile</button>
                        <p className='text-red-600 text-sm font-mono text-center '>{error}</p>
                    </>
                    : <>
                        <form onSubmit={handleClickSave}>
                            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                                <legend className="fieldset-legend">Page details</legend>


                                <input type="text" className="input" name='name' placeholder="New Name" />


                                <input type="text" name='photo' className="input" placeholder="New Photo URL" />

                                <button className="btn join-item" >save</button>
                            </fieldset>
                        </form>
                    </>

                }
            </div>


        </div>

    );
};

export default Profile;