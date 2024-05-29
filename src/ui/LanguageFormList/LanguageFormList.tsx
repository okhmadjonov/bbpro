import React from "react";
import { Form } from "antd";
import { useRouter } from "next/router";
import { AndTextArea } from "../Textarea/Textarea";
import { Input } from "../Input/Input";
import { RichTextarea } from "..";

interface Props {
  listName?: string;
  inputType?: "richTextarea" | "textarea" | "input";
}
const LanguageFormList = ({
  listName = "title",
  inputType = "input",
}: Props) => {
  const router = useRouter();

  return (
    <Form.List name={listName}>
      {(fields) => (
        <div className="language_input_list">
          <label className="language_label">{listName}</label>
          {router.locales?.map((locale, index) => (
            <Form.Item key={index} label={locale} required={false}>
              {inputType === "textarea" ? (
                <AndTextArea
                  name={locale}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      message: `Please input the ${locale} ${listName}!`,
                    },
                  ]}
                  noStyle
                />
              ) : inputType === "richTextarea" ? (
                <RichTextarea
                  name={locale}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      message: `Please input the ${locale} ${listName}!`,
                    },
                  ]}
                />
              ) : (
                <Input
                  name={locale}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      message: `Please input the ${locale} ${listName}!`,
                    },
                  ]}
                  noStyle
                />
              )}
            </Form.Item>
          ))}
        </div>
      )}
    </Form.List>
  );
};

export default LanguageFormList;
