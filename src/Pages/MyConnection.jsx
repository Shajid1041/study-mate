import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Loader from '../Components/Loader/Loader';

const MyConnection = () => {
    const { user } = use(AuthContext)
    const [myConnection, setConnection] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            try{
                fetch(`http://localhost:3000/connection?email=${user.email}`)
                    .then(res => res.json())
                    .then(async (data) => {

                        // Remove duplicate partner IDs
                        const partnerIds = [...new Set(
                            data
                                .filter(eachData => eachData.partner)
                                .map(eachData => eachData.partner)
                        )];

                        // Fetch partner details only once
                        const partnerData = await Promise.all(
                            partnerIds.map(id =>
                                fetch(`http://localhost:3000/partners/${id}`).then(res => res.json())
                            )
                        );

                        setConnection(partnerData);
                    });
            }catch(error){
                console.error("Error fetching connections:", error);
            }finally{
                setLoading(false);
            }
        }
    }, [user?.email]);


    const handleDeleteConnection = (id) => {
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
    if (loading) {
        return <Loader></Loader>
    }
    if(myConnection.length===0){
        return <h2 className='text-3xl font-semibold text-center mt-20'>No Connections Found</h2>
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

