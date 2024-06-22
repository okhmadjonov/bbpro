import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Modal } from "antd";
import styles from "./OrderModal.module.scss";
import OrderFormList from "@/ui/OrderFormList/OrderFormList";
import EditPage from "@/Features/admin/components/EditPage/EditPage";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OrderModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const t = useTranslations("Order");
  const locale = useLocale();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        className={"order_info_modal"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        zIndex={2500}
      >
        <OrderFormList />
      </Modal>
    </>
  );
};
