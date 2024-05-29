import React from "react";
import styles from "./Banner.module.scss";
import Image from "next/image";
import { ReactNode } from "react";
import { BI, BannerImage21,  } from "@/Assets/Images/index";

interface ILayoutsProps {
  children: ReactNode;
}

const Banner = ({ children }: ILayoutsProps) => {
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.banner__image}>
          <Image src={BI} alt="img" />
        </div>
        <div className="container">{children}</div>
      </div>
    </>
  );
};

export default Banner;
