import { ServiceInterface } from "@/Components/Types";
import { useTranslations } from "next-intl";
import React from "react";
import styles from "./Service.module.scss";
import { FaArrowRight, FaRegEye } from "react-icons/fa";
import Link from "next/link";

interface ServiceProps {
  services: ServiceInterface[];
}

const numbers = [{ 1: "1" }, { 2: "2" }, { 3: "3" }, { 4: "4" }, { 5: "5" }];

function ServiceSection({ services }: ServiceProps) {
  const t = useTranslations();
  return (
    <div className={styles.services}>
      <div className={styles.services__container}>
        <div className={styles.sc__items}>
          {numbers.map((numberObj, index) => (
            <div key={index} className={styles.sc_item}>
              <div className={styles.sc_item_content}>
                <div className={styles.sc_item_content_header}>
                  <div className={styles.sc_item_content_header_icon}>
                    <FaRegEye className={styles.headIcon} />
                  </div>
                  <div className={styles.sc_item_content_header_text}>
                    <p>BBPRO</p>
                    <h4>Services</h4>
                  </div>
                </div>
                <div className={styles.sc_item_content_body}>
                  <h4>Protective DNS for the Corporate Environment</h4>
                </div>
                <Link href={"/"} className={styles.sc_item_content_footer}>
                  <p>SEE BBPRO INSIDE</p>
                  <FaArrowRight className={styles.footerIcon} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceSection;
