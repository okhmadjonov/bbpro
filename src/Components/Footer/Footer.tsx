import React from "react";
import styles from "./Footer.module.scss";
import { useTranslations } from "next-intl";
import SvgSelector from "@/Assets/Icons/SvgSelector";
import Link from "next/link";
import { phoneNumber1 } from "@/utils/consts";

const Footer = () => {
  const t = useTranslations("");
  return (
    <>
      <div className={styles.footer}>
        <div className="container">
          <div className={styles.footer__top_mobile}>
            <div>
              <Link href={"/main"}>{t("GlobalKeyWords.main")}</Link>
              <Link href={"/service"}>{t("GlobalKeyWords.service")}</Link>
              <Link href={"/project"}>{t("GlobalKeyWords.project")}</Link>
              <Link href={"/contact"}>{t("GlobalKeyWords.contact")}</Link>
            </div>
          </div>

          <div className={styles.footer__inner}>
            <div className={styles.footer__about}>
              <Link href={"/"} className={styles.footer__logo}>
                <SvgSelector id="site_logo_svg_2" />
              </Link>

              <p>{t("FOOTER.footer_title")}</p>
            </div>

            <div className={styles.footer__navigation}>
              <h2>{t("FOOTER.navigation")}</h2>

              <div className={styles.footer__navs}>
                <Link href={"/main"}>{t("GlobalKeyWords.main")}</Link>
                <Link href={"/service"}>{t("GlobalKeyWords.service")}</Link>
                <Link href={"/project"}>{t("GlobalKeyWords.project")}</Link>
                <Link href={"/contact"}>{t("GlobalKeyWords.contact")}</Link>
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
                  <Link target="_blank" href="mailto: bigboxpro@gmail.com">
                    bigboxpro@gmail.com
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
              <p>© 2024 BIG BOX PRO</p>

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
