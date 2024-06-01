import React from "react";
import SvgSelector from "@/Assets/Icons/SvgSelector";
import styles from "./SliderSwipes.module.scss";
import { SliderSwipesProps } from "../Types/index";

const SlidersSwipes: React.FC<SliderSwipesProps> = ({ prevEl, nextEl }) => {
  return (
    <>
      <div className={styles.swipe__btns}>
        <button className={`${prevEl} ${styles.swipe__btnprev}`}>
          <SvgSelector id="prev-svg" />
        </button>
        <button className={`${nextEl} ${styles.swipe__btnnext}`}>
          <SvgSelector id="next-svg" />
        </button>
      </div>
    </>
  );
};

export default SlidersSwipes;
