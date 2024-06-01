import AdminTableList from "@/Components/AdminTableList";
import {
  LocaleStringsInterface,
  SelectedDataInterface,
} from "@/Components/Types";
import { Button, Table } from "@/ui";
import DeleteModal from "@/ui/DeleteModal";
import Pagination from "@/ui/Pagination/Pagination";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";
import SpecificationsModal from "../ActionModals/SpecificationsModal";

const SpecificationPage = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [selectedData, setSelectedData] = useState<SelectedDataInterface>({
    type: "default",
    data: {},
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "key",
      key: "key",
      render: (text: string, record: any) => (
        <div>{record?.key[locale as keyof LocaleStringsInterface]}</div>
      ),
    },
  ];

  const handleSubmitDelete = () => {
    deleteRefetch();
  };

  const handleOpenCreateModal = () => {
    setSelectedData({ method: "POST", type: "create" });
  };

  const {
    data: newsApiResponse,
    isLoading,
    refetch: refetchGetApi,
  } = useQueryApiClient({
    request: {
      url: "/TechCharacter",
      method: "GET",
    },
  });

  const { refetch: deleteRefetch, isLoading: deleteIsLoading } =
    useQueryApiClient({
      request: {
        url: `/TechCharacter/${selectedData?.data?.id}`,
        method: "DELETE",
      },
      onSuccess() {
        setSelectedData({ type: "default", data: {} });
        refetchGetApi();
      },
    });
  const handleBackButtonClick = () => {
    router.back();
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={handleBackButtonClick}
        label={t("Back")}
      ></Button>
      <div className="admin_page_title">
        <h1>Specifications</h1>
        <div className="btn_group">
          <Button
            onClick={handleOpenCreateModal}
            size="middle"
            label="Create"
          />
        </div>
      </div>
      <AdminTableList
        columns={columns}
        dataSource={newsApiResponse.data}
        handleSubmitDelete={handleSubmitDelete}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        isLoading={isLoading || deleteIsLoading}
        isPageCrud={false}
      />
      <SpecificationsModal
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        refetch={refetchGetApi}
      />
    </div>
  );
};

export default SpecificationPage;
