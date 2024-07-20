import React from "react";
import styles from "./ProjectDetails.module.scss";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { LocaleStringsInterface } from "@/Components/Types";
import { BASE_URL } from "@/services/api";
import { ProjectsData } from "../../types";
import Link from "next/link";

interface Props {
  projectsDetail: ProjectsData;
}

const ProjectDetails = ({ projectsDetail }: Props) => {
  const t = useTranslations("Projects");
  const locale = useLocale();

  const formatDescription = (description: string) => {
    return description.replace(/\r\n/g, "<br />").replace(/\. /g, ".<br />");
  };

  const description =
    projectsDetail.description[locale as keyof LocaleStringsInterface];
  const formattedDescription = formatDescription(description);

  return (
    <div className={styles.projectdetails}>
      <Image
        className={styles.imageUrl}
        src={`${BASE_URL}/${projectsDetail.imageUrl}`}
        alt={projectsDetail.title[locale as keyof LocaleStringsInterface]}
        width={1000}
        height={1000}
        priority
      />
      <div className={styles.details}>
        <h2>{projectsDetail?.title[locale as keyof LocaleStringsInterface]}</h2>
        <Link
          className={styles.downloadLink}
          href={projectsDetail.downloadLink.en}
        >
          {t("downloadLink")}
        </Link>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: formattedDescription,
          }}
        ></p>
      </div>
    </div>
  );
};

export default ProjectDetails;
