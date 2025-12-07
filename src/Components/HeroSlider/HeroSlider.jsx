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
        "https://i.postimg.cc/MTYZGnGw/jamie-street-s9Tf1e-BDFqw-unsplash.jpg",
        "https://i.postimg.cc/Bns0jqdK/one.jpg",
        "https://i.postimg.cc/7hLsTRqx/j-balla-photography-c-Mti-Wji-Avq4-unsplash.jpg",
        "https://i.postimg.cc/bJMGPGVy/mikhail-vasilyev-Nodtn-Cs-Ld-TE-unsplash.jpg",
        "https://i.postimg.cc/3wyctVG2/pharma-hemp-complex-QTQscp2q-Q-Y-unsplash.jpg",
        "https://i.postimg.cc/GmrC4cZC/raymond-yeung-V4Hx-RGJn-Md-M-unsplash.jpg",
        "https://i.postimg.cc/MHSS1qvC/yansi-keim-gaweuh7f29s-unsplash.jpg"
    ];

    const headingText = [
        <h1>Give Your Pet the <span className='text-warning'>Warmest, Safest </span>Winter Possible.</h1>,
        <h1>Shop Essential Winter <span className='text-warning'>Sweaters and Heating Pads</span>.</h1>,
        <h1>Ensure <span className='text-warning'>Healthy Skin</span> and <span className='text-warning'>Shiny Coats</span> This Cold Season.</h1>,
        <h1><span className='text-warning'>Expert Tips</span> to Protect Your Pet from Winter Cold.</h1>,
        <h1>Boost <span className='text-warning'>Immunity</span> and <span className='text-warning'>Energy</span> with the Best Winter Diet.</h1>,
        <h1>Stop Cracked <span className='text-warning'>Paws</span>.</h1>,
        <h1><span className='text-warning'>All the Resources</span> You Need for a Happy Winter Pet Life.</h1>
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

                    imageLinks.map((src) => <SwiperSlide className='relative'>
                        <img className='w-full h-full object-cover' src={src} alt="" />
                        <div className="absolute inset-0 z-100 bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.4))]"></div>
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