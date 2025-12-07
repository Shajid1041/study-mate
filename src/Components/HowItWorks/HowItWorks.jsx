import React from 'react';
import { FaUserPlus, FaSearch, FaHandshake, FaArrowRight } from 'react-icons/fa';

/**
 * A component detailing the simple steps for users to find a study partner on StudyMate.
 * It uses a sequential flow with icons to explain the process clearly.
 */
const HowItWorks = () => {
    // Define the steps of the process
    const steps = [
        {
            icon: <FaUserPlus className="text-4xl text-indigo-600 mb-4" />,
            title: "1. Create Your Profile",
            description: "Sign up or log in, then complete your **Study Partner Profile** by adding your subjects, study mode, experience level, and availability. This helps others find you!"
        },
        {
            icon: <FaSearch className="text-4xl text-indigo-600 mb-4" />,
            title: "2. Find Partners",
            description: "Navigate to the **Find Partners** page. Use the **search and sort** features (by subject or experience level) to browse through available study profiles that match your needs."
        },
        {
            icon: <FaHandshake className="text-4xl text-indigo-600 mb-4" />,
            title: "3. Send a Request",
            description: "Click **View Profile** on a potential partner's card to see their full details. If they're a good fit, click **Send Partner Request** to connect and collaborate."
        }
    ];

    return (
        <section className="py-16 bg-primary" id="how-it-works">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 ">
                    🤝 How StudyMate Works
                </h2>
                <p className="text-center text-gray-900 mb-12 max-w-2xl mx-auto ">
                    Connecting with the perfect study partner is easy in just three steps. Start your collaborative learning journey today!
                </p>

                <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            {/* Step Card */}
                            <div className="flex-1 min-w-0 max-w-sm bg-secondary rounded-lg shadow-xl p-6 text-center transition-transform duration-300 hover:scale-[1.02] border-2  border-t-4 border-indigo-600">
                                {step.icon}
                                <h3 className="text-2xl font-semibold  mb-3 text-black">
                                    {step.title}
                                </h3>
                                <p className="text-gray-900 ">
                                    {/* Use dangerouslySetInnerHTML to render bolding from the description string */}
                                    <span dangerouslySetInnerHTML={{ __html: step.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                </p>
                            </div>

                            {/* Arrow Separator (Hidden on last step and for mobile stacking) */}
                            {index < steps.length - 1 && (
                                <div className="flex items-center justify-center p-4">
                                    <FaArrowRight className="text-3xl text-indigo-400 hidden md:block" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;