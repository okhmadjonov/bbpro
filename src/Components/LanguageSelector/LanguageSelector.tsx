import { useLocale } from "next-intl";
import { useRouter } from "next/router";
import styles from "./Language.module.scss";
import React, { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import SvgSelector from "@/Assets/Icons/SvgSelector";
import { en_flag, ru_flag, uz_flag } from "@/Assets/Images";

const LanguageSelector = ({
  navType,
  isMobile = false,
}: {
  navType: "transparent" | "color";
  isMobile?: boolean;
}) => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(router.locale);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = router.locales;

  const images: { [key: string]: StaticImageData } = {
    uz: uz_flag,
    ru: ru_flag,
    en: en_flag,
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang || "uz");
    router.push(router.pathname, router.asPath, {
      locale: lang,
    });
    closeDropdown();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as any).contains(event.target)
    ) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMobile) {
    return (
      <div className={styles.mobile_lang_selector}>
        <SvgSelector id="browser_svg" />
        <ul className={styles.language_list}>
          {languages?.map((lang) => (
            <li
              key={lang}
              className={lang === router.locale ? styles.active : ""}
              onClick={() => handleLanguageChange(lang)}
            >
              {lang}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className={styles.language_selector}>
      <div
        className={`${styles.dropdown} ${isDropdownOpen ? styles.open : ""} ${
          styles[navType]
        }`}
        ref={dropdownRef}
      >
        <div className={styles.selected_language} onClick={toggleDropdown}>
          <Image
            src={images[router.locale ? router.locale : "ru"]}
            alt="image"
            className={styles.flag}
          />
          <span className={styles.lang_item}>{selectedLanguage}</span>
         
        </div>
        <ul className={styles.language_list}>
          {languages?.map((lang) => (
            <li key={lang} onClick={() => handleLanguageChange(lang)}>
              <Image className={styles.flag} src={images[lang]} alt="image" />
              {lang}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSelector;
