import AdminTableList from "@/Components/AdminTableList";
import {
  LocaleStringsInterface,
  SelectedDataInterface,
} from "@/Components/Types";
import { Button } from "@/ui";
import { smoothScroll } from "@/utils/smoothScroll";
import useQueryApiClient from "@/utils/useQueryApiClient";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, useTransition } from "react";
import { useLocale, useTranslations } from "use-intl";

const ServicesPage = () => {
  const t = useTranslations("ADMIN");
  const locale = useLocale();
  const router = useRouter();

  const [query, setQuery] = useState({ PageSize: 10, PageIndex: 1 });
  const [selectedData, setSelectedData] = useState<SelectedDataInterface>({
    type: "default",
    data: {},
  });

  const columns = [
    {
      title: t("Title"),
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <div>{record.title[locale as keyof LocaleStringsInterface]}</div>
      ),
    },
    {
      title: t("Description"),
      dataIndex: "description",
      key: "description",
      render: (text: string, record: any) => (
        <div>{record.description[locale as keyof LocaleStringsInterface]}</div>
      ),
    },
  ];

  const handleSubmitDelete = () => {
    deleteRefetch();
  };

  const handleOpenCreateModal = () => {
    router.push("/admin/services/create");
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setQuery({ PageSize: pageSize, PageIndex: page });
  };

  const {
    data: solutionsApiResponse,
    isLoading,
    appendData,
  } = useQueryApiClient({
    request: {
      url: "/Solution",
      method: "GET",
      disableOnMount: true,
    },
    onSuccess() {
      smoothScroll("top", 0);
    },
  });

  const { refetch: deleteRefetch, isLoading: deleteIsLoading } =
    useQueryApiClient({
      request: {
        url: `/Solution/${selectedData?.data?.id}`,
        method: "DELETE",
      },
      onSuccess() {
        setSelectedData({ type: "default", data: {} });
        appendData(query);
      },
    });

  useEffect(() => {
    appendData(query);
  }, [query]);

  return (
    <div>
      <div className="admin_page_title">
        <h1>{t("ServicesPage")}</h1>
        <Button
          onClick={handleOpenCreateModal}
          size="middle"
          label={t("Create")}
        />
      </div>
      <AdminTableList
        columns={columns}
        dataSource={solutionsApiResponse?.data}
        handleSubmitDelete={handleSubmitDelete}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        isLoading={isLoading || deleteIsLoading}
        handlePageChange={handlePageChange}
        paginationVisible={true}
      />
    </div>
  );
};

export default ServicesPage;
