import styles from "./CyberThread.module.scss";
import { ct } from "@/Assets/Images/index";
import { useTranslations } from "next-intl";
import Image from "next/image";

const CyberThread = () => {
  const t = useTranslations();
  return (
    <div className={styles.cyberthread}>
      <div className="container">
        <div className="container_top_padding">
          <div className={styles.cyberthread_inner}>
            <div className={styles.cyberthreadContent}>
              <div className={styles.cyberthreadLeft}>
                <div className={styles.cyberthreadLeftInner}>
                  <div className={styles.cyberthreadLeftTitle}>
                    <h3>{t("engagement.title")}</h3>
                  </div>
                  <div className={styles.cyberthreadLeftSubTitle}>
                    <h4>{t("engagement.step_one")}</h4>
                    <p>{t("engagement.step_one_sub")}</p>
                  </div>
                  <div className={styles.cyberthreadLeftSubTitle}>
                    <h4>{t("engagement.step_two")}</h4>
                    <p>{t("engagement.step_two_sub")}</p>
                  </div>
                  <div className={styles.cyberthreadLeftSubTitle}>
                    <h4>{t("engagement.step_three")}</h4>
                    <p>
                      {t("engagement.step_three_sub")}
                      <br />
                    </p>
                    <ul>
                      <li>{t("engagement.step_three_sub_one")}</li>
                      <li>{t("engagement.step_three_sub_two")}</li>
                      <li>{t("engagement.step_three_sub_three")}</li>
                      <li>{t("engagement.step_three_sub_four")}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.cyberthreadRight}>
                <Image src={ct} alt="CyberThread" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberThread;
