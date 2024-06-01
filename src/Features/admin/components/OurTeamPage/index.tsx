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
import { useRouter } from 'next/router';
import useQueryApiClient from "@/utils/useQueryApiClient";

const OurTeamPage = () => {
  const t = useTranslations('ADMIN')
  const locale = useLocale();
  const [selectedData, setSelectedData] = useState<SelectedDataInterface>({
    type: "default",
    data: {},
  });

  const columns = [
    {
      title: t("Fullname"),
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <div>{record.fullname}</div>
      ),
    },
    {
      title: t("Description"),
      dataIndex: "description",
      key: "description",
      render: (text: string, record: any) => (
        <div>{record.position[locale as keyof LocaleStringsInterface]}</div>
      ),
    },
  ];

  const handleSubmitDelete = () => {
    deleteRefetch();
  };

  const router = useRouter();
  const handleOpenCreateModal = () => {
    router.push('/admin/ourteam/create');
  };

  const {
    data: newsApiResponse,
    isLoading,
    refetch: refetchGetApi,
  } = useQueryApiClient({
    request: {
      url: "/OurTeam",
      method: "GET",
    },
  });

  const { refetch: deleteRefetch, isLoading: deleteIsLoading } =
    useQueryApiClient({
      request: {
        url: `/OurTeam/${selectedData?.data?.id}`,
        method: "DELETE",
      },
      onSuccess() {
        setSelectedData({ type: "default", data: {} });
        refetchGetApi();
      },
    });

  return (
    <div>
      <div className="admin_page_title">
        <h1>{t("OurTeamPage")}</h1>
        <Button onClick={handleOpenCreateModal} size="middle" label={t("Create")} />
      </div>
      <AdminTableList
        columns={columns}
        dataSource={newsApiResponse.data}
        handleSubmitDelete={handleSubmitDelete}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        isLoading={isLoading || deleteIsLoading}
      />

    </div>
  );
};

export default OurTeamPage;
