import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";

import slide1 from '../../assets/home/slide1.jpg'
import slide2 from '../../assets/home/slide2.jpg'
import slide3 from '../../assets/home/slide3.jpg'
import slide4 from '../../assets/home/slide4.jpg'
import slide5 from '../../assets/home/slide5.jpg'
import SectionTitle from './components/SectionTitle';


const Category = () => {
    return (
        <section>
            <SectionTitle 
            subtitle={'From 11.00am to 10.00am'}
            title={'order online'}
            ></SectionTitle>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper mb-20"
            >
                <SwiperSlide>
                    <img className='w-full' src={slide1} alt="image" />
                    <h1 className='text-3xl text-white text-center font-semibold -mt-10 uppercase'>Salads</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full' src={slide2} alt="image" />
                    <h1 className='text-3xl text-white text-center font-semibold -mt-10 uppercase'>Pizzas</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full' src={slide3} alt="image" />
                    <h1 className='text-3xl text-white text-center font-semibold -mt-10 uppercase'>shups</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full' src={slide4} alt="image" />
                    <h1 className='text-3xl text-white text-center font-semibold -mt-10 uppercase'>desserts</h1>

                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full' src={slide5} alt="image" />
                    <h1 className='text-3xl text-white text-center font-semibold -mt-10 uppercase'>Salads</h1>

                </SwiperSlide>

            </Swiper>
        </section>
    );
};

export default Category;