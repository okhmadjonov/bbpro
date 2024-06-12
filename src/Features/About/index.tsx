import React from "react";
import Image from "next/image";
import styles from "./About.module.scss";
import { AboutInterface, LocaleStringsInterface } from "@/Components/Types";
import { useLocale } from "next-intl";
import { BASE_URL } from "@/services/api";

interface AboutProps {
  about: AboutInterface[];
}

const About = ({ about }: AboutProps) => {
  const locale = useLocale();

  // Check if about array is defined and has at least one element
  if (!about || about.length === 0) {
    return <div className={styles.about}>No data available.</div>;
  }

  const data = about[0];

  return (
    <div className={styles.about}>
      <div className={styles.aboutItem}>
        <div className={styles.aboutImage}>
          <Image
            src={`${BASE_URL}/${data?.imageUrl}`}
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
  );
};

export default About;
