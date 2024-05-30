import { NewsInterface } from "@/Components/Types";
import styles from "./News.module.scss";
import { useTranslations } from "next-intl";
import React from "react";
import { FaArrowRight, FaHackerNews } from "react-icons/fa";
import { FaRadio } from "react-icons/fa6";

import Link from "next/link";

interface NewsProps {
  newsdata: NewsInterface[];
}

function ProjectSection({ newsdata }: NewsProps) {
  const t = useTranslations();
  const numbers = [{ 1: "1" }, { 2: "2" }, { 3: "3" }, { 4: "4" }, { 5: "5" }];

  return (
    <>
      <div className={styles.news}>
        <div className={styles.news__container}>
          <div className={styles.ns__items}>
            {numbers.map((numberObj, index) => (
              <div key={index} className={styles.ns_item}>
                <div className={styles.ns_item_content}>
                  <div className={styles.ns_item_content_header}>
                    <div className={styles.ns_item_content_header_icon}>
                      {/* <FaHackerNews className={styles.headIcon} /> */}
                      <FaRadio className={styles.headIcon} />
                    </div>
                    <div className={styles.ns_item_content_header_text}>
                      <p>BBPRO</p>
                      <h4>News</h4>
                    </div>
                  </div>
                  <div className={styles.ns_item_content_body}>
                    <h4>Protective DNS for the Corporate Environment</h4>
                  </div>
                  <Link href={"/"} className={styles.ns_item_content_footer}>
                    <p>SEE BBPRO INSIDE</p>
                    <FaArrowRight className={styles.footerIcon} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectSection;
