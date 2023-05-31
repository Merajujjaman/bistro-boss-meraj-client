import React, { useEffect, useState } from 'react';
import SectionTitle from './components/SectionTitle';
//react swiper impoprt
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
//react rating import
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
//react icon
import { FaQuoteRight } from "react-icons/fa";

const Reviews = () => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
    }, [])
    return (
        <section className='mb-20'>
            <SectionTitle
                subtitle='What Our Client Says'
                title='testimonial'
            ></SectionTitle>
            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        reviews.map(review => <SwiperSlide
                            key={review._id}
                        >
                            <div className='flex flex-col items-center mx-10 md:mx-20'>
                                <FaQuoteRight className='text-6xl'></FaQuoteRight>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p className='py-4'>{review?.details}</p>
                                <h1 className='text-3xl text-[#CD9003] font-bold'>{review?.name}</h1>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>

        </section>
    );
};

export default Reviews;