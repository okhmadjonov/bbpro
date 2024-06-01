import {
  LocaleStringsInterface,
  SelectedDataInterface,
} from "@/Components/Types";
import { Button, Modal, Select, SelectOption, Upload } from "@/ui";
import LanguageFormList from "@/ui/LanguageFormList/LanguageFormList";
import { Form } from "antd";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import AboutUsForm from "../ActionForms/AboutUsForm/index";
import { useRouter } from "next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";

interface Props {
  selectedData: SelectedDataInterface;
  setSelectedData: React.Dispatch<React.SetStateAction<SelectedDataInterface>>;
  refetch: () => void;
  techCharacterData?: any;
  selectedTechCharacter?: any;
}
const SpecificationsModal = ({
  selectedData,
  setSelectedData,
  refetch,
  techCharacterData,
  selectedTechCharacter,
}: Props) => {
  const [form] = Form.useForm();
  const locale = useLocale();
  const t = useTranslations("ADMIN");
  const router = useRouter();
  const slug = router?.query?.id;

  useEffect(() => {
    if (selectedData.type === "edit" || selectedData.type === "create") {
      form.setFieldsValue(selectedData.data);
      if (selectedData.type === "edit") {
        form.setFieldValue(
          "techCharacterId",
          String(selectedData?.data?.techCharacterId)
        );
      }
      return;
    }
    form.resetFields();

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
          ? `/TechCharacter/${selectedData?.data?.id}`
          : "/TechCharacter",
      method: selectedData?.method ? selectedData?.method : "POST",
    },
    onSuccess() {
      refetch();
      handleCancel();
    },
  });

  const { appendData: updateProductSpecifications } = useQueryApiClient({
    request: {
      url:
        selectedData.method === "PUT"
          ? `/TechCharacterValue/${selectedData?.data?.id}`
          : "/TechCharacterValue",
      method: selectedData?.method ? selectedData?.method : "POST",
    },
    onSuccess() {
      refetch();
      handleCancel();
    },
  });

  const onFinish = (values: any) => {
    if (slug) {
      updateProductSpecifications({
        ...values,
        techCharacterId: parseInt(values.techCharacterId) * 1,
        productId: typeof slug === "string" ? parseInt(slug) * 1 : 0,
      });
      return;
    }
    updateData(values);
  };

  return (
    <>
      <Modal
        title={t("static_data")}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        open={selectedData.type === "edit" || selectedData.type === "create"}
      >
        <Form onFinish={onFinish} form={form}>
          {slug && (
            <Select
              name="techCharacterId"
              placeholder="Select specitifactions key"
            >
              {techCharacterData?.map((item: any) => (
                <SelectOption key={item.id}>
                  {item?.key[locale as keyof LocaleStringsInterface]}
                </SelectOption>
              ))}
            </Select>
          )}
          <LanguageFormList listName={slug ? "value" : `key`} />
        </Form>
      </Modal>
    </>
  );
};

export default SpecificationsModal;
