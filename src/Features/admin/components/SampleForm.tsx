import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useTranslations } from "next-intl";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
interface Props {
  data?: any;
  onFinish?: ((values: any) => void) | undefined;
}
const SampleForm = ({ data }: Props) => {
  const t = useTranslations('ADMIN')
  const onFinish = (values: any) => {
  };
  return (
    <Form
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      initialValues={data}
      layout="vertical"
    >
      <Form.Item
        name="title"
        label={t("Title")}
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label={t("Description")}
        rules={[{ required: true, message: "Please input the description!" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.List
        name="subContent"
        rules={[
          {
            validator: async (_, subContent) => {
              if (!subContent || subContent.length < 1) {
                return Promise.reject(new Error("At least 1 sub contents"));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <div key={index}>
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Sub Content" : ""}
                  required={false}
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "title"]}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input the sub content's title!",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Sub content title"
                      style={{ width: "60%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "description"]}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input the sub content's description!",
                      },
                    ]}
                    noStyle
                  >
                    <Input.TextArea
                      placeholder="Sub content description"
                      style={{ width: "60%" }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              </div>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
              >
                Add Sub Content
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SampleForm;
