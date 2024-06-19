import React, { useEffect, useRef, useState } from "react";
import styles from "./AboutCompany.module.scss";
import { AboutInterface, LocaleStringsInterface } from "@/Components/Types";
import { useLocale, useTranslations } from "next-intl";
import { BigBoxPro } from "@/Assets/Images";

interface AboutProps {
  abouts: AboutInterface[];
}

const AboutCompany = ({ abouts }: AboutProps) => {
  const locale = useLocale();
  const t = useTranslations();
  const data = abouts && abouts[0];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.about}>
      <div className="container">
        <h3>{t("AboutCompany.title")}</h3>
        <div
          className={styles.aboutItem}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={styles.aboutDescription}>
            <p>{data.description[locale as keyof LocaleStringsInterface]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
