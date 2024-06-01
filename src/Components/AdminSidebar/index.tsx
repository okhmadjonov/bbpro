import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import SvgSelector from "@/Assets/Icons/SvgSelector";
import styles from "./Sidebar.module.scss";
import Image from "next/image";
import {
  box,
  category,
  document,
  folder,
  location,
  people,
  site_logo_svg2,
  site_logo_mobile,
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
      text: "GlobalKeyWords.catalog",
      link: "/admin/catalog",
      id: 2,
      icon: <Image src={folder} width={20} height={20} alt="#" />,
    },
    {
      text: "ADMIN.products",
      link: "/admin/products",
      id: 3,
      icon: <Image src={box} width={20} height={20} alt="#" />,
    },
    {
      text: "GlobalKeyWords.news",
      link: "/admin/news",
      id: 4,
      icon: <Image src={document} width={20} height={20} alt="#" />,
    },
    {
      text: "OurTeam.title",
      link: "/admin/ourteam",
      id: 5,
      icon: <Image src={people} width={20} height={20} alt="#" />,
    },
    {
      text: "ADMIN.locations",
      link: "/admin/location",
      id: 6,
      icon: <Image src={location} width={20} height={20} alt="#" />,
    },
    {
      text: "ADMIN.Brands",
      link: "/admin/brands",
      id: 7,
      icon: <Image src={BrandsAdminIcon} width={20} height={20} alt="#" />,
    },
    {
      text: "ADMIN.AboutSlider",
      link: "/admin/aboutslider",
      id: 7,
      icon: <Image src={CompanyIcon} width={20} height={20} alt="#" />,
    },
  ];
  useEffect(() => {
    setSelectedKey(router.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              {/* <Image
                src={collapsed ? site_logo_mobile : site_logo}
                alt="site-logo"
              /> */}
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
