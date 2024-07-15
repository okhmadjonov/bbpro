import React, { useEffect, useState } from "react";
import styles from "./PhotoGallery.module.scss";
import {
  PhotoGallerySlide1,
  PhotoGallerySlide2,
  PhotoGallerySlide3,
  PhotoGallerySlide4,
  PhotoGallerySlide5,
  PhotoGallerySlide6,
  PhotoGallerySlide8,
  leftIcon,
  rightIcon,
} from "../../../../Assets/Images";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

const PhotoGallery = () => {
  const t = useTranslations("translation");
  const data = [
    { image: PhotoGallerySlide1, id: 1 },
    { image: PhotoGallerySlide2, id: 2 },
    { image: PhotoGallerySlide3, id: 3 },
    { image: PhotoGallerySlide4, id: 4 },
    { image: PhotoGallerySlide5, id: 5 },
    { image: PhotoGallerySlide6, id: 6 },

    { image: PhotoGallerySlide8, id: 8 },
  ];
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 360);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize); 

    return () => {
      window.removeEventListener("resize", handleResize); 
    };
  }, []);
  const chevronStyle = isSmallScreen
  ? {
      cursor: "pointer",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "white",
      padding: "2vw",
      margin: "4px",
      fontSize: "1em",
    }
  : {
      cursor: "pointer",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: "white",
      padding: "1vw",
      margin: "8px",
      fontSize: "2em",
    };

  return (
    <div className={styles.photo_gallery}>
      <div className={styles.photo_gallery_title}>
       <div className={styles.navigate_icons}>
        <BsChevronLeft style={chevronStyle} className="button_prev_galery" />
        <BsChevronRight style={chevronStyle} className="button_next_galery" />
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
            360: {
              slidesPerView: 1,
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
