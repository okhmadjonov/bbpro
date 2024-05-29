import React, { TouchEventHandler } from "react";
import { Button as AntdButton } from "antd";
import SvgSelector from "@/Assets/Icons/SvgSelector";

type ButtonType =
  | "link"
  | "text"
  | "default"
  | "primary"
  | "dashed"
  | undefined;

export interface ButtonProps {
  shape?: "circle" | "round";
  type?: ButtonType;
  htmlType?: "button" | "reset" | "submit";
  block?: boolean;
  onClick?: any;
  size?: "large" | "middle" | "small";
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLSpanElement>;
  onTouchStart?: TouchEventHandler;
  onTouchEnd?: TouchEventHandler;
  label?: React.ReactNode | string;
  danger?: boolean;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  title?: string;
  iconId?: React.ReactNode;
  iconPosition?: "left" | "right";
  style?: React.CSSProperties | undefined;
  icon?: React.ReactNode;
}

export const Button = ({
  disabled,
  label,
  className,
  type,
  shape,
  htmlType,
  onClick,
  block,
  size,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onTouchStart,
  onTouchEnd,
  danger,
  loading,
  title,
  iconId,
  iconPosition,
  style,
  icon,
}: ButtonProps) => {
  const buttonClassName = `ant-btn ${
    type === "primary"
      ? "primary-button"
      : type === "link"
      ? "link-button"
      : type === "text"
      ? "text-button"
      : type === "default" && className?.includes("defaultwhite-button")
      ? "defaultwhite-button"
      : type === "default"
      ? "default-button"
      : type === "dashed"
      ? "dashed-button"
      : "default"
  } ${
    shape === "circle" ? "circle" : shape === "round" ? "round" : "round"
  } ${className} ${size ? `ant-btn-${size}` : "ant-btn-middle"}`;

  return (
    <AntdButton
      disabled={disabled}
      className={buttonClassName}
      type={type}
      htmlType={htmlType}
      onClick={onClick}
      block={block}
      size={size}
      shape={shape}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      danger={danger}
      loading={loading}
      title={title}
      icon={icon ? icon : iconPosition === "right" ? undefined : null}
      style={style}
    >
      {iconPosition === "left" && <SvgSelector id={String(iconId)} />}
      {!!label && <span className="text">{label}</span>}
      {iconPosition === "right" && <SvgSelector id={String(iconId)} />}
    </AntdButton>
  );
};
