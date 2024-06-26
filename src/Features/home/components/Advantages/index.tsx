import React from "react";
import styles from "./Advantages.module.scss";
import { useTranslations } from "next-intl";
import { PiStudent } from "react-icons/pi";
import { SlDocs } from "react-icons/sl";
import { SiWebmoney } from "react-icons/si";
import { GrInstall } from "react-icons/gr";
import { BsHouseGear } from "react-icons/bs";

import { IoPeopleOutline } from "react-icons/io5";

const Advantages = () => {
  const t = useTranslations("ADVAN");
  return (
    <div className={styles.advantages}>
      <div className={styles.advantages__inner}>
        <div className={styles.advantages__title}>
          <h3>{t("title")}</h3>
        </div>
        <div className={styles.advantages__content}>
          <div className={styles.advantages__left}>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <IoPeopleOutline />
              </span>
              <p>{t("left_one")}</p>
            </div>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <PiStudent />
              </span>
              <p>{t("left_two")}</p>
            </div>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <GrInstall />
              </span>
              <p>{t("left_three")}</p>
            </div>
          </div>
          <div className={styles.advantages__right}>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <BsHouseGear />
              </span>
              <p>{t("right_one")}</p>
            </div>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <SlDocs />
              </span>
              <p>{t("right_two")}</p>
            </div>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <SiWebmoney />
              </span>
              <p>{t("right_three")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
