import React from "react";
import { Form, Button } from "antd";
import { Rule } from "rc-field-form/lib/interface";
import { ColorPicker as AntdColorPicker } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Color } from "antd/lib/color-picker";
const { Item: FormItem } = Form;

export interface ColorPickerProps {
  color?: Color | undefined;
  onChange?: ((value: Color, hex: string) => void) | undefined;
  label?: string;
  rules?: Rule[];
  className?: string;
  validateTrigger?: string | string[];
  noStyle?: boolean;
  initialValue?: string;
  disabled?: boolean;
  hasFeedback?: boolean;
  dependencies?: any[] | undefined;
  size?: SizeType;
  showText?: boolean;
  name?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  disabled = false,
  label,
  rules = [],
  className,
  validateTrigger,
  noStyle,
  initialValue,
  hasFeedback,
  dependencies,
  color,
  onChange,
  size = "middle",
  showText = true,
  name,
}: ColorPickerProps) => {
  const validateColor = (
    rule: Rule,
    value: string,
    callback: (error?: string) => void
  ) => {
    // You can add custom validation logic for color if needed
    callback();
  };

  return (
    <FormItem
      initialValue={initialValue}
      label={label}
      name={name}
      rules={[
        ...rules,
        {
          validator: validateColor,
        },
      ]}
      validateTrigger={validateTrigger}
      noStyle={noStyle}
      hasFeedback={hasFeedback}
      dependencies={dependencies}
    >
      <>
        <AntdColorPicker
          defaultValue="#000000"
          size={size}
          showText={showText}
          onChange={onChange}
        />
      </>
    </FormItem>
  );
};
