import React from "react";
import styles from "./NewDetails.module.scss";
import Image from "next/image";
import { useLocale } from "next-intl";
import { LocaleStringsInterface } from "@/Components/Types";
import { BASE_URL } from "@/services/api";
import { NewsData } from "../../types";

interface Props {
  newsDetail: NewsData;
}

const NewDetails = ({ newsDetail }: Props) => {
  const locale = useLocale();
  return (
    <div className={styles.newdetails}>
      <Image
        className={styles.imageUrl}
        src={`${BASE_URL}/${newsDetail.imageUrl}`}
        alt="Error"
        width={1000}
        height={1000}
      />
      <div className={styles.details}>
        <div className={styles.details_about}>
          <h2>{newsDetail?.title[locale as keyof LocaleStringsInterface]}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html:
                newsDetail.description[locale as keyof LocaleStringsInterface],
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NewDetails;
