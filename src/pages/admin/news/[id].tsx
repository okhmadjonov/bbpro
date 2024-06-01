import React, { useState, useEffect } from "react";
import EditPage from "@/Features/admin/components/EditPage/EditPage";
import { useRouter } from "../../../../node_modules/next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";
import NewsForm from "@/Features/admin/components/ActionForms/NewsForm/index";
import { Card } from "antd";
import {
  LocaleStringsInterface,
  SelectedDataInterface,
} from "@/Components/Types";
import { useLocale } from "use-intl";
import StaticsModal from "@/Features/admin/components/ActionModals/StaticsModal";
import SubContentForm from "@/Features/admin/components/ActionForms/SubContentForm";
import AdminEditButton from "@/Components/AdminEditButton";
import SubContentModal from "@/Features/admin/components/ActionModals/SubContentModal";
import { Button } from "@/ui";

const Edit = () => {
  const router = useRouter();
  const slug = router?.query?.id;
  const [data, setData] = useState<any>();
  const locale = useLocale();

  const { refetch: getOneData } = useQueryApiClient({
    request: {
      url: `News/${slug}`,
      method: "GET",
      disableOnMount: true,
    },
    onSuccess(res) {
      setData(res.data);
    },
  });

  useEffect(() => {
    if (slug) {
      getOneData();
    }
  }, [slug]);

  return (
    <div>
      <EditPage link="News/" data={data} multipart={true}>
        <NewsForm data={data} />
      </EditPage>
    </div>
  );
};

export default Edit;
