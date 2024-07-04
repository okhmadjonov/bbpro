import React from "react";
import styles from "./Advantages.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  team,
  professor,
  install,
  renovation,
  docs,
  sale,
} from "@/Assets/Images";

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
                <Image src={team} alt="Team Image" />
              </span>
              <p>{t("left_one")}</p>
            </div>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <Image src={professor} alt="Team Image" />
              </span>
              <p>{t("left_two")}</p>
            </div>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <Image src={install} alt="Team Image" />
              </span>
              <p>{t("left_three")}</p>
            </div>
          </div>
          <div className={styles.advantages__right}>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <Image src={renovation} alt="Team Image" />
              </span>
              <p>{t("right_one")}</p>
            </div>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <Image src={docs} alt="Team Image" />
              </span>
              <p>{t("right_two")}</p>
            </div>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <Image src={sale} alt="Team Image" />
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
