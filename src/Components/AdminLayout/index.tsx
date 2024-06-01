import React, { ReactNode, useState } from "react";

import { Layout, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { AdminNav } from "@/Features/admin";
import AdminSidebar from "../AdminSidebar";
import Head from "next/head";

const { Content } = Layout;

interface ILayoutsProps {
  children: ReactNode;
}
const AdminLayout: React.FC<ILayoutsProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Head>
        <title>Admin</title>
      </Head>
      <AdminSidebar collapsed={collapsed} />
      <Layout>
        <AdminNav collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} Created by Big Box Pro
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
