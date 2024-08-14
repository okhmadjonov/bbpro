import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "@/Assets/Loader.json";
import styles from "./Loader.module.css";

interface Props {
  isComponent?: boolean;
}

function Loader({ isComponent = true }: Props) {
  const animationContainer = useRef(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
      anim.setSpeed(1.5);
      return () => {
        anim.destroy();
      };
    }
  }, []);

  return (
    <>
      <div className={!isComponent ? styles.mask : ""}></div>
      <div className={isComponent ? styles.is_component : styles.loader}>
        <div className={styles.loader_inner} ref={animationContainer}></div>
      </div>
    </>
  );
}

export default React.memo(Loader);
