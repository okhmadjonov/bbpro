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

const OrdersPage = () => {
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
      title: t("Name"),
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => <div>{record.name}</div>,
    },
    {
      title: t("Phone"),
      dataIndex: "phone",
      key: "phone",
      render: (text: string, record: any) => <div>{record.phone}</div>,
    },
    {
      title: t("Email"),
      dataIndex: "email",
      key: "email",
      render: (text: string, record: any) => <div>{record.email}</div>,
    },
    {
      title: t("Message"),
      dataIndex: "message",
      key: "message",
      render: (text: string, record: any) => <div>{record.message}</div>,
    },
  ];

  const handleSubmitDelete = () => {
    deleteRefetch();
  };

  const handleOpenCreateModal = () => {
    router.push("/admin/orders/create");
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setQuery({ PageSize: pageSize, PageIndex: page });
  };

  const {
    data: projectsApiResponse,
    isLoading,
    appendData,
  } = useQueryApiClient({
    request: {
      url: "/Order",
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
        url: `/Order/${selectedData?.data?.id}`,
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
        <h1>{t("Orders")}</h1>
      </div>
      <AdminTableList
        columns={columns}
        dataSource={projectsApiResponse?.data}
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

export default OrdersPage;
