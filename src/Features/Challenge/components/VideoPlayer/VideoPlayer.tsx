import React, { useState } from "react";
import styles from "./VideoPlayer.module.scss";
import video1 from "@/Assets/Videos/video1.mp4";
import video3 from "@/Assets/Videos/video3.mp4";
import video4 from "@/Assets/Videos/video4.mp4";

import video5 from "@/Assets/Videos/video5.mp4";
import video6 from "@/Assets/Videos/video6.mp4";
import video7 from "@/Assets/Videos/video7.mp4";
import video8 from "@/Assets/Videos/video8.mp4";
import video9 from "@/Assets/Videos/video9.mp4";

const VideoPlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState(video5);

  return (
    <div className={styles.videoplayer}>
      <div className={styles.videoplayer_video}>
        <video src={selectedVideo} controls></video>
      </div>

      <div className={styles.videoplayer_items}>
        <div
          className={styles.videoplayer_item}
          onClick={() => setSelectedVideo(video5)}
        >
          <div className={styles.videoplayer_smallvideo}>
            <video src={video5} muted></video>
          </div>
          <div className={styles.videoplayer_title}>
            <p>Различные занимательные практические занятия.</p>
          </div>
        </div>
        <div
          className={styles.videoplayer_item}
          onClick={() => setSelectedVideo(video6)}
        >
          <div className={styles.videoplayer_smallvideo}>
            <video src={video6} muted></video>
          </div>
          <div className={styles.videoplayer_title}>
            <p>Различные занимательные практические занятия.</p>
          </div>
        </div>
        <div
          className={styles.videoplayer_item}
          onClick={() => setSelectedVideo(video7)}
        >
          <div className={styles.videoplayer_smallvideo}>
            <video src={video7} muted></video>
          </div>
          <div className={styles.videoplayer_title}>
            <p>Различные занимательные практические занятия.</p>
          </div>
        </div>
        <div
          className={styles.videoplayer_item}
          onClick={() => setSelectedVideo(video8)}
        >
          <div className={styles.videoplayer_smallvideo}>
            <video src={video8} muted></video>
          </div>
          <div className={styles.videoplayer_title}>
            <p>Различные занимательные практические занятия.</p>
          </div>
        </div>
        <div
          className={styles.videoplayer_item}
          onClick={() => setSelectedVideo(video9)}
        >
          <div className={styles.videoplayer_smallvideo}>
            <video src={video9} muted></video>
          </div>
          <div className={styles.videoplayer_title}>
            <p>Различные занимательные практические занятия.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
