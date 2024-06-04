import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import SvgSelector from "@/Assets/Icons/SvgSelector";
import styles from "./Sidebar.module.scss";
import Image from "next/image";
import {
  category,
  document,
  people,
  BrandsAdminIcon,
  CompanyIcon,
} from "@/Assets/Images";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
interface Props {
  collapsed: boolean;
}

const AdminSidebar = ({ collapsed }: Props) => {
  const t = useTranslations("");
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState<any>();
  const sidebarLinks = [
    {
      text: "ADMIN.static_data",
      link: "/admin/static",
      id: 1,
      icon: <Image src={category} width={20} height={20} alt="#" />,
    },

    {
      text: "GlobalKeyWords.news",
      link: "/admin/news",
      id: 2,
      icon: <Image src={document} width={20} height={20} alt="#" />,
    },

    {
      text: "GlobalKeyWords.service",
      link: "/admin/service",
      id: 3,
      icon: <Image src={document} width={20} height={20} alt="#" />,
    },
    {
      text: "GlobalKeyWords.project",
      link: "/admin/project",
      id: 4,
      icon: <Image src={CompanyIcon} width={20} height={20} alt="#" />,
    },

    {
      text: "ADMIN.Brands",
      link: "/admin/brands",
      id: 5,
      icon: <Image src={BrandsAdminIcon} width={20} height={20} alt="#" />,
    },
  ];
  useEffect(() => {
    setSelectedKey(router.pathname);
  }, []);

  return (
    <>
      <Sider
        className={styles.sider}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className={collapsed ? styles.mobile : styles.desktop}>
          <div className={styles.logo}>
            <Link href={"/"}>
              <SvgSelector id="site_logo_svg_footer" />
            </Link>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKey}
          items={sidebarLinks.map((item) => ({
            key: item.link,
            icon: item.icon,
            label: (
              <Link onClick={() => setSelectedKey(item.link)} href={item.link}>
                {t(item.text)}
              </Link>
            ),
          }))}
        />
      </Sider>
    </>
  );
};

export default AdminSidebar;
