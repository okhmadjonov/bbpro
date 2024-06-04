import AdminEditButton from "@/Components/AdminEditButton";
import {
  LocaleStringsInterface,
  SelectedDataInterface,
} from "@/Components/Types";
import { Button } from "@/ui";
import DeleteModal from "@/ui/DeleteModal";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { Card } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useLocale } from "use-intl";

const Subcontent = () => {
  const locale = useLocale();
  const router = useRouter();
  const [selectedData, setSelectedData] = useState<SelectedDataInterface>({
    type: "default",
  });
  const [data, setData] = useState<any>();
  const slug = router?.query?.id;

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
  const { refetch: deleteRefetch, isLoading: deleteIsLoading } =
    useQueryApiClient({
      request: {
        url: `/News/sub-content?id=${selectedData?.data?.id}`,
        method: "DELETE",
      },
      onSuccess() {
        setSelectedData({ type: "default", data: {} });
        getOneData();
      },
    });

  useEffect(() => {
    if (slug) {
      getOneData();
    }
  }, [slug]);

  const handleBackButtonClick = () => {
    router.back();
  };
  const handleOpenEditModal = (data: any) => {
    setSelectedData({ type: "edit", data, method: "PUT" });
  };

  const handleOpenCreateModal = () => {
    setSelectedData({ type: "edit", method: "POST" });
  };
  const handleOpenDeleteModal = (data: any) => {
    setSelectedData({ type: "delete", data });
  };

  return (
    <div>
      <Button
        type="primary"
        size="small"
        onClick={handleBackButtonClick}
        label="Back"
      />
      <div className="title_sub_content">
        <h2>Sub Content</h2>
        <Button label="Create" size="small" onClick={handleOpenCreateModal} />
      </div>
      <div className="subcontent">
        {data?.newsSubContent?.map((item: any) => (
          <Card
            key={item.id}
            title={
              <div className="sub_content_card_title">
                <span>
                  {item?.subtitle[locale as keyof LocaleStringsInterface]}
                </span>
                <div className="sub_content_action_btn">
                  <AdminEditButton onClick={() => handleOpenEditModal(item)} />
                  <AdminEditButton
                    onClick={() => handleOpenDeleteModal(item)}
                    type="delete"
                  />
                </div>
              </div>
            }
          ></Card>
        ))}
      </div>

      <DeleteModal
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        handleOk={deleteRefetch}
      />
    </div>
  );
};

export default Subcontent;
