import React from "react";
import AboutCard from "../StaticDataCards/AboutCard/index";
import AboutUsCard from "../StaticDataCards/AboutUsCard/index";
import ContactCard from "../StaticDataCards/ContactCard/index";
import HomeBannerCard from "../StaticDataCards/HomeBannerCard/index";
import styles from "./StaticPage.module.scss";
import { useTranslations } from "next-intl";

const StaticPage = () => {
  const t = useTranslations("ADMIN")
  return (
    <div>
      <div className="admin_page_title">
        <h1>{t("StaticsDatas")}</h1>
      </div>
      <div className={styles.statics}>
        <div className="col-lg-4 col-6">
          <div className={styles.card_admin}>
            <div className={styles.card}>
              <AboutUsCard />
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-6">
          <div className={styles.card_admin}>
            <div className={styles.card}>
              <ContactCard />
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-6">
          <div className={styles.card_admin}>
            <div className={styles.card}>
              <HomeBannerCard />
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-6">
          <div className={styles.card_admin}>
            <div className={styles.card}>
              <AboutCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
