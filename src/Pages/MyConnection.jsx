import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

const MyConnection = () => {
    const { user } = use(AuthContext)
    const [myConnection, setConnection] = useState([])

    useEffect(() => {
        if (user?.email) {
            console.log(user.email)
            fetch(`http://localhost:3000/connection?email=${user.email}`)
                .then(res => res.json())
                .then(async (data) => {

                    // 1️⃣ Get partner IDs correctly
                    const partnerIds = data
                        .filter(eachData => eachData.partner)   // FIXED
                        .map(eachData => eachData.partner);      // get IDs

                    // 2️⃣ Fetch all partners by ID
                    const partnerData = await Promise.all(
                        partnerIds.map(id =>
                            fetch(`http://localhost:3000/partners/${id}`).then(res => res.json())
                        )
                    );

                    setConnection(partnerData);
                })
        }
    }, [user?.email]);


    const handleDeleteConnection = (id) =>{
        console.log(id)
        fetch(`http://localhost:3000/connection/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setConnection(prev => prev.filter(item => item._id !== id));
                }
            });
    }

    return (
        <div className='max-w-[1040px] mx-auto mt-15'>
            <div className="overflow-x-auto mt-8 bg-primary rounded-2xl">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myConnection.map((connection, index) => (
                            <tr key={connection._id}>
                                <td className='font-bold'>{index + 1}</td>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={connection.profileimage} alt={connection.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{connection.name}</div>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    {connection.subject}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        {connection.experienceLevel}
                                    </span>
                                </td>

                                <td>{connection.availabilityTime}</td>

                                <th>
                                    <button onClick={() => handleDeleteConnection(connection._id)} className="btn btn-ghost btn-xs">
                                        Delete Connection
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyConnection;

