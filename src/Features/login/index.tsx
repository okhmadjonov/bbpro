import React, { useState } from "react";
import { Button, Input } from "../../ui";
import { Form, message } from "antd";
import Image from "next/image";
import { login_lock, login_people } from "../../Assets/Images";
import { useTranslations } from "use-intl";
import styles from "./Login.module.scss";
import Link from "next/link";

function LoginForm({ getData, loading, errIs }: any) {
  const t = useTranslations("LOGIN");
  const handleFormSubmit = (data: any) => {
    getData(data);
  };

  return (
    <div className={styles.main_block}>
      <div className={styles.login_right_img}>
        {/* <Image alt="#" fill={true} src={login_img} /> */}
      </div>
      <div className={styles.login_form_block}>
        <div className={styles.login_form}>
          <Link href={"/"}>
            <div className={styles.back_home}>Back Home</div>
          </Link>
          <div className={styles.login_title}>
            <h2>{t("title")}</h2>
          </div>
          <div className={styles.login_form}>
            <Form
              layout="vertical"
              onFinish={handleFormSubmit}
              className="login_form"
            >
              <Input
                placeholder={t("login")}
                prefix={
                  <Image alt="#" width={24} height={24} src={login_people} />
                }
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Incorrect email address!" },
                ]}
              />
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 6,
                    message: "The password must contain at least 6 characters",
                  },
                ]}
                validateStatus={errIs ? "error" : ""}
                help={errIs ? errIs : ""}
              >
                <Input
                  placeholder={t("password")}
                  prefix={
                    <Image alt="#" width={24} height={24} src={login_lock} />
                  }
                  rules={[
                    { required: true, message: "Please input your password!" },
                    {
                      min: 6,
                      message:
                        "The password must contain at least 6 characters",
                    },
                  ]}
                  name="password"
                  type="password"
                />
              </Form.Item>
              <Button
                label={t("submit")}
                type="primary"
                htmlType="submit"
                loading={loading}
              />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
