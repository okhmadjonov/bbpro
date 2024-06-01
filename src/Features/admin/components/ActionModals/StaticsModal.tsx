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
  children: React.ReactNode;
  link: string;
  onSuccess?: (updatedData: any) => void;
  multipart?: boolean;
}
const StaticsModal = ({
  selectedData,
  setSelectedData,
  children,
  link,
  onSuccess,
  multipart,
}: Props) => {
  const [form] = Form.useForm();
  const t = useTranslations("ADMIN");
  const [imageFile, setImageFile] = useState<File | null>();

  useEffect(() => {
    form.setFieldsValue(selectedData.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData]);

  const handleCancel = () => {
    setSelectedData({ type: "default", data: {} });
  };

  const convertDataToFormData = (data: any) => {
    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];

        if (Array.isArray(value)) {
          // Handle the array of newsSubContent
          value.forEach((subContent: any, index: number) => {
            for (const subKey in subContent) {
              if (Object.prototype.hasOwnProperty.call(subContent, subKey)) {
                const subValue = subContent[subKey];
                // Iterate over each language in subtitle or subdescription
                for (const lang in subValue) {
                  if (Object.prototype.hasOwnProperty.call(subValue, lang)) {
                    formData.append(
                      `${key}[].${subKey}.${lang}`,
                      subValue[lang]
                    );
                  }
                }
              }
            }
          });
        } else if (typeof value === "object") {
          // Process non-array objects as usual
          for (const lang in value) {
            if (Object.prototype.hasOwnProperty.call(value, lang)) {
              formData.append(`${key}.${lang}`, value[lang]);
            }
          }
        } else {
          // Append other fields as-is
          formData.append(key, value);
        }
      }
    }

    return formData;
  };

  const { appendData: updateData } = useQueryApiClient({
    request: {
      url: `${link}?id=${selectedData?.data?.id}`,
      method: "PUT",
      multipart,
    },
    onSuccess(selectedData) {
      handleCancel();
      if (onSuccess) {
        onSuccess(selectedData);
      }
    },
  });

  const onFinish = (values: any) => {
    if (imageFile) {
      const formData = convertDataToFormData(values);

      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }
      updateData(formData);
    } else {
      updateData(values);
    }
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
          {multipart && multipart == true ? (
            <Upload
              onChange={(file: File) => setImageFile(file)}
              btnLabel={t("Upload")}
              imageUrl={selectedData.data?.imageUrl}
            />
          ) : null}

          {children}
        </Form>
      </Modal>
    </>
  );
};

export default StaticsModal;
