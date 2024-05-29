import React from "react";
import styles from "./WhyBBP.module.scss";

import { WhyBBPInterface } from "@/Components/Types";
import { useTranslations } from "next-intl";

interface Props {
  whyBBP: WhyBBPInterface;
}

const WhyBBP = ({ whyBBP }: Props) => {
  const t = useTranslations();

  return (
    <div className={styles.whybbp}>
      <div className={styles.whybbp__inner}>
        <div className={styles.whybbp__title}>
          <h2
            dangerouslySetInnerHTML={{
              __html: t("WhyBBP.title"),
            }}
          />
        </div>
        <div
          className={styles.whybbp__text}
          dangerouslySetInnerHTML={{
            __html: t("WhyBBP.sub_title"),
          }}
        />
      </div>
    </div>
  );
};

export default WhyBBP;
