import React from 'react';
import './GroupStudyCard.css';
import { Link } from 'react-router';

export default function GroupStudyCard() {
    return (
        <section className="max-w-[1240px] mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row items-center gap-30">

                {/* LEFT: big square + inside 4 squares */}
                <div className="shrink-0">
                    <div className="relative w-60 h-60 md:w-72 md:h-72 bg-secondary/10 rounded-xl shadow-xl flex items-center justify-center">

                        {/* 2x2 grid */}
                        <div className="grid grid-cols-2 gap-4 w-44 h-44 md:w-48 md:h-48">
                            <div className=" bg-secondary/80 rounded-lg shadow flex items-center justify-center text-white text-lg font-bold">A</div>
                            <div className="bg-secondary/60 rounded-lg shadow flex items-center justify-center text-white text-lg font-bold">B</div>
                            <div className="bg-secondary/50 rounded-lg shadow flex items-center justify-center text-white text-lg font-bold">C</div>
                            <div className="bg-secondary/40 rounded-lg shadow flex items-center justify-center text-white text-lg font-bold">D</div>
                        </div>

                        {/* Decorative corner */}
                        <div className="absolute -right-5 -bottom-5 w-12 h-12 bg-secondary rounded-md opacity-90" />
                    </div>
                </div>

                {/* RIGHT: content */}
                <div className="flex-1">
                    <h3 className="text-3xl md:text-5xl font-extrabold text-secondary mb-6 leading-tight">
                        Group Study & Why StudyMate Matters
                    </h3>

                    <p className="text-gray-700 text-lg leading-relaxed max-w-3xl text-justify">
                        Effective group study increases productivity, builds accountability, and helps you stay motivated.
                        StudyMate makes it easy to find the right learning partners so your study sessions become more structured,
                        interactive, and enjoyable.
                    </p>

                    {/* Ordered List */}
                    <ol className="mt-6 space-y-3 text-gray-700 text-base list-decimal pl-6">
                        <li>
                            <strong>Clearer understanding:</strong> Discussing ideas helps eliminate confusion and deepen learning.
                        </li>
                        <li>
                            <strong>Better consistency:</strong> Scheduled sessions make it easier to avoid procrastination.
                        </li>
                        <li>
                            <strong>Resource sharing:</strong> Notes, tips, and problem-solving methods get shared quickly.
                        </li>
                    </ol>

                    <div className="mt-8 flex items-center gap-4">
                        <Link to={'/find-partners'} className="px-6 py-2.5 rounded-lg bg-secondary text-white font-semibold shadow hover:brightness-95 transition">
                            Find Study Partners
                        </Link>

                        <button className="px-5 py-2.5 rounded-lg border border-secondary text-secondary font-semibold hover:bg-secondary/10 transition">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
