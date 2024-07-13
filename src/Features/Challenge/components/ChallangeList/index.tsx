import React from "react";
import styles from "./ChallengeList.module.scss";
import PhotoGallery from "../ChallangeCard";
import Faq from "../Faq/Faq";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const ChallengeList = () => {
  return (
    <div className={styles.challengelist}>
      <VideoPlayer/>
      <PhotoGallery />
      <Faq />
    </div>
  );
};

export default ChallengeList;
