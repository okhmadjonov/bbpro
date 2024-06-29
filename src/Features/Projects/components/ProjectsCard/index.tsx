import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/ui/index";
import SvgSelector from "@/Assets/Icons/SvgSelector";
import {
  LocaleStringsInterface,
  ProjectCardProps,
} from "@/Components/Types/index";
import { useTranslations } from "next-intl";
import styles from "./ProjectsCard.module.scss";
import Link from "next/link";
import { BASE_URL } from "@/services/api";

const ProjectsCard = (props: ProjectCardProps) => {
  const { data, index, locale } = props;
  const t = useTranslations("");
  const [truncate, setTruncate] = useState("");

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
      setTruncate(truncateText);
    };

    changedSize();

    window.addEventListener("resize", changedSize);

    return () => {
      window.removeEventListener("resize", changedSize);
    };
  }, [data.description, locale]);

  return (
    <div className={styles.projectscard} data-aos="fade-up">
      <div className={styles.projectsproducts__inner}>
        <div className={styles.projectscard__image}>
          <Image
            src={`${BASE_URL}/${data?.imageUrl}`}
            alt="img"
            width={336}
            height={248}
          />
        </div>

        <h2 className={styles.projectscard__title}>
          {data.title[locale as keyof LocaleStringsInterface]}
        </h2>

        <p className={styles.projectscard__text}>{truncate}</p>
      </div>
      <div className={styles.btn_block}>
        <Link href={`project/${data.id}`}>
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
  );
};

export default ProjectsCard;
