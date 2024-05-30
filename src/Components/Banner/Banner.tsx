import React from "react";
import styles from "./Banner.module.scss";
import Image from "next/image";
import { ReactNode } from "react";
import { BC } from "@/Assets/Images/index";

interface ILayoutsProps {
  children: ReactNode;
}

const Banner = ({ children }: ILayoutsProps) => {
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.banner__image}>
          <Image src={BC} alt="img" />
        </div>
        <div className="container">{children}</div>
      </div>
    </>
  );
};

export default Banner;
