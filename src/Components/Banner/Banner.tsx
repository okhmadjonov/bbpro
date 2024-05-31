import React from "react";
import styles from "./Banner.module.scss";
import { ReactNode } from "react";
import { BC } from "@/Assets/Images/index";
import children from "@/Assets/Videos/children.mp4";
import master from "@/Assets/Videos/master.mp4";
import store from "@/Assets/Videos/store.mp4";

interface ILayoutsProps {
  children: ReactNode;
}

const Banner = ({ children }: ILayoutsProps) => {
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.banner__image}>
          {/* <Image src={BC} alt="img" /> */}

          <video autoPlay loop muted className={styles.bannerVideo}>
            <source src={store} type="video/mp4" />
          </video>
        </div>
        <div className="container">{children}</div>
      </div>
    </>
  );
};

export default Banner;
