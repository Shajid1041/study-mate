// FindPartners.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import Loader from '../Components/Loader/Loader';

const FindPartners = () => {
    const [partners, setPartners] = useState([]);
    const navigate = useNavigate()

    const [filteredPartners, setFilteredPartners] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('name'); // 'name', 'subject', 'experienceLevel'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch partners on component mount
    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await fetch('http://localhost:3000/partners/');
                if (!res.ok) throw new Error('Failed to fetch partners');
                const data = await res.json();
                setPartners(data);
                setFilteredPartners(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    // Apply filtering & sorting
    useEffect(() => {
        let result = [...partners];

        // Search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(term) ||
                    p.subject.toLowerCase().includes(term)
            );
        }

        // Sort
        result.sort((a, b) => {
            const valA = a[sortOption]?.toString().toLowerCase() || '';
            const valB = b[sortOption]?.toString().toLowerCase() || '';
            return valA.localeCompare(valB);
        });

        setFilteredPartners(result);
    }, [searchTerm, sortOption, partners]);

    if (loading) {
        return (
            <Loader></Loader>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-red-600">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Find Study Partners
                </h1>

                {/* Controls: Sort (left) & Search (right) */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    {/* Sort Dropdown (Left) */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="sort" className="text-gray-700 font-medium">
                            Sort by:
                        </label>
                        <select
                            id="sort"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="name">Name</option>
                            <option value="subject">Subject</option>
                            <option value="experienceLevel">Experience Level</option>
                        </select>
                    </div>

                    {/* Search Input (Right) */}
                    <div className="w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by name or subject..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Partner Cards Grid */}
                {filteredPartners.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No partners found. Try a different search!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredPartners.map((partner) => (
                            <div
                                key={partner._id}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="p-5 text-center space-y-2">
                                    <img
                                        src={partner.profileimage }
                                        alt={partner.name}
                                        className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-200"
                                        
                                    />
                                    <h3 className="text-xl font-semibold text-gray-800 mt-3">{partner.name}</h3>
                                    <p className="text-gray-600 mt-1"><span className="font-medium">Subject:</span> {partner.subject}</p>
                                    <p className="text-gray-600"><span className="font-medium">Study Mode:</span> {partner.studyMode}</p>
                                    <p className="text-gray-600"><span className="font-medium">Experience:</span> {partner.experienceLevel}</p>
                                    
                                    <Link to={`/find-partners/${partner._id}`} className="btn text-white bg-secondary px-8">View Profile</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindPartners;