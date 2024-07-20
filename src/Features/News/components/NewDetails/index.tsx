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

  const formatDescription = (description: string) => {
    return description.replace(/\r\n/g, "<br />").replace(/\. /g, ".<br />");
  };

  const description =
    newsDetail.description[locale as keyof LocaleStringsInterface];
  const formattedDescription = formatDescription(description);

  return (
    <div className={styles.newdetails}>
      <Image
        className={styles.imageUrl}
        src={`${BASE_URL}/${newsDetail.imageUrl}`}
        alt="Error"
        width={1000}
        height={1000}
        priority
      />
      <div className={styles.details}>
        <h2>{newsDetail?.title[locale as keyof LocaleStringsInterface]}</h2>
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

export default NewDetails;
