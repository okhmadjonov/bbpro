import React, { useState, useEffect } from "react";
import EditPage from "@/Features/admin/components/EditPage/EditPage";
import { useRouter } from "../../../../node_modules/next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useLocale } from "use-intl";
import ProjectsForm from "@/Features/admin/components/ActionForms/ProjectsForm";

const Edit = () => {
  const router = useRouter();
  const slug = router?.query?.id;
  const [data, setData] = useState<any>();
  const locale = useLocale();

  const { refetch: getOneData } = useQueryApiClient({
    request: {
      url: `Project/${slug}`,
      method: "GET",
      disableOnMount: true,
    },
    onSuccess(res) {
      setData(res.data);
      console.log("One data: ", res.data);
    },
  });

  useEffect(() => {
    if (slug) {
      getOneData();
    }
  }, [slug]);

  return (
    <div>
      <EditPage link="Project/" data={data} multipart={true}>
        <ProjectsForm data={data} />
      </EditPage>
    </div>
  );
};

export default Edit;
