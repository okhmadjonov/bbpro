import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "./Brands.module.scss";
import { useTranslations, useLocale } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import SlidersSwipes from "@/Components/SlidersSwipes/index";
import { BrandsInterface, AutoplayOptions } from "../types";
import { BASE_URL } from "@/services/api";

interface Props {
  brands: BrandsInterface[];
}

const Brands = ({ brands }: Props) => {
  const locale = useLocale();
  const t = useTranslations("BRANDS");
  const [shouldUseSwiper, setShouldUseSwiper] = useState(false);

  useEffect(() => {
    if (brands?.length > 5) {
      setShouldUseSwiper(true);
    } else {
      setShouldUseSwiper(false);
    }
  }, [brands]);

  const swiperRef = useRef<any>({});

  const [swiperAutoplay, setSwiperAutoplay] = useState(true);

  const handleMouseEnter = () => {
    setSwiperAutoplay(false);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    setSwiperAutoplay(true);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <>
      {brands?.length !== 0 ? (
        <div className={styled.brands} data-aos="fade-up">
          <div className="container">
            <div className={styled.brands__top}>
              <h2 className={styled.brands__title}>{t("brands")}</h2>
              <SlidersSwipes nextEl="next-btn" prevEl="prev-btn" />
            </div>
          </div>
          <div
            className={styled.brands__cards}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Swiper
              ref={swiperRef}
              slidesPerView={brands?.length <= 4 ? brands?.length : 5}
              spaceBetween={32}
              breakpoints={{
                1400: {
                  slidesPerView: brands?.length <= 4 ? brands?.length : 5,
                  spaceBetween: 32,
                },
                1200: {
                  slidesPerView: brands?.length <= 3 ? brands?.length : 4,
                  spaceBetween: 32,
                },
                980: {
                  slidesPerView: brands?.length <= 3 ? brands?.length : 4,
                  spaceBetween: 30,
                },
                600: {
                  slidesPerView: brands?.length <= 2 ? brands?.length : 3.2,
                  spaceBetween: 20,
                },
                460: {
                  slidesPerView: brands?.length <= 1 ? brands?.length : 2,
                  spaceBetween: 20,
                },
                260: {
                  slidesPerView: brands?.length <= 1 ? brands?.length : 1.6,
                  spaceBetween: 20,
                },
              }}
              autoplay={
                {
                  delay: 1000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                  autoplay: swiperAutoplay,
                } as AutoplayOptions
              }
              loop={true}
              navigation={{
                nextEl: `.next-btn`,
                prevEl: `.prev-btn`,
              }}
              modules={[Autoplay, Navigation]}
              className={styled.brands__swiper}
            >
              {brands?.map((item, index) => (
                <SwiperSlide key={index} className={styled.brands__image_inner}>
                  <Image
                    className={styled.brands__image}
                    src={`${BASE_URL}/${item?.imageUrl}`}
                    width={1000}
                    height={1000}
                    alt="Error"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Brands;
