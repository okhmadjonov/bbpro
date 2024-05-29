import React, { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Modal } from "antd";
import { ContactInfoImage, ContactInfoTablet } from "@/Assets/Images/index";
import Image, { StaticImageData } from "next/image";
import styles from "./ContactInfoModal.module.scss";
import SvgSelector from "@/Assets/Icons/SvgSelector";
import Link from "next/link";
// import useQueryApiClient from "@/utils/useQueryApiClient";
import { ContactInterface, LocaleStringsInterface } from "../Types";
interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContactInfoModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const t = useTranslations("ContactInfoModal");
  const [currentImage, setCurrentImage] =
    useState<StaticImageData>(ContactInfoImage);
  const [contactData, setContactData] = useState<ContactInterface | null>(null);
  const locale = useLocale();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCurrentImage(ContactInfoTablet);
      } else {
        setCurrentImage(ContactInfoImage);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //   const {
  //     data: responseData,
  //     isLoading,
  //     refetch,
  //   } = useQueryApiClient({
  //     request: {
  //       url: "/Contact",
  //       method: "GET",
  //       disableOnMount: true,
  //     },
  //     onSuccess: (response) => {
  //       setContactData(response.data[0]);
  //     },
  //   });

  //   useEffect(() => {
  //     if (isModalOpen && !contactData) {
  //       refetch();
  //     }
  //   }, [isModalOpen, contactData, refetch]);

  return (
    <>
      <Modal
        className={"contact_info_modal"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
        zIndex={2500}
      >
        <div className={styles.contact_info__modal}>
          <div className={styles.contact_info__text}>
            <div className={styles.header__title}>
              <h1>{t("contact_number")}</h1>
              <p>{t("schedule")} Mon-Fri 10:00–18:00</p>
            </div>

            <div className={styles.main__btn}>
              {/* {contactData?.phone.map((num) => ( */}
              <Link href="/">
                <button className={styles.number__btn}>
                  <SvgSelector id="contact_info_phone_svg" />
                  {/* {num}
                   */}
                  +99 (890) 000-00-00
                </button>
              </Link>
              {/* // ))} */}
              <p>{t("to_call")}</p>
            </div>
          </div>
          <div className={styles.contact_info__image}>
            <Image
              className={styles.image}
              src={currentImage}
              alt="contactimg"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
