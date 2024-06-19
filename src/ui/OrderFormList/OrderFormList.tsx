import React from "react";
import { Form, Input, message } from "antd";
import { AndTextArea } from "../Textarea/Textarea";
import { Button } from "../../ui";
import { useTranslations } from "next-intl";
import useQueryApiClient from "@/utils/useQueryApiClient";

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
