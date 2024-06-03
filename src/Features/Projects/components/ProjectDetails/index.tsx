import React from "react";
import styles from "./ProjectDetails.module.scss";
import Image from "next/image";
import { useLocale } from "next-intl";
import { LocaleStringsInterface } from "@/Components/Types";
import { BASE_URL } from "@/services/api";
import { ProjectsData } from "../../types";

interface Props {
  projectsDetail: ProjectsData;
}

const ProjectDetails = ({ projectsDetail }: Props) => {
  const locale = useLocale();
  return (
    <div className={styles.projectdetails}>
      <Image
        className={styles.imageUrl}
        src={`${BASE_URL}/${projectsDetail.imageUrl}`}
        alt="Error"
        width={1000}
        height={1000}
      />
      <div className={styles.details}>
        <div className={styles.details_about}>
          <h2>
            {projectsDetail?.title[locale as keyof LocaleStringsInterface]}
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html:
                projectsDetail.description[
                  locale as keyof LocaleStringsInterface
                ],
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
