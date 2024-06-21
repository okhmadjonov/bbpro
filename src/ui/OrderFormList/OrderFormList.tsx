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
      message.success("Ваш заказ успешно отправлен.");
      form.resetFields();
    },
    onError(err) {
      message.error(err.message || "Не удалось сохранить заказ.");
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
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
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
          label="Phone"
          initialValue=""
          rules={[
            {
              required: true,
              message: "Please enter your phone number",
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
            placeholder="Enter phone number without country code"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email address",
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
          label="Message"
          rules={[
            {
              required: true,
              message: "Please enter your message",
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
          <Button type="primary" htmlType="submit" label={t("order")} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderFormList;
