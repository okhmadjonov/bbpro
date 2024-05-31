import React from "react";
import styles from "./Banner.module.scss";
import { ReactNode } from "react";
import newinno from "@/Assets/Videos/newinno.mp4";
import newinno2 from "@/Assets/Videos/newinno2.mp4";
import newinno3 from "@/Assets/Videos/newinno2.mp4";

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
            <source src={newinno} type="video/mp4" />
          </video>
        </div>
        <div className="container">{children}</div>
      </div>
    </>
  );
};

export default Banner;
