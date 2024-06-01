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
import { BASE_URL } from "@/services/api";

const AboutSliderPage = () => {
  const t = useTranslations('ADMIN')
  const locale = useLocale();
  const [selectedData, setSelectedData] = useState<SelectedDataInterface>({
    type: "default",
    data: {},
  });

  const columns = [
    {
      title: 'Images',
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <div>
          <img src={`${BASE_URL}/${record.imageUrl}`} alt="" width="100px" height="50px"/>
        </div>
      ),
    },
  ];

  const handleSubmitDelete = () => {
    deleteRefetch();
  };

  const router = useRouter();
  const handleOpenCreateModal = () => {
    router.push('/admin/aboutslider/create');
  };

  const {
    data: newsApiResponse,
    isLoading,
    refetch: refetchGetApi,
  } = useQueryApiClient({
    request: {
      url: "/AboutSlider",
      method: "GET",
    },
  });

  const { refetch: deleteRefetch, isLoading: deleteIsLoading } =
    useQueryApiClient({
      request: {
        url: `/AboutSlider/${selectedData?.data?.id}`,
        method: "DELETE",
      },
      onSuccess() {
        setSelectedData({ type: "default", data: {} });
        refetchGetApi();
      },
    })
  return (
    <div>
      <div className="admin_page_title">
        <h1>{t("AboutSlider")}</h1>
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

export default AboutSliderPage;
