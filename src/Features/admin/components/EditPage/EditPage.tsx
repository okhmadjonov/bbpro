import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import { useRouter } from "next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useTranslations } from "next-intl";
import { Button, Upload } from "@/ui";

interface Props {
  link: string;
  children?: React.ReactNode;
  data?: any;
  multipart?: boolean;
  showBackButton?: boolean;
}

const EditPage = ({
  link,
  children,
  data,
  multipart,
  showBackButton = true,
}: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const slug = router?.query?.id;
  const t = useTranslations("ADMIN");

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
      if (data?.categoryId) {
        form.setFieldValue("categoryId", String(data.categoryId));
      }
      setImageFile(null); // Reset image file when data changes
    }
  }, [data]);

  const { appendData: updateData } = useQueryApiClient({
    request: {
      url: `${link}?id=${slug}`,
      method: "PUT",
      multipart,
    },
    onSuccess() {
      router.back();
    },
  });

  const { appendData: createData } = useQueryApiClient({
    request: {
      url: link,
      method: "POST",
      multipart,
    },
    onSuccess() {
      router.back();
    },
  });

  const convertDataToFormData = (data: any) => {
    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];

        if (Array.isArray(value)) {
          if (key === "phone") {
            value.forEach((phone: string, index: number) => {
              formData.append(`phone[${index}]`, phone);
            });
          } else {
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
          for (const lang in value) {
            if (Object.prototype.hasOwnProperty.call(value, lang)) {
              formData.append(`${key}.${lang}`, value[lang]);
            }
          }
        } else {
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
    } else if (data?.imageUrl) {
      formData.append("imageUrl", data.imageUrl); // Ensure imageUrl is included if imageFile is not provided
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

  return (
    <>
      {showBackButton && (
        <Button
          type="primary"
          onClick={handleBackButtonClick}
          style={{ marginBottom: "30px" }}
          label={t("Back")}
        />
      )}
      <Form onFinish={onFinish} form={form}>
        {multipart && (
          <Upload
            onChange={(file: File) => setImageFile(file)}
            btnLabel={t("Upload")}
            imageUrl={data?.imageUrl}
            rules={[
              {
                required: true,
                message: "Please Select Image!",
              },
            ]}
          />
        )}
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
