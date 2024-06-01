import React from "react";
import { Table } from "@/ui";
import Pagination from "@/ui/Pagination/Pagination";
import { ColumnsType } from "antd/es/table";
import { SelectedDataInterface } from "../Types";
import DeleteModal from "@/ui/DeleteModal";
import { useRouter } from "next/router";

interface Props {
  dataSource: any;
  columns: ColumnsType<any>;
  selectedData: SelectedDataInterface;
  setSelectedData: React.Dispatch<React.SetStateAction<SelectedDataInterface>>;
  handleSubmitDelete: () => void;
  handlePageChange?: ((page: number, pageSize: number) => void) | undefined;
  isLoading?: boolean;
  paginationVisible?: boolean;
  isPageCrud?: boolean;
  openEditModal?: (data: any) => void;
}

const AdminTableList: React.FC<Props> = ({
  dataSource,
  columns,
  selectedData,
  setSelectedData,
  handleSubmitDelete,
  handlePageChange,
  isLoading,
  paginationVisible,
  isPageCrud = true,
  openEditModal,
}: Props) => {
  const router = useRouter();

  const handleOpenEditModal = (data: any) => {
    if (openEditModal) {
      openEditModal(data);
      return;
    }
    if (isPageCrud) {
      router.push(`${router.pathname}/${data.id}`);
      return;
    }
    setSelectedData({ method: "PUT", type: "edit", data });
  };

  const handleOpenDeleteModal = (data: any) => {
    setSelectedData({ type: "delete", data });
  };

  return (
    <div>
      <Table
        dataSource={dataSource?.items ? dataSource?.items : dataSource}
        columns={columns}
        editable={true}
        handleEdit={handleOpenEditModal}
        handleDelete={handleOpenDeleteModal}
        loading={isLoading}
      />
      {paginationVisible && (
        <Pagination
          total={dataSource?.totalItems}
          pageSize={10}
          current={dataSource?.pageIndex}
          onChange={handlePageChange}
        />
      )}
      <DeleteModal
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        handleOk={handleSubmitDelete}
      />
    </div>
  );
};

export default AdminTableList;
