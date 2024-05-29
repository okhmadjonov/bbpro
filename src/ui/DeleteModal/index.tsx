import { Modal, Button } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
import { SelectedDataInterface } from "@/Components/Types";

interface Props {
  selectedData?: SelectedDataInterface;
  setSelectedData: React.Dispatch<React.SetStateAction<SelectedDataInterface>>;
  handleOk: () => void;
}

const DeleteModal = ({ selectedData, setSelectedData, handleOk }: Props) => {
  const t = useTranslations("ADMIN");

  const handleCancel = () => {
    setSelectedData({ type: "default", data: {} });
  };

  return (
    <Modal
      title={t("delete_title")}
      open={selectedData?.type === "delete"}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          {t("cancel")}
        </Button>,
        <Button key="confirm" type="primary" onClick={handleOk}>
          {t("confirm")}
        </Button>,
      ]}
      style={{ maxWidth: "1000px" }}
    >
      <p>{t("delete_confirmation_message")}</p>
    </Modal>
  );
};

export default DeleteModal;
