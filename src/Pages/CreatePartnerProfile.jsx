// CreatePartnerProfile.jsx
import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../Context/AuthContext'; // 👈 Make sure path is correct
import { useNavigate } from 'react-router';

const CreatePartnerProfile = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        profileimage: '',
        subject: '',
        studyMode: 'Online',
        availabilityTime: '',
        location: '',
        experienceLevel: 'Intermediate',
    });

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            // Simple redirect without React Router
            navigate('/partner-details');

        }
    }, [user, authLoading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.email) return;

        setSubmitting(true);

        const profileData = {
            ...formData,
            rating: 0,
            patnerCount: 0,
            email: user.email,
        };

        try {
            const response = await fetch('http://localhost:3000/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('✅ Study partner profile created successfully!');
                // Redirect using plain JS (no React Router)
                navigate('/');

            } else {
                alert('❌ ' + (result.error || 'Failed to create profile. You may already have one.'));
            }
        } catch (err) {
            console.error('Error:', err);
            alert('❌ Network error: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    // Show loading
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-lg text-gray-600">Checking authentication...</p>
            </div>
        );
    }

    // Guard: should not happen due to redirect, but safe
    if (!user) return null;

    return (
        <div className=" min-h-screen bg-base-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="mt-20 max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Your Study Partner Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Aisha Rahman"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email (from your account)
                        </label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
                        />
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label htmlFor="profileimage" className="block text-sm font-medium text-gray-700">
                            Profile Image URL (optional)
                        </label>
                        <input
                            type="url"
                            id="profileimage"
                            name="profileimage"
                            value={formData.profileimage}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://example.com/your-photo.jpg"
                        />
                        {formData.profileimage && (
                            <div className="mt-2 flex justify-center">
                                <img
                                    src={formData.profileimage}
                                    alt="Profile preview"
                                    className="w-16 h-16 rounded-full object-cover border"
                                    onError={(e) => (e.target.style.display = 'none')}
                                />
                            </div>
                        )}
                    </div>

                    {/* Subject */}
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                            Subject *
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Mathematics, Programming"
                            required
                        />
                    </div>

                    {/* Study Mode */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Study Mode *
                        </label>
                        <div className="flex space-x-6">
                            {['Online', 'Offline'].map((mode) => (
                                <label key={mode} className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="studyMode"
                                        value={mode}
                                        checked={formData.studyMode === mode}
                                        onChange={handleChange}
                                        className="text-blue-600 focus:ring-blue-500"
                                        required
                                    />
                                    <span className="ml-2 text-gray-700">{mode}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Availability Time */}
                    <div>
                        <label htmlFor="availabilityTime" className="block text-sm font-medium text-gray-700">
                            Availability Time *
                        </label>
                        <input
                            type="text"
                            id="availabilityTime"
                            name="availabilityTime"
                            value={formData.availabilityTime}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Evening 6–9 PM"
                            required
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location *
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Dhaka, Bangladesh"
                            required
                        />
                    </div>

                    {/* Experience Level */}
                    <div>
                        <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">
                            Experience Level *
                        </label>
                        <select
                            id="experienceLevel"
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`w-full py-2 px-4 rounded-md text-white font-medium ${submitting
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                } transition-colors`}
                        >
                            {submitting ? 'Creating Profile...' : 'Create Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePartnerProfile;