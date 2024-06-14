import React from "react";
import styles from "./Banner.module.scss";
import { ReactNode } from "react";

import video1 from "@/Assets/Videos/video1.mp4";
import video3 from "@/Assets/Videos/video3.mp4";
import video4 from "@/Assets/Videos/video4.mp4";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";

interface ILayoutsProps {
  children: ReactNode;
}

const Banner = ({ children }: ILayoutsProps) => {
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.banner__image}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide>
              <video autoPlay loop muted className={styles.bannerVideo}>
                <source src={video1} type="video/mp4" />
              </video>
            </SwiperSlide>
            <SwiperSlide>
              <video autoPlay loop muted className={styles.bannerVideo}>
                <source src={video3} type="video/mp4" />
              </video>
            </SwiperSlide>

            <SwiperSlide>
              <video autoPlay loop muted className={styles.bannerVideo}>
                <source src={video4} type="video/mp4" />
              </video>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="container">{children}</div>
      </div>
    </>
  );
};

export default Banner;
