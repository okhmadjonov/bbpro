import React, { useState, useEffect } from "react";
import EditPage from "@/Features/admin/components/EditPage/EditPage";
import { useRouter } from "../../../../node_modules/next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";
import LocationForm from "@/Features/admin/components/ActionForms/LocationForm/index";

const Edit = () => {
  const router = useRouter();
  const slug = router?.query?.id;
  const [data, setData] = useState<any>({});

  const { isLoading: getOneLoading, refetch: getOneData } = useQueryApiClient({
    request: {
      url: `Location/${slug}`,
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
      <EditPage link="Location/" data={data} multipart={false}>
        <LocationForm />
      </EditPage>
    </div>
  );
};

export default Edit;
