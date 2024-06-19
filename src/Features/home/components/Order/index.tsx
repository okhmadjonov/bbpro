import React, { useState } from "react";
import styles from "./Order.module.scss";

import { useTranslations } from "next-intl";
import { Button } from "@/ui";
import { OrderModal } from "@/Components/OrderModal/OrderModal";

const Order = () => {
  const t = useTranslations("Order");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.order}>
      <div className="container">
        <div className={styles.order_content}>
          <div className={styles.order_content_text}>
            <h3>{t("order_title")}</h3>
            <p>{t("order_subtitle")}</p>
          </div>
          <div className={styles.order_btn_wrapper}>
            <Button
              onClick={showModal}
              type="default"
              label={t("order_btn")}
              size="middle"
              className="defaultwhite-button"
            />
          </div>
        </div>
      </div>
      <OrderModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
       
      />
    </div>
  );
};

export default Order;
