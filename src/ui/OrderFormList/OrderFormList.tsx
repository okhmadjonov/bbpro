import React from "react";
import { Form, Input, message } from "antd";
import { AndTextArea } from "../Textarea/Textarea";
import { Button } from "../../ui";
import { useTranslations } from "next-intl";
import useQueryApiClient from "@/utils/useQueryApiClient";
import styles from "./OrderFormList.module.scss";

const OrderFormList = () => {
  const [form] = Form.useForm();
  const t = useTranslations("Order");

  const { appendData: saveOrderData } = useQueryApiClient({
    request: {
      url: "/Order",
      method: "POST",
    },
    onSuccess(res) {
      message.success(t("order_success"));
      form.resetFields();
    },
    onError(err) {
      message.error(err.message || t("order_error"));
    },
  });

  const onFinish = (values: any) => {
    if (values.phone && values.phone.startsWith("+998")) {
      values.phone = values.phone.substr(4);
    }

    saveOrderData(values);
  };

  return (
    <div>
      <Form
        form={form}
        name="OrderForm"
        layout="vertical"
        className="order-form"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label={t("order_name")}
          rules={[
            {
              required: true,
              message: t("order_name_message"),
            },
          ]}
          validateStatus={
            form.isFieldTouched("name") && form.getFieldError("name")
              ? "error"
              : ""
          }
          hasFeedback
          className={
            form.isFieldTouched("name") && form.getFieldError("name")
              ? styles.error
              : ""
          }
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label={t("order_phone")}
          initialValue=""
          rules={[
            {
              required: true,
              message: t("order_phone_message"),
            },
          ]}
          validateStatus={
            form.isFieldTouched("phone") && form.getFieldError("phone")
              ? "error"
              : ""
          }
          hasFeedback
          className={
            form.isFieldTouched("phone") && form.getFieldError("phone")
              ? styles.error
              : ""
          }
        >
          <Input
            addonBefore="+998"
            style={{ width: "100%" }}
            maxLength={9}
            placeholder={t("order_phone_place")}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={t("order_email")}
          rules={[
            {
              required: true,
              type: "email",
              message: t("order_email_message"),
            },
          ]}
          validateStatus={
            form.isFieldTouched("email") && form.getFieldError("email")
              ? "error"
              : ""
          }
          hasFeedback
          className={
            form.isFieldTouched("email") && form.getFieldError("email")
              ? styles.error
              : ""
          }
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="message"
          label={t("order_message")}
          rules={[
            {
              required: true,
              message: t("order_message_message"),
            },
          ]}
          validateStatus={
            form.isFieldTouched("message") && form.getFieldError("message")
              ? "error"
              : ""
          }
          hasFeedback
          className={
            form.isFieldTouched("message") && form.getFieldError("message")
              ? styles.error
              : ""
          }
        >
          <AndTextArea />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            size="small"
            htmlType="submit"
            label={t("order")}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderFormList;
