import React from "react";
import styles from "./PhotoGallery.module.scss";
import {
  PhotoGallerySlide1,
  PhotoGallerySlide2,
  PhotoGallerySlide3,
  PhotoGallerySlide4,
  PhotoGallerySlide5,
  PhotoGallerySlide6,
  PhotoGallerySlide7,
  PhotoGallerySlide8,
  leftIcon,
  rightIcon,
} from "../../../../Assets/Images";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { useTranslations } from "next-intl";
import Image from "next/image";

const PhotoGallery = () => {
  const t = useTranslations("translation");
  const data = [
    { image: PhotoGallerySlide1, id: 1 },
    { image: PhotoGallerySlide2, id: 2 },
    { image: PhotoGallerySlide3, id: 3 },
    { image: PhotoGallerySlide4, id: 4 },
    { image: PhotoGallerySlide5, id: 5 },
    { image: PhotoGallerySlide6, id: 6 },
    { image: PhotoGallerySlide7, id: 7 },
    { image: PhotoGallerySlide8, id: 8 },
  ];

  return (
    <div className={styles.photo_gallery}>
      <div className={styles.photo_gallery_title}>
        <h3>Photo Gallery from Challenge</h3>
        <div className={styles.navigate_icons}>
          <Image className="button_prev_galery" src={leftIcon} alt="l" />
          <Image className="button_next_galery" src={rightIcon} alt="r" />
        </div>
      </div>
      <div className={styles.photo_gallery_slide}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={2}
          breakpoints={{
            520: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          navigation={{
            nextEl: ".button_next_galery",
            prevEl: ".button_prev_galery",
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <Image
                src={item.image}
                alt="Images"
                layout="responsive"
                width={500}
                height={500}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PhotoGallery;
