import { ProjectInterface } from "@/Components/Types";
import styles from "./Project.module.scss";
import { useTranslations } from "next-intl";
import React from "react";
import { FaArrowRight, FaRegEye, FaFingerprint } from "react-icons/fa";
import Link from "next/link";

interface ProjectProps {
  projects: ProjectInterface[];
}

function ProjectSection({ projects }: ProjectProps) {
  const t = useTranslations();
  const numbers = [{ 1: "1" }, { 2: "2" }, { 3: "3" }, { 4: "4" }, { 5: "5" }];

  return (
    <>
      <div className={styles.projects}>
        <div className={styles.projects__container}>
          <div className={styles.pj__items}>
            {numbers.map((numberObj, index) => (
              <div key={index} className={styles.pj_item}>
                <div className={styles.pj_item_content}>
                  <div className={styles.pj_item_content_header}>
                    <div className={styles.pj_item_content_header_icon}>
                      <FaFingerprint className={styles.headIcon} />
                    </div>
                    <div className={styles.pj_item_content_header_text}>
                      <p>BBPRO</p>
                      <h4>Projects</h4>
                    </div>
                  </div>
                  <div className={styles.pj_item_content_body}>
                    <h4>Protective DNS for the Corporate Environment</h4>
                  </div>
                  <Link href={"/"} className={styles.pj_item_content_footer}>
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
