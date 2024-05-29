import React, { FC } from "react";
import { IGoToBack } from "@/Components/Types";
import Link from "next/link";
import SvgSelector from "@/Assets/Icons/SvgSelector";
import { Breadcrumb, ConfigProvider } from "antd";
import { useTranslations } from "next-intl";

const GoToBack: FC<IGoToBack> = ({ pathArr, styles = {color: ''} }) => {
  const t = useTranslations("GlobalKeyWords");
  const arr = [{ title: <Link href={"/"}>{t("main")}</Link> }];

  pathArr.map((el:any) => {
    arr.push({ title: el.path ? <Link style={{cursor: el.path ? 'pointer' : "default"}} href={el.path}>{el.titleNotr ? el.titleNotr : t(el.title)}</Link>  : <p>{el.titleNotr ? el.titleNotr : t(el.title)}</p>});
  });

  return (
    <div className="go_to_back" data-aos="fade-up">
      <ConfigProvider
        theme={{
          components: {
            Breadcrumb: {
              linkColor: styles?.color|| "rgba(79, 79, 79, 1)",
              linkHoverColor: styles?.color ||"rgba(2, 96, 101, 1)",
            },
          },
          token: {
            colorText: styles?.color || "rgba(79, 79, 79, 1)",
            colorBgTextHover: "none",
            fontSize: 16,
          },
        }}
      >
        <Breadcrumb
          separator={
            <SvgSelector className={"breadcrumb_icon"} id={"chevron-svg"} />
          }
          items={arr}
        />
      </ConfigProvider>
    </div>
  );
};

export default GoToBack;
