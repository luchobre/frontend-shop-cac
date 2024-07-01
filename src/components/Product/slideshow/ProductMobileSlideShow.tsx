"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";
import Image from "next/image";

interface Props {
  images?: string[];
  title?: string;
  className?: string;
}

const ProductMobileSlideShow = ({ images, title, className }: Props) => {

  return (
    <div className={className}>
      <Swiper
        style={ {
          width: '100vw',
          height: '600px',
      }}
        pagination={true}
        autoplay ={{
          delay: 5000
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={ 600 }
              height={ 500 }
              src={`/products/${ image }`}
              alt={ title }
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductMobileSlideShow;
