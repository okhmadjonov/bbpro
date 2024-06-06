import React from "react";
import styles from "./HomeHeader.module.scss";
import { useTranslations } from "next-intl";
import { Button } from "@/ui/index";
import Link from "next/link";
import { HomeBannerInterface } from "@/Components/Types";

interface Props {
  homeBanner: HomeBannerInterface[];
}

const HomeHeader = ({ homeBanner }: Props) => {
  const t = useTranslations("");

  return (
    <div className={styles.homeheader} data-aos="fade-up">
      <div className={styles.homeheader__inner}>
        <div className={styles.homeheader__left}>
          <div className={styles.homeheader__title}>
            <h2
              dangerouslySetInnerHTML={{
                __html: t("BANNER.banner_subtitle"),
              }}
            />
          </div>

          <Link href="/service">
            <Button
              type="default"
              label={t("GlobalKeyWords.btn_text")}
              size="middle"
              className="defaultwhite-button"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
