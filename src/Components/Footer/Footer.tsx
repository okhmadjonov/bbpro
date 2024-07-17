import React from "react";
import styles from "./Footer.module.scss";
import { useTranslations } from "next-intl";
import SvgSelector from "@/Assets/Icons/SvgSelector";
import Link from "next/link";
import { phoneNumber1 } from "@/utils/consts";

const Footer = () => {
  const t = useTranslations("");
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className={styles.footer}>
        <div className="container">
          <div className={styles.footer__top_mobile}>
            <div>
              <Link href={"/service"}>{t("GlobalKeyWords.service")}</Link>
              <Link href={"/project"}>{t("GlobalKeyWords.project")}</Link>
              <Link href={"/info"}>{t("GlobalKeyWords.info")}</Link>
              <Link href={"/contact"}>{t("GlobalKeyWords.contact")}</Link>
              {/* <Link href={"/challenge"}>{t("GlobalKeyWords.challenge")}</Link> */}
              <Link href={"/challenge"}>{t("GlobalKeyWords.mero")}</Link>
            </div>
          </div>

          <div className={styles.footer__inner}>
            <div className={styles.footer__about}>
              <Link href={"/"} className={styles.footer__logo}>
                <SvgSelector id="site_logo_svg_footer" />
              </Link>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.325907928281!2d69.31094909762069!3d41.30177316687614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef52099f9f365%3A0xfbd5b98a8fa2c648!2sIT%20Park%20Tashkent!5e0!3m2!1sen!2s!4v1721211045095!5m2!1sen!2s"
                width="100%"
                height="250"
                loading="lazy"
              />

              <p>{t("FOOTER.footer_title")}</p>
            </div>

            <div className={styles.footer__navigation}>
              <h2>{t("FOOTER.navigation")}</h2>

              <div className={styles.footer__navs}>
                <Link href={"/service"}>{t("GlobalKeyWords.service")}</Link>
                <Link href={"/project"}>{t("GlobalKeyWords.project")}</Link>
                <Link href={"/info"}>{t("GlobalKeyWords.info")}</Link>
                <Link href={"/contact"}>{t("GlobalKeyWords.contact")}</Link>
                <Link href={"/challenge"}>{t("GlobalKeyWords.mero")}</Link>
              </div>
            </div>

            <div className={styles.footer__contact}>
              <h2>{t("GlobalKeyWords.contact")}</h2>

              <div className={styles.footer__contact_list}>
                <div className={styles.footer__phone}>
                  <SvgSelector id="phone-svg" />

                  <div>
                    <Link target="_blank" href={`tel:${phoneNumber1}`}>
                      {phoneNumber1}
                    </Link>
                  </div>
                </div>

                <div className={styles.footer__map}>
                  <SvgSelector id="location-svg" />
                  <Link
                    href="/contact"
                    dangerouslySetInnerHTML={{ __html: t("FOOTER.address") }}
                  />
                </div>

                <div className={styles.footer__gmail}>
                  <SvgSelector id="mail-svg" />
                  <Link target="_blank" href="mailto: bigboxpros@gmail.com">
                    bigboxpros@gmail.com
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer__bottom}>
            <div className={styles.footer__icons}>
              <Link target="_blank" href="https://www.facebook.com/">
                <SvgSelector id="facebook_icon_svg" />
              </Link>

              <Link target="_blank" href="https://t.me/">
                <SvgSelector id="telegram_icon_svg" />
              </Link>

              <Link target="_blank" href="https://www.instagram.com/bigboxpro/">
                <SvgSelector id="instagram_icon_svg" />
              </Link>
            </div>

            <div className={styles.footer__logo_company}>
              <p>© {currentYear} BIG BOX PRO</p>

              <Link
                target="_blank"
                href="https://bbpro.me/"
                className={styles.footer__logo2}
              >
                Developed by Big Box Pro
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
