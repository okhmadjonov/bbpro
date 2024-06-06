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
  const t = useTranslations();
  return (
    <div className={styles.advantages}>
      <div className={styles.advantages__inner}>
        <div className={styles.advantages__title}>
          <h3>{t("ADVAN.title")}</h3>
        </div>
        <div className={styles.advantages__content}>
          <div className={styles.advantages__left}>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <IoPeopleOutline />
              </span>
              <p>Собственный штат высококвалифицированных инженеров</p>
            </div>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <PiStudent />
              </span>
              <p>
                30-летний опыт внедрения лучших мировых IT-практик на местном
                рынке
              </p>
            </div>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <GrInstall />
              </span>
              <p>Поставка и инсталляция от единого интегратора</p>
            </div>
          </div>
          <div className={styles.advantages__right}>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <BsHouseGear />
              </span>
              <p>Полный спектр услуг по реализации инфраструктурных проектов</p>
            </div>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <SlDocs />
              </span>
              <p>
                Комплексная разработка и экспертное сопровождение проектной
                документации
              </p>
            </div>
            <div className={styles.advantages__item}>
              <span className={styles.item__icon}>
                <SiWebmoney />
              </span>
              <p>Pre-sale и Post-sale поддержка</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
