import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import StudyPartnerCard from '../StudyPartnercard/StudyPartnerCard';

export default function TopRatedPartner() {

    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper h-[400px] text-black"
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

                {[1,2,3,4,5,6].map(index => (
                    < SwiperSlide className='max-w-[400px] md:max-w-[500px] m-3' > <StudyPartnerCard key={index} className='p-0' ></StudyPartnerCard></SwiperSlide>
                ))}



            </Swiper>
        </>
    );
}
