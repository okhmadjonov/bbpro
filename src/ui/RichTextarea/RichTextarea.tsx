import React, { useEffect, useState } from "react";
import { Form } from "antd";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Rule } from "rc-field-form/lib/interface";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export interface CKEditorProps {
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  label?: string | React.ReactNode;
  rules?: Rule[];
  name?: (string | number)[] | string | number;
  className?: string;
  validateTrigger?: string | string[];
  noStyle?: boolean;
  initialValue?: string;
  disabled?: boolean;
  rows?: number;
}

export const RichTextarea: React.FC<CKEditorProps> = ({
  disabled = false,
  placeholder,
  name,
  required,
  onChange,
  label,
  rules = [],
  className,
  validateTrigger,
  noStyle,
  initialValue,
  rows = 4,
  onBlur,
}) => {
  const [editorValue, setEditorValue] = useState(initialValue || "");

  useEffect(() => {
    setEditorValue(initialValue || "");
  }, [initialValue]);

  const handleEditorChange = (value: any) => {
    setEditorValue(value);
    onChange && onChange(value);
  };

  const handleEditorBlur = () => {
    onBlur && onBlur(editorValue);
  };

  return (
    <div className="rich_textarea">
      <Form.Item
        initialValue={initialValue}
        label={label}
        name={name}
        rules={[...rules]}
        className={className}
        validateTrigger={validateTrigger}
        noStyle={noStyle}
      >
        <ReactQuill
          value={editorValue}
          onChange={handleEditorChange}
          onBlur={handleEditorBlur}
          placeholder={placeholder}
          readOnly={disabled}
          style={{ height: `${rows * 35}px` }}
        />
      </Form.Item>
    </div>
  );
};
