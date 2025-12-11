import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from 'sweetalert2';
import { AuthContext } from "../../Context/AuthContext";
import NotFounded from "../NotFounded/NotFounded";

const PartnerDetails = () => {
    const partner = useLoaderData();
    const {user} = use(AuthContext)
    const email = user.email
    const [connections, setConnection] = useState([])
    if(!partner._id){
        return (
            <NotFounded></NotFounded>
        );
    }
    const sendRequest = () => {
        
        const newConnection = {
            email : email,
            partner : partner._id

        }
        fetch('http://localhost:3000/connection', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newConnection)
        })
            .then(res => res.json())
            .then(data => {
                // console.log('after placing Bid : ' ,data)
                if (data.insertedId) {
                    
                    
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Your bid has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    newConnection._id = data.insertedId
                    const newConnection = [...connections, newConnection]
                    setConnection(newConnection)
                }
            })

        
        
    }


    // -------------------------------------------
    // UI
    // -------------------------------------------
    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Left Section */}
                <div>
                    <img
                        src={partner.profileimage}
                        className="w-full rounded-xl shadow"
                        alt={partner.name}
                    />

                    <h1 className="text-4xl font-bold mt-6">{partner.name}</h1>

                    <p className="text-gray-600 mt-2">
                        <span className="font-semibold">Subject:</span> {partner.subject}
                    </p>

                    <p className="text-gray-600">
                        <span className="font-semibold">Study Mode:</span> {partner.studyMode}
                    </p>

                    <p className="text-gray-600">
                        <span className="font-semibold">Availability:</span> {partner.availabilityTime}
                    </p>

                    <p className="text-gray-600">
                        <span className="font-semibold">Location:</span> {partner.location}
                    </p>

                    <p className="text-gray-600">
                        <span className="font-semibold">Experience:</span> {partner.experienceLevel}
                    </p>

                    <p className="text-gray-600">
                        <span className="font-semibold">Rating:</span> {partner.rating}
                    </p>

                    <p className="text-gray-600">
                        <span className="font-semibold">Partner Count:</span> {partner.patnerCount}
                    </p>

                    {/* Send Request Button */}
                    <button
                        onClick={sendRequest}
                        className="mt-6 w-full bg-secondary text-white font-medium py-3 rounded-lg transition"
                    >
                        Send Partner Request
                    </button>
                </div>

                {/* Right Section */}
                <div>
                    <div className="bg-primary p-6 rounded-xl shadow">
                        <h2 className="text-2xl font-bold mb-4">Contact Info</h2>

                        <p className="text-accent">
                            <span className="font-semibold">Email:</span> {partner.email}
                        </p>

                        <h3 className="text-xl font-bold mt-6 mb-2">About</h3>
                        <p className="text-accent">
                            This student is actively looking for a study partner who shares similar
                            learning goals and interests.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PartnerDetails;
