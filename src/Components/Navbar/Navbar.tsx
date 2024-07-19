import styles from "./Navbar.module.scss";
import Image from "next/image";
import SvgSelector from "@/Assets/Icons/SvgSelector";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import { useRouter } from "next/router";
import { phoneNumber1 } from "@/utils/consts";
import { ContactInfoModal } from "../ContactInfoModal/ContactInfoModal";
import { useEffect, useState } from "react";
import { facebook, instagram, telegram } from "@/Assets/Images";



const Navbar = ( ) => {
  const location = useRouter();
  const t = useTranslations("");
  const [scrolled, setScrolled] = useState<string>("absolute");
  const [mobileNavVisible, setMobileNavVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [navType, setNavType] = useState<"transparent" | "color">(
    "transparent"
  );

  const navLinks = [
    { link: "/service", key: "GlobalKeyWords.service" },
    { link: "/project", key: "GlobalKeyWords.project" },
    { link: "/info", key: "GlobalKeyWords.info" },
    { link: "/contact", key: "GlobalKeyWords.contact" },
    { link: "/challenge", key: "GlobalKeyWords.mero" },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 250) {
      setScrolled("fixed");
      setNavType("color");
    } else if (offset > 150) {
      setScrolled("start_scrool");
      setNavType("color");
    } else {
      setScrolled("absolute");
      handleSetNavType();
    }
  };

  const handleSetNavType = () => {
    if (location.pathname === "/" || location.pathname === "/main") {
      setNavType("transparent");
    } else {
      setNavType("color");
    }
  };

  useEffect(() => {
    if (mobileNavVisible) {
      document.documentElement.classList.add(styles.disableScrollHtml);
    } else {
      document.documentElement.classList.remove(styles.disableScrollHtml);
    }

    return () => {
      document.documentElement.classList.remove(styles.disableScrollHtml);
    };
  }, [mobileNavVisible]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    handleSetNavType();
  }, [location.pathname]);

  return (
    <div className={`${styles.desktop} ${styles[navType]}`}>
      <div className={`${styles[scrolled]} ${styles.sticky_nav}`}>
        <div className="container">
          <nav className={styles.navbar}>
            <Link href={"/"}>
              <div className={styles.logo}>
                <SvgSelector id="site_logo_svg_2" />
              </div>
            </Link>
            <ul>
              {navLinks.map((item, index) => (
                <Link
                  className={
                    location.pathname.includes(item.link)
                      ? styles.activeItem
                      : "no-active"
                  }
                  key={index}
                  href={item.link}
                >
                  {t(item.key)}
                </Link>
              ))}
            </ul>
            <div className={styles.info_side}>
              <LanguageSelector navType={navType} />
              <div onClick={showModal}>
                <div className={styles.number}>
                  <p>{t("call.day_time")}</p>
                  <h5>{phoneNumber1}</h5>
                </div>
              </div>
              <div className={styles.navbar__icons}>
                <Link target="_blank" href="https://www.facebook.com/">
                  <Image src={facebook} alt="Facebook Icon" />
                </Link>

                <Link target="_blank" href="https://t.me/">
                  <Image src={telegram} alt="Telegram Icon" />
                </Link>

                <Link target="_blank" href="https://www.instagram.com/">
                  <Image src={instagram} alt="Instagram Icon" />
                </Link>
              </div>
              <div
                className={styles.bars_menu}
                onClick={() => setMobileNavVisible(true)}
              >
                <SvgSelector id="bars-menu-svg" />
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className={styles.mobile}>
        <div
          className={`${styles.mobile_nav} ${
            mobileNavVisible ? styles.active : ""
          }`}
        >
          <div className={styles.mobile_nav_inner}>
            <div className={styles.title}>
              <Link href={"/"} onClick={() => setMobileNavVisible(false)}>
                <div className={styles.logo}>
                  <SvgSelector id="site_logo_svg_mobile" />
                </div>
              </Link>
              <div
                className={styles.close_icon}
                onClick={() => setMobileNavVisible(false)}
              >
                <SvgSelector id="close_svg" />
              </div>
            </div>
            <LanguageSelector navType={navType} isMobile={true} />
            <ul className={styles.links}>
              {navLinks.map((item, index) => (
                <Link
                  className={
                    location.pathname === item.key
                      ? styles.activeItem
                      : "no-active"
                  }
                  key={index}
                  href={item.link}
                  onClick={() => {
                    setMobileNavVisible(false);
                  }}
                >
                  <span>{t(item.key)}</span>
                  <SvgSelector id="line_chevron_svg" />
                </Link>
              ))}
            </ul>
            <div className={styles.navbar__icons}>
              <Link target="_blank" href="https://www.facebook.com/">
                <Image src={facebook} alt="Facebook Icon" />
              </Link>

              <Link target="_blank" href="https://t.me/">
                <Image src={telegram} alt="Telegram Icon" />
              </Link>

              <Link target="_blank" href="https://www.instagram.com/">
                <Image src={instagram} alt="Instagram Icon" />
              </Link>
            </div>
            <div className={styles.number}>
              <div onClick={showModal}>
                <div className={styles.number}>
                  <h5>{phoneNumber1}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => setMobileNavVisible(false)}
          className={`${styles.mask} ${mobileNavVisible ? styles.active : ""}`}
        ></div>
      </div>
      <ContactInfoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Navbar;
