import { useTranslations } from "next-intl";
import React from "react";

const Admin = () => {
  const t = useTranslations("ADMIN");
  return <div>{t("Welcome")}</div>;
};

export default Admin;
