import React, { useEffect, useState } from "react";
import { Form, Upload as AntdUpload, message, Space } from "antd";
import { Rule } from "rc-field-form/lib/interface";
import { PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { BASE_URL } from "@/services/api";

interface UploadProps {
  onChange?: (file: File) => void;
  name?: (string | number)[] | string | number;
  label?: string;
  rules?: Rule[];
  className?: string;
  initialValue?: string[];
  btnLabel?: string;
  children?: React.ReactNode;
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<void>;
  multipleLanguages?: boolean;
  imageUrl?: any;
}

export const Upload = ({
  name,
  label,
  rules,
  className = "default_uploader",
  initialValue,
  onChange,
  btnLabel,
  children,
  beforeUpload,
  multipleLanguages = false,
  imageUrl,
}: UploadProps) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const t = useTranslations("ADMIN");

  const getBase64 = (img: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleImageChange = (file: File) => {
    setLoading(true);
    getBase64(file, (url) => {
      setLoading(false);
      setImageSrc(url);
    });
  };

  const handleChange = (info: any) => {
    if (info.file.originFileObj) {
      if (onChange) {
        onChange(info.file.originFileObj);
      }
      message.success(`${info.file.name} file uploaded successfully`);
      handleImageChange(info.file.originFileObj as File);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const customBeforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (imageUrl) {
      setImageSrc(`${BASE_URL}/${imageUrl}`);
    }
  }, [imageUrl]);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{t("Upload")}</div>
    </button>
  );

  return (
    <div className={className}>
      <Form.Item
        label={label}
        name={name}
        rules={rules}
        initialValue={initialValue}
      >
        <Space direction="vertical">
          <AntdUpload
            onChange={handleChange}
            beforeUpload={customBeforeUpload}
            fileList={[]}
            multiple={multipleLanguages}
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="avatar"
                width={100}
                height={100}
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </AntdUpload>
        </Space>
      </Form.Item>
      {/* Hidden field to store imageUrl */}
      <Form.Item name="imageUrl" noStyle>
        <input type="hidden" value={imageSrc} />
      </Form.Item>
    </div>
  );
};
