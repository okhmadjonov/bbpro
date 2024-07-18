import React, { useState, useEffect } from "react";
import Image from "next/image";
import SvgSelector from "@/Assets/Icons/SvgSelector";
import { LocaleStringsInterface, NewCardProps } from "@/Components/Types/index";
import { useTranslations } from "next-intl";
import styles from "./NewsCard.module.scss";
import Link from "next/link";
import { BASE_URL } from "@/services/api";
import { Button } from "@/ui/index";

const NewsCard = (props: NewCardProps) => {
  const { data, index, locale } = props;

  const t = useTranslations("");
  const [trancate, setTrancate] = useState("");
  useEffect(() => {
    const changedSize = () => {
      const screenWidth = window.innerWidth;
      let maxLength;

      if (screenWidth > 1050) {
        maxLength = 80;
      } else if (screenWidth <= 1050) {
        maxLength = 100;
      } else {
        maxLength = 120;
      }

      const description =
        data.description[locale as keyof LocaleStringsInterface];
      const truncateText =
        description.slice(0, maxLength) +
        (description.length > maxLength ? "..." : "");
      setTrancate(truncateText);
    };

    changedSize();

    window.addEventListener("resize", changedSize);

    return () => {
      window.addEventListener("resize", changedSize);
    };
  }, [data.description, locale]);

  return (
    <>
      <div className={styles.newscard} data-aos="fade-up">
        <div className={styles.newproducts__inner}>
          <div className={styles.newscard__image}>
            <Image
              src={`${BASE_URL}/${data?.imageUrl}`}
              alt="img"
              width={336}
              height={248}
            />
          </div>

          <h2 className={styles.newscard__title}>
            {data.title[locale as keyof LocaleStringsInterface]}
          </h2>

          <p className={styles.newscard__text}>{trancate}</p>
        </div>

        <div className={styles.btn_block}>
          <Link href={`info/${data.id}`}>
            <Button
              type="default"
              label={t("GlobalKeyWords.btn_text")}
              iconId="nextgreen-svg"
              iconPosition="right"
              size="middle"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
