import React, { useState, useEffect } from "react";
import { Form, Input, Button, Spin, message } from "antd";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { AndTextArea } from "@/ui";

const Edit = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const t = useTranslations("ADMIN");
  const [loading, setLoading] = useState(true);

  const { refetch: getOneData } = useQueryApiClient({
    request: {
      url: `Order/${id}`,
      method: "GET",
      disableOnMount: true,
    },
    onSuccess(res) {
      form.setFieldsValue(res.data);
      setLoading(false);
    },
    onError(err) {
      message.error(err.message || "Failed to fetch order details.");
      setLoading(false);
    },
  });

  useEffect(() => {
    if (id) {
      getOneData();
    }
  }, [id]);

  if (loading) {
    return <Spin />;
  }

  const handleClose = () => {
    router.back();
  };

  return (
    <div>
      <Form
        form={form}
        name="OrderForm"
        layout="vertical"
        className="order-form"
        requiredMark={false}
      >
        <Form.Item name="name" label="Name">
          <Input disabled />
        </Form.Item>

        <Form.Item name="phone" label="Phone">
          <Input style={{ width: "100%" }} maxLength={9} disabled />
        </Form.Item>

        <Form.Item name="email" label="Email">
          <Input disabled />
        </Form.Item>

        <Form.Item name="message" label="Message">
          <AndTextArea disabled />
        </Form.Item>

        <Form.Item>
          <Button type="default" onClick={handleClose}>
            {t("close")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Edit;
