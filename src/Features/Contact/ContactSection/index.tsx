import React, { useEffect, useState } from "react";
import styles from "./Contact.module.scss";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LocaleStringsInterface } from "@/Components/Types";
import { ContactInterface } from "@/Components/Types";
interface ContactProps {
  contact: ContactInterface[];
}

function Contact({ contact }: ContactProps) {
  const t = useTranslations("");
  const locale = useLocale();
  const data = contact[0];
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.contact_page} data-aos="fade-up">
      <div className={styles.contact_main__content}>
        <h3>{t("Contact.head_office")}</h3>

        <div className={styles.contact_main__items}>
          <div className={styles.contact_item__one}>
            <div className={styles.contact_items__address}>
              <h4>{t("GlobalKeyWords.address")}</h4>
              <p>{data?.address[locale as keyof LocaleStringsInterface]}</p>
            </div>
            <div className={styles.contact_items__number}>
              <h4>{t("GlobalKeyWords.phone")}</h4>
              {data?.phone?.map((phone: string, idx: number) => (
                <div key={idx}>
                  {isSmallScreen ? (
                    <Link target="_blank" href={`tel:${phone}`}>
                      <p>{phone}</p>
                    </Link>
                  ) : (
                    <p>{phone}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.contact_item__two}>
            <div className={styles.contact_items__mail}>
              <h4>{t("Contact.email")}</h4>
              <p>{data?.email}</p>
            </div>
            <div className={styles.contact_items__work}>
              <h4>{t("Contact.schedule")}</h4>
              <p>
                <span>
                  {" "}
                  {data?.workDay[locale as keyof LocaleStringsInterface]}
                </span>
                <span>
                  {" "}
                  {data?.weekend[locale as keyof LocaleStringsInterface]}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.contact__map}>
          <iframe
            src={data?.mapFrame}
            width="100%"
            height="480"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
