import React from "react";
import styles from "./ChallengeList.module.scss";
import PhotoGallery from "../ChallangeCard";
import Faq from "../Faq/Faq";

const ChallengeList = () => {
  return (
    <div className={styles.challengelist}>
      <Faq />
      <PhotoGallery />
    </div>
  );
};

export default ChallengeList;
