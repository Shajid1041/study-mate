import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

/**
 * A component to display user testimonials and reviews for the StudyMate platform,
 * styled to match the How It Works component's color palette.
 */
const Review = () => {
    // Demo data for testimonials
    const reviews = [
        {
            id: 1,
            name: "Fatema Akter",
            subject: "MERN Stack Developer",
            review: "StudyMate connected me with a partner who helped me master MongoDB and Express. The focused collaboration shaved weeks off my learning curve. Highly recommend for serious learners!",
            rating: 5,
            photo: "https://i.ibb.co/fatema-example.jpg" // Placeholder URL
        },
        {
            id: 2,
            name: "Rajib Hassan",
            subject: "Data Science Student",
            review: "I found a great peer for practicing complex Python algorithms. The easy-to-use search and profile details made finding the right match quick and effortless.",
            rating: 4,
            photo: "https://i.ibb.co/rajib-example.jpg" // Placeholder URL
        },
        {
            id: 3,
            name: "Sadia Rahman",
            subject: "English Literature",
            review: "The 'Offline' mode filter was perfect! I found a study buddy nearby for joint revision sessions. It made studying for final exams much more engaging.",
            rating: 5,
            photo: "https://i.ibb.co/sadia-example.jpg" // Placeholder URL
        }
    ];

    // Function to render star icons based on the rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                />
            );
        }
        return <div className="flex justify-center mb-4">{stars}</div>;
    };

    return (
        // Changed bg-white to bg-primary
        <section className="py-16 bg-primary" id="testimonials">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
                    Hear From Our Users
                </h2>
                <p className="text-center text-gray-900 mb-12 max-w-2xl mx-auto">
                    See how StudyMate has helped students worldwide achieve their learning goals through collaboration.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            // Changed card classes to use bg-secondary and border-indigo-600
                            className="bg-secondary p-8 rounded-lg shadow-xl text-center transition-transform duration-300 hover:shadow-2xl hover:scale-[1.02] border border-indigo-600"
                        >
                            {/* Quote Icon */}
                            <FaQuoteLeft className="text-indigo-600 text-3xl mx-auto mb-4" />

                            {/* Stars */}
                            {renderStars(review.rating)}

                            {/* Review Text */}
                            <p className="text-gray-900 italic mb-6">
                                "{review.review}"
                            </p>

                            {/* Reviewer Profile */}
                            <div className="flex flex-col items-center">
                                <img
                                    className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-indigo-600"
                                    src={review.photo}
                                    alt={review.name}
                                />
                                <p className="font-semibold text-black">
                                    {review.name}
                                </p>
                                <p className="text-sm text-indigo-600">
                                    {review.subject}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Review;