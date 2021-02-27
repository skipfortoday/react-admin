import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';

export default () => {
  return (
    <Swiper
      // spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><img src="/images/slide4.jpg" alt="slide1" style={{width:"auto",height:"auto"}}/></SwiperSlide>
      <SwiperSlide><img src="/images/slide2.jpg" alt="slide2" style={{width:"auto",height:"auto"}}/></SwiperSlide>
      <SwiperSlide><img src="/images/slide3.jpg" alt="slide3" style={{width:"auto",height:"auto"}}/></SwiperSlide>
      <SwiperSlide><img src="/images/slide1.jpg" alt="slide4" style={{width:"auto",height:"auto"}}/></SwiperSlide>
      ...
    </Swiper>
  );
};