import { SelectedDataInterface } from "@/Components/Types";
import { Button, Modal, Upload } from "@/ui";
import LanguageFormList from "@/ui/LanguageFormList/LanguageFormList";
import { Form } from "antd";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import AboutUsForm from "../ActionForms/AboutUsForm/index";
import { useRouter } from "next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";

interface Props {
  selectedData: SelectedDataInterface;
  setSelectedData: React.Dispatch<React.SetStateAction<SelectedDataInterface>>;
  refetch: () => void;
}
const SubContentModal = ({ selectedData, setSelectedData, refetch }: Props) => {
  const [form] = Form.useForm();
  const t = useTranslations("ADMIN");
  const router = useRouter();
  const slug = router?.query?.id;
  useEffect(() => {
    form.setFieldsValue(selectedData.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData]);

  const handleCancel = () => {
    setSelectedData({ type: "refetch", data: {} });
    form.resetFields();
  };

  const { appendData: updateData } = useQueryApiClient({
    request: {
      url:
        selectedData.method === "PUT"
          ? `/News/sub-content?id=${selectedData?.data?.id}`
          : "/News/sub-content",
      method: selectedData?.method ? selectedData?.method : "POST",
    },
    onSuccess() {
      refetch();
      handleCancel();
    },
  });

  const onFinish = (values: any) => {
    updateData({ newsSubContents: [values], newsId: slug });
  };

  return (
    <>
      <Modal
        title={t("static_data")}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        open={selectedData.type === "edit"}
      >
        <Form onFinish={onFinish} form={form}>
          <LanguageFormList listName="subtitle" />
          <LanguageFormList
            inputType="richTextarea"
            listName="subdescription"
          />
        </Form>
      </Modal>
    </>
  );
};

export default SubContentModal;
