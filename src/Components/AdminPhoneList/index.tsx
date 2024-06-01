import React from "react";
import { Form, Button, Space } from "antd";
import { Input } from '@/ui/index';
// import { validatePhoneNumber } from "@/utils/validations";

interface FieldData {
    name: string | number | (string | number)[];
    key: string | number;
}
  
interface Props {
    fields: FieldData[];
    add: () => void;
    remove: (name: string | number | (string | number)[]) => void;
}

const PhoneList = ({ fields, add, remove }: Props) => {
  return (
    <>
      {fields.map((field, index) => (
        <Form.Item
          label={"Phone"}
          required={true}
          key={field.key}
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Space direction="horizontal" align="start">
            <Input {...field} validateTrigger={["onChange", "onBlur"]}
              noStyle placeholder="Phone number" type="tel" rules={[{ required: true, message: 'Please input your username!' }]}/>
            {fields.length > 1 ? (
              <Button onClick={() => remove(field.name)}>Remove</Button>
            ) : null}
          </Space>
        </Form.Item>
      ))}
      <Form.Item>
        <Button onClick={() => add()} type="dashed" block>
          Add phone number
        </Button>
      </Form.Item>
    </>
  );
};

export default PhoneList;
