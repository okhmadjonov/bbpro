import React from "react";
import styles from "./Partner.module.scss";
import Image from "next/image";

import {
  ColorMicro,
  TRCisco,
  TRCyber,
  TRLrd,
  TRMicro,
  TRSas,
  TRWin,
} from "@/Assets/Images";

const Partner = () => {
  return (
    <div className={styles.partners}>
      <div className={styles.partner_inner}>
        <h4>Our Partners</h4>
        <div className={styles.partners_inner_items}>
          <div className={styles.pii_item}>
            <Image src={TRCisco} alt="Partner" />
          </div>
          <div className={styles.pii_item}>
            <Image src={TRCyber} alt="Partner" />
          </div>
          <div className={styles.pii_item}>
            <Image src={TRLrd} alt="Partner" />
          </div>
          <div className={styles.pii_item}>
            <Image src={ColorMicro} alt="Partner" />
          </div>
          <div className={styles.pii_item}>
            <Image src={TRSas} alt="Partner" />
          </div>
          <div className={styles.pii_item}>
            <Image src={TRWin} alt="Partner" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
