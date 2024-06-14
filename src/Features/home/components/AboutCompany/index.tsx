import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./AboutCompany.module.scss";
import { AboutInterface, LocaleStringsInterface } from "@/Components/Types";
import { useLocale, useTranslations } from "next-intl";
import { BASE_URL } from "@/services/api";

interface AboutProps {
  abouts: AboutInterface[];
}

const AboutCompany = ({ abouts }: AboutProps) => {
  const locale = useLocale();
  const t = useTranslations();
  const data = abouts && abouts[0];

  return (
    <div className={styles.about}>
      <div className="container">
        <h3>{t("AboutCompany.title")}</h3>
        <div className={styles.aboutItem}>
          <div className={styles.aboutImage}>
            <Image
              src={`${BASE_URL}/${data.imageUrl}`}
              alt={data.title[locale as keyof LocaleStringsInterface]}
              width={500}
              height={500}
              className={styles.image}
            />
          </div>

          <div className={styles.about_description}>
            <p>{data.description[locale as keyof LocaleStringsInterface]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
