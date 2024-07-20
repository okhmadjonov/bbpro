import React from "react";
import styles from "./ServiceDetails.module.scss";
import Image from "next/image";
import { useLocale } from "next-intl";
import { LocaleStringsInterface } from "@/Components/Types";
import { BASE_URL } from "@/services/api";
import { ServicesData } from "../../types";

interface Props {
  ssDetail: ServicesData;
}

const ServiceDetails = ({ ssDetail }: Props) => {
  const locale = useLocale();

  const formatDescription = (description: string) => {
    return description.replace(/\r\n/g, "<br />").replace(/\. /g, ".<br />");
  };

  const description =
    ssDetail.description[locale as keyof LocaleStringsInterface];
  const formattedDescription = formatDescription(description);

  return (
    <div className={styles.servicedetails}>
      <Image
        className={styles.imageUrl}
        src={`${BASE_URL}/${ssDetail.imageUrl}`}
        alt={ssDetail.title[locale as keyof LocaleStringsInterface]}
        width={1000}
        height={1000}
        priority
      />
      <div className={styles.details}>
        <h2>{ssDetail?.title[locale as keyof LocaleStringsInterface]}</h2>
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

export default ServiceDetails;
