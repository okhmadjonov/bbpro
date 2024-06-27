import React, { useState, useEffect } from "react";
import Image from "next/image";
import SvgSelector from "@/Assets/Icons/SvgSelector";
import {
  LocaleStringsInterface,
  NewServicesCardProps,
  ServiceCardProps,
} from "@/Components/Types/index";
import { useLocale, useTranslations } from "next-intl";
import styles from "./ServicesCard.module.scss";
import Link from "next/link";
import { BASE_URL } from "@/services/api";
import { Button } from "@/ui/index";

const ServicesCard = ({
  description,
  id,
  index,
  title,
  imageUrl,
}: NewServicesCardProps) => {
  const t = useTranslations("");
  const locale = useLocale();
  const [truncatedDescription, setTruncatedDescription] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let maxLength;

      if (screenWidth > 1350) {
        maxLength = 100;
      } else if (screenWidth > 1050) {
        maxLength = 80;
      } else if (screenWidth <= 1050) {
        maxLength = 100;
      } else {
        maxLength = 120;
      }

      let truncatedDescription: any;
      if (
        description != null &&
        description[locale as keyof LocaleStringsInterface] !== ""
      ) {
        const localeDescription =
          description[locale as keyof LocaleStringsInterface];
        truncatedDescription =
          localeDescription.slice(0, maxLength) +
          (localeDescription.length > maxLength ? "..." : "");
        setTruncatedDescription(truncatedDescription);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [description, locale]);

  return (
    <>
      <div
        className={styles.newproductscard}
        data-aos="fade-up"
        style={{ marginBottom: "20px" }}
      >
        <div className={styles.newproducts__inner}>
          <div className={styles.newproductscard__image}>
            <Image
              src={BASE_URL + "/" + imageUrl}
              alt="img"
              width={1000}
              height={1000}
            />
          </div>

          <h2 className={styles.newproductscard__title}>
            {title && title[locale as keyof LocaleStringsInterface]}
          </h2>

          <p
            className={styles.newproductscard__text}
            dangerouslySetInnerHTML={{ __html: truncatedDescription }}
          ></p>
        </div>
        <div className={styles.btn_block}>
          <Link href={`/service/${id}`}>
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

export default ServicesCard;
