import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

const reviewsData = [
    [
        "Fatema Akter",
        "StudyMate connected me with a partner who helped me master MongoDB and Express. The focused collaboration shaved weeks off my learning curve. Highly recommend !"
    ],
    [
        "Rajib Hassan",
        "I found a great peer for practicing complex Python algorithms. The easy-to-use search and profile details made finding the right match quick and effortless."
    ],
    [
        "Sadia Rahman",
        "The 'Offline' mode filter was perfect! I found a study buddy nearby for joint revision sessions. It made studying for final exams much more engaging."
    ]
];

const Review = () => {
    return (
        <div className='lg:max-w-[1440px] mx-auto my-10'>

            <h2 className='text-3xl md:text-5xl font-extrabold text-secondary mb-6 leading-tight text-center'>
                What Students Say About StudyMate
            </h2>

            <Swiper
                slidesPerView={2}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                }}

                modules={[Autoplay, Pagination]}
                className="mySwiper h-[400px]"
            >

                {reviewsData.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className='text-accent p-5 bg-primary m-5 rounded-xl '>

                            {/* Reviewer Section (Uniform Size) */}
                            <div className='flex gap-3 items-center h-[70px]'>
                                <img
                                    className='w-14 h-14 rounded-full object-cover'
                                    src="https://img.icons8.com/?size=100&id=AZazdsitsrgg&format=png&color=000000"
                                    alt=""
                                />

                                <div className='flex flex-col justify-center w-[180px]'>
                                    <h2 className='font-mono text-base leading-tight'>{review[0]}</h2>
                                    <p className='font-light text-sm leading-tight'>StudyMate User</p>
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className='flex gap-2 mt-4'>
                                <div className='flex items-start'>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=38968&format=png&color=000000"
                                        alt=""
                                    />
                                </div>

                                <p className='font-light text-lg my-3 text-center'>
                                    {review[1]}
                                </p>

                                <div className='flex items-end'>
                                    <img
                                        src="https://img.icons8.com/?size=100&id=38970&format=png&color=000000"
                                        alt=""
                                    />
                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
}

export default Review;
