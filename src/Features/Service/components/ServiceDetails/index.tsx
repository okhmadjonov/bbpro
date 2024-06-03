import React from "react";
import styles from "./ServiceDetails.module.scss";
import Image from "next/image";
import { useLocale } from "next-intl";
import { LocaleStringsInterface } from "@/Components/Types";
import { BASE_URL } from "@/services/api";
import { ServicesData } from "../../types";

interface Props {
  servicesDetail: ServicesData;
}

const ServiceDetails = ({ servicesDetail }: Props) => {
  const locale = useLocale();
  return (
    <div className={styles.servicedetails}>
      <Image
        className={styles.imageUrl}
        src={`${BASE_URL}/${servicesDetail.imageUrl}`}
        alt="Error"
        width={1000}
        height={1000}
      />
      <div className={styles.details}>
        <div className={styles.details_about}>
          <h2>
            {servicesDetail?.title[locale as keyof LocaleStringsInterface]}
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html:
                servicesDetail.description[
                  locale as keyof LocaleStringsInterface
                ],
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
