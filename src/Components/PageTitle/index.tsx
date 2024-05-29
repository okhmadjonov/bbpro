import React, { useEffect, useState } from "react";
import styles from "./PageTitle.module.scss";
import { PageTitleProps } from "@/Components/Types/index";
import { useRouter } from "next/router";
import { useTranslations } from "use-intl";

function PageTitle(props: PageTitleProps) {
  const [title, setTitle] = useState<string>("");
  const t = useTranslations("GlobalKeyWords");
  const router = useRouter();
  useEffect(() => {
    if (props.title) {
      setTitle(props.title);
      return;
    }
    const path = router.pathname.replace("/", "");
    setTitle(path);
  }, [router.pathname]);

  return (
    <div className={styles.page__title} data-aos="fade-up">
      <h1>{t(title)}</h1>
    </div>
  );
}

export default PageTitle;
