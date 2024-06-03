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

  return (
    <div className={styles.servicedetails}>
      <Image
        className={styles.imageUrl}
        src={`${BASE_URL}/${ssDetail.imageUrl}`}
        alt="Error"
        width={1000}
        height={1000}
      />
      <div className={styles.details}>
        <div className={styles.details_about}>
          <h2>{ssDetail?.title[locale as keyof LocaleStringsInterface]}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html:
                ssDetail.description[locale as keyof LocaleStringsInterface],
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
