import { Form, message } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button, Upload } from "@/ui";

interface Props {
  link: string;
  children?: React.ReactNode;
  data?: any;
  multipart?: boolean;
}

const EditPage = ({ link, children, data, multipart }: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const slug = router?.query?.id;
  const t = useTranslations("ADMIN");

  const [imageFile, setImageFile] = useState<File | null>();
  useEffect(() => {
    form.setFieldsValue(data);
    if (data?.categoryId) {
      form.setFieldValue("categoryId", String(data.categoryId));
    }
  }, [data]);

  const { appendData: updateData } = useQueryApiClient({
    request: {
      url: `${link}?id=${slug}`,
      method: "PUT",
      multipart,
    },
    onSuccess(res) {
      router.back();
    },
  });

  const { appendData: createData } = useQueryApiClient({
    request: {
      url: link,
      method: "POST",
      multipart,
    },
    onSuccess(res) {
      router.back();
    },
  });

  // bu esa faqat shu yer uchun qogan joylaga ishlatmisiz
  const convertDataToFormData = (data: any) => {
    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];

        if (Array.isArray(value)) {
          if (key === "phone") {
            // If key is 'phone', directly append the whole array
            value.forEach((phone: string, index: number) => {
              formData.append(`phone[${index}]`, phone);
            });
          } else {
            // Process other arrays similarly as before
            value.forEach((subContent: any, index: number) => {
              for (const subKey in subContent) {
                if (Object.prototype.hasOwnProperty.call(subContent, subKey)) {
                  const subValue = subContent[subKey];
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
          }
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

  const onFinish = (values: any) => {
    const formData = convertDataToFormData(values);
    if (imageFile) {
      formData.append("imageUrl", imageFile);
    }
    if (slug) {
      updateData(formData);
    } else {
      if (!imageFile && multipart) {
        message.error("Please Select Image");
        return;
      }
      createData(formData);
    }
  };

  const handleBackButtonClick = () => {
    router.back();
  };

  const buttonStyle = {
    marginBottom: "30px",
  };

  return (
    <>
      <Button
        type="primary"
        onClick={handleBackButtonClick}
        style={buttonStyle}
        label={t("Back")}
      ></Button>
      <Form onFinish={onFinish} form={form}>
        {multipart && multipart == true ? (
          <Upload
            onChange={(file: File) => setImageFile(file)}
            btnLabel={t("Upload")}
            imageUrl={data?.imageUrl}
            rules={[
              {
                required: true,
                message: `Please Select Image!`,
              },
            ]}
          />
        ) : null}

        {children}
        <Button
          size="small"
          type="primary"
          htmlType="submit"
          label={t("Submit")}
        ></Button>
      </Form>
    </>
  );
};

export default EditPage;
