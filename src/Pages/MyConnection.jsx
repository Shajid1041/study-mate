import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Loader from '../Components/Loader/Loader';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyConnection = () => {
    const { user } = useContext(AuthContext);
    const [myConnection, setConnection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedConnection, setSelectedConnection] = useState(null);

    useEffect(() => {
        if (!user?.email) return;

        const fetchConnections = async () => {
            try {
                // Fetch connections
                const res = await axios.get(`https://srudy-mate-server.vercel.app/connection?email=${user.email}`);
                const data = res.data;

                // Remove duplicate partner IDs
                const partnerIds = [...new Set(
                    data
                        .filter(eachData => eachData.partner)
                        .map(eachData => eachData.partner)
                )];

                // Fetch partner details only once
                const partnerData = await Promise.all(
                    partnerIds.map(id =>
                        axios.get(`https://srudy-mate-server.vercel.app/partners/${id}`).then(res => res.data)
                    )
                );

                setConnection(partnerData);
            } catch (error) {
                console.error("Error fetching connections:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConnections();
    }, [user?.email]);

    const handleOpenUpdateModal = (connection) => {
        setSelectedConnection(connection);
        document.getElementById('update_modal').showModal();
    };

    const handleUpdateConnection = (e) => {
        e.preventDefault();

        const form = e.target;
        const updatedData = {
            availabilityTime: form.time.value,
            studyMode: form.studyMode.value,
        };

        axios
            .put(`https://srudy-mate-server.vercel.app/partners/${selectedConnection._id}`, updatedData, {
                headers: { "content-type": "application/json" },
            })
            .then(res => {
                const data = res.data;
                if (data.success) {
                    setConnection(prev =>
                        prev.map(item =>
                            item._id === selectedConnection._id
                                ? { ...item, ...updatedData }
                                : item
                        )
                    );
                    Swal.fire("Updated!", "Connection updated successfully", "success");
                    document.getElementById('update_modal').close();
                }
            })
            .catch(error => console.error(error));
    };

    const handleDeleteConnection = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`https://srudy-mate-server.vercel.app/connection/${id}`)
                    .then(res => {
                        const data = res.data;
                        if (data.success) {
                            setConnection(prev => prev.filter(item => item._id !== id));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your connection has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => console.error(error));
            }
        });
    };

    if (loading) return <Loader />;
    if (myConnection.length === 0) return (
        <h2 className='text-2xl md:text-4xl font-extrabold text-secondary mb-6 leading-tight text-center mt-20'>
            No Connections Found
        </h2>
    );

    return (
        <div className='max-w-[1040px] mx-auto mt-15'>
            <div className="overflow-x-auto mt-8 bg-primary rounded-2xl mx-2">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Time</th>
                            <th>Manage</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myConnection.map((connection, index) => (
                            <tr key={connection._id}>
                                <td className='font-bold'>{index + 1}</td>
                                <td>
                                    <div className=" md:flex items-center justify-start gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={connection.profileimage} alt={connection.name} />
                                            </div>
                                        </div>
                                        <div className="font-bold">{connection.name}</div>
                                    </div>
                                </td>
                                <td>
                                    {connection.subject}<br />
                                    <span className="badge badge-ghost badge-sm">
                                        {connection.studyMode}
                                    </span>
                                </td>
                                <td>{connection.availabilityTime}</td>
                                <td>
                                    <button onClick={() => handleDeleteConnection(connection._id)} className="btn btn-error w-full btn-xs">
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleOpenUpdateModal(connection)}
                                        className="btn btn-active w-full btn-xs mt-2">
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4 text-center">Update Connection</h3>
                    {selectedConnection && (
                        <form onSubmit={handleUpdateConnection}>
                            <div className="mb-3">
                                <label className="label">Name</label>
                                <input type="text" value={selectedConnection.name} readOnly className="input input-bordered w-full" />
                            </div>
                            <div className="mb-3">
                                <label className="label">Subject</label>
                                <input type="text" value={selectedConnection.subject} readOnly className="input input-bordered w-full" />
                            </div>
                            <div className="mb-3">
                                <label className="label">Study Mode</label>
                                <select name="studyMode" defaultValue={selectedConnection.studyMode} className="select select-bordered w-full">
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="label">Available Time</label>
                                <input type="text" name="time" defaultValue={selectedConnection.availabilityTime} className="input input-bordered w-full" required />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-secondary">Update</button>
                                <form method="dialog">
                                    <button className="btn btn-outline">Cancel</button>
                                </form>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default MyConnection;
