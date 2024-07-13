import React, { useState } from 'react';
import styles from './VideoPlayer.module.scss';
import video1 from "@/Assets/Videos/video1.mp4";
import video3 from "@/Assets/Videos/video3.mp4";
import video4 from "@/Assets/Videos/video4.mp4";

const VideoPlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState(video1);

  return (
    <div className={styles.videoplayer}>
      <div className={styles.videoplayer_video}>
        <video src={selectedVideo} controls></video>
      </div>
      <div className={styles.videoplayer_videolist}>
        <div className={styles.videoplayer_items}>
          <div
            className={styles.videoplayer_item}
            onClick={() => setSelectedVideo(video1)}
          >
            <div className={styles.videoplayer_smallvideo}>
              <video src={video1} muted></video>
            </div>
            <div className={styles.videoplayer_title}>
              <p>Our new challanges videos are all here</p>
            </div>
          </div>
          <div
            className={styles.videoplayer_item}
            onClick={() => setSelectedVideo(video3)}
          >
            <div className={styles.videoplayer_smallvideo}>
              <video src={video3} muted></video>
            </div>
            <div className={styles.videoplayer_title}>
            <p>Our new challanges videos are all here</p>
            </div>
          </div>
          <div
            className={styles.videoplayer_item}
            onClick={() => setSelectedVideo(video4)}
          >
            <div className={styles.videoplayer_smallvideo}>
              <video src={video4} muted></video>
            </div>
            <div className={styles.videoplayer_title}>
            <p>Our new challanges videos are all here</p>
            </div>
          </div>
          <div
            className={styles.videoplayer_item}
            onClick={() => setSelectedVideo(video4)}
          >
            <div className={styles.videoplayer_smallvideo}>
              <video src={video4} muted></video>
            </div>
            <div className={styles.videoplayer_title}>
            <p>Our new challanges videos are all here</p>
            </div>
          </div>
          <div
            className={styles.videoplayer_item}
            onClick={() => setSelectedVideo(video4)}
          >
            <div className={styles.videoplayer_smallvideo}>
              <video src={video4} muted></video>
            </div>
            <div className={styles.videoplayer_title}>
            <p>Our new challanges videos are all here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
