import { Button, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

import styles from "./Nav.module.scss";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminNav = ({ collapsed, setCollapsed }: Props) => {
  const t = useTranslations("ADMIN");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignOut = async () => {
   
    try {
      await signOut({ redirect: false });
      console.log("Sign out successful, redirecting to login page");
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <div className={styles.header_inner}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className={styles.left_side}>
            <LanguageSelector navType="color" />
            <Button onClick={handleSignOut} className={styles.log_out_btn}>
              {t("Logout")}
            </Button>
          </div>
        </div>
      </Header>
    </>
  );
};

export default AdminNav;
