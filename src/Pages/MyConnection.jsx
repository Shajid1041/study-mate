import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

const MyConnection = () => {
    const { user } = use(AuthContext)
    const [myConnection, setConnection] = useState([])

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/connection?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setConnection(data)
                })
        }
    }, [user?.email])
    return (
        <div className='max-w-[1040px] mx-auto'>
            <h1>My Connections {myConnection.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Hart Hagerty</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                math,physics
                                <br />
                                <span className="badge badge-ghost badge-sm">Expart</span>
                            </td>
                            <td>6am - 10am</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">Delete Connection</button>
                            </th>
                        </tr>
                    </tbody>
                    
                    
                </table>
            </div>


        </div>
    );
};

export default MyConnection;