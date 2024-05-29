import React from "react";
import styles from "./Description.module.scss";
import { ReactNode } from "react";

interface IHomepageDescriptionProps {
  children: ReactNode;
}

const Description = ({ children }: IHomepageDescriptionProps) => {
  return (
    <div className={styles.description}>
      <div className="container">{children}</div>
    </div>
  );
};

export default Description;
