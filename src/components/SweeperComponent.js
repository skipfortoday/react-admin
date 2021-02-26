import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';

export default () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><img src="/images/slide1.jpg" alt="slide1"/></SwiperSlide>
      <SwiperSlide><img src="/images/slide2.jpg" alt="slide1"/></SwiperSlide>
      <SwiperSlide><img src="/images/slide3.jpg" alt="slide1"/></SwiperSlide>
      <SwiperSlide><img src="/images/slide4.jpg" alt="slide1"/></SwiperSlide>
      ...
    </Swiper>
  );
};