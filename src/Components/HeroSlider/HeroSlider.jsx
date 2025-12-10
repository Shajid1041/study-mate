import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './HeroSlider';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const HeroSlider = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    const imageLinks = [
        "https://i.postimg.cc/W1wZv08h/Studying-rafiki.png",
        "https://i.postimg.cc/d1KgyPd5/Telecommuting-rafiki.png",
        "https://i.postimg.cc/mDwp1cTt/Shared-workspace-rafiki.png",
        "https://i.postimg.cc/bJBb58gY/Online-learning-rafiki-(1).png",
        "https://i.postimg.cc/HjG6fb2Z/Team-work-rafiki.png",
        "https://i.postimg.cc/4NkkCcm3/Team-rafiki.png"

    ];

    const headingText = [
        <h1>Give Your Learning the <span className='text-secondary'>Boost It Needs</span> with StudyMate.</h1>,
        <h1>Find <span className='text-secondary'>Study Partners</span> and <span className='text-secondary'>Practice Sessions</span> Effortlessly.</h1>,
        <h1>Ensure <span className='text-secondary'>Consistent Progress</span> and <span className='text-secondary'>Better Grades</span> This Semester.</h1>,
        <h1>Boost <span className='text-secondary'>Focus</span> and <span className='text-secondary'>Efficiency</span> with Smart Study Plans.</h1>,
        <h1>Stop <span className='text-secondary'>Procrastination</span> and Stay on Track with StudyMate.</h1>,
        <h1><span className='text-secondary'>All the Tools</span> You Need for a Productive Study Routine.</h1>
    ];



    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}

                modules={[Autoplay, Pagination]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper h-[250px] md:h-[400px]  xl:h-auto z-999"
            >
                {

                    imageLinks.map((src, index) => <SwiperSlide className='relative' key={index}>

                        {/* Wrapper flex container */}
                        <div className={`w-full h-full flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse text-end'}`}>

                            {/* Text Overlay */}
                            <div className="relative flex-1 flex items-center justify-center p-8 md:p-20">
                                <div className="text-black font-extrabold text-2xl md:text-4xl xl:text-7xl">
                                    {headingText[index]}
                                </div>
                            </div>

                            {/* Image */}
                            <div className="flex-1 h-full flex justify-center items-center">
                                <img
                                    className=" h-fit object-cover"
                                    src={src}
                                    alt=""
                                />
                            </div>

                        </div>

                    </SwiperSlide>

                    )
                }
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </>
    );
}

export default HeroSlider;