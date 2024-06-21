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

  const getFieldStyle = (fieldName: any) => {
    return form.isFieldTouched(fieldName) &&
      form.getFieldError(fieldName).length
      ? { backgroundColor: "darkred" }
      : { backgroundColor: "white" };
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
        >
          <Input style={getFieldStyle("name")} />
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
            {
              pattern: /^\d{1,14}$/,
              message: "Phone number must be numeric and less than 15 digits",
            },
          ]}
        >
          <Input
            addonBefore="+998"
            style={{ ...getFieldStyle("phone"), width: "100%" }}
            maxLength={14}
            placeholder="Enter phone number without country code"
            inputMode="numeric"
            pattern="\d*"
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
        >
          <Input style={getFieldStyle("email")} />
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
        >
          <div style={getFieldStyle("message")}>
            <AndTextArea />
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" label={t("order")} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderFormList;
