import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import StudyPartnerCard from '../StudyPartnercard/StudyPartnerCard';

export default function TopRatedPartner() {
    const [TopRatedPartners, setTopRatedPartners] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/top-rated-partners')
            .then(res => res.json())
            .then(data => {
                setTopRatedPartners(data);
            })
    }, []);

    

    return (
        <div className="w-full py-16 px-4 md:px-10 lg:px-20 text-black">

            {/* ====== Top Title Section ====== */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-extrabold text-secondary">
                    Top Rated Study Partners
                </h1>

                <p className="text-lg md:text-xl mt-3 text-accent max-w-2xl mx-auto">
                    Connect with the highest-rated students who are actively helping others learn,
                    solve problems, and stay motivated on StudyMate.
                </p>
            </div>

            {/* ====== Swiper Slider ====== */}
            <div>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper h-[420px]  text-black mb-15"
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1280: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {TopRatedPartners.map(partner => (
                        <SwiperSlide


                            className="max-w-[350px] md:max-w-[450px] m-5 flex justify-center items-center"
                        >
                            <StudyPartnerCard partner={partner} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
