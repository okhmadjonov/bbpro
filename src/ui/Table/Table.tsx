import React, { useEffect, useState } from "react";
import { ColumnsType, TableLocale } from "antd/lib/table/interface";
import { Table as AntdTable } from "antd";
import {
  FilterValue,
  Key,
  SortOrder,
  TablePaginationConfig,
  TableRowSelection,
} from "antd/es/table/interface";
import useQueryApiClient from "@/utils/useQueryApiClient";
import Link from "next/link";
import { Button } from "..";
import { useTranslations } from "next-intl";

type TypeType = "page" | "prev" | "next" | "jump-prev" | "jump-next";

export type TableFilterType = {
  pageIndex: number;
  pageSize: number;
  options?: any[];
  sortBy?: string;
  orderBy?: string;
  dateFrom?: string;
  dateTo?: string;
  email?: string;
  modules?: string;
};

export interface TableProps {
  locale?: TableLocale;
  loading?: boolean;
  rowKey?: string;
  saveData?: any;
  columns: ColumnsType<any>;
  dataSource?: object[];
  size?: "small" | "large" | "middle";
  rowClassName?: string;
  onRow?: any;
  onChange?: any;
  disablePagination?: boolean;
  components?: any;
  scroll?: any;
  linkProps?: {
    url: string;
    recordKey?: string;
  };
  url?: string;
  filter?: TableFilterType;
  defaultSort?: string;
  enableSelectedRow?: boolean;
  reload?: number;
  setSelectedRows?: any;
  setSelectedKeys?: any;
  rowSelectionFunction?: TableRowSelection<any>;
  pagination?: TablePaginationConfig;
  editable?: boolean;
  handleDelete?: (data: any) => void;
  handleEdit?: (data: any) => void;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex?: string;
  record: any;
  className: string;
  colSpan?: number;
}

interface SorterResult {
  order?: SortOrder;
  field?: string;
  columnKey?: Key;
}

export const Table = ({
  locale,
  loading,
  rowKey = "id",
  columns,
  dataSource,
  size,
  rowClassName,
  saveData,
  onRow,
  onChange,
  disablePagination,
  components,
  scroll,
  linkProps,
  url,
  filter,
  defaultSort = "",
  enableSelectedRow,
  reload,
  setSelectedRows,
  setSelectedKeys,
  rowSelectionFunction,
  editable,
  handleDelete,
  handleEdit,
}: TableProps) => {
  const EditableCell: React.FC<EditableCellProps> = ({
    record,
    children,
    className,
    ...rest
  }) => {
    // actions dont have link
    if (rest.dataIndex === "id" || rest.dataIndex === undefined) {
      return (
        <td className={className} colSpan={rest.colSpan}>
          {children}
        </td>
      );
    }

    let parsedProps = {
      url: linkProps?.url,
      recordKey: linkProps?.recordKey,
    };

    //default key is id
    if (!parsedProps?.recordKey) {
      parsedProps.recordKey = "id";
    }

    // for data not found
    if (rest.colSpan) {
      parsedProps.url = undefined;
    }

    if (!linkProps?.url) {
      return (
        <td className={className} colSpan={rest.colSpan}>
          {children}
        </td>
      );
    }

    return (
      <td className={className + " history-clickable"} colSpan={rest.colSpan}>
        <Link
          href={linkProps.url.replace(
            ":id",
            record?.[parsedProps.recordKey] || "undefined"
          )}
        >
          {children}
        </Link>
      </td>
    );
  };
  const t = useTranslations("ADMIN");
  const parsedColumns = columns.map((col: any) => {
    if (components) {
      return { ...col };
    }

    return {
      ...col,
      onCell: (record: object) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: object) => {
      setSelectedRows && setSelectedRows(selectedRows);
      setSelectedKeys && setSelectedKeys(selectedRowKeys);
    },
  };

  const updatedColumns = [
    ...parsedColumns, // Include existing columns
    {
      dataIndex: "edit",
      key: "edit",
      render: (_: any, record: any) => (
        <div className="table_action_btn">
          {handleEdit && (
            <Button
              size="small"
              onClick={() => handleEdit(record)}
              label={t("Edit")}
            />
          )}
          {handleDelete && (
            <Button
              size="small"
              onClick={() => handleDelete(record)}
              label={t("Delete")}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <AntdTable
        locale={locale}
        loading={loading}
        rowKey={rowKey}
        columns={editable ? updatedColumns : parsedColumns}
        dataSource={dataSource}
        size={size}
        rowClassName={rowClassName}
        onRow={onRow}
        pagination={false}
        onChange={onChange}
        components={{
          body: {
            cell: EditableCell,
          },
          ...components,
        }}
        showSorterTooltip={false}
        scroll={scroll}
        rowSelection={
          enableSelectedRow ? rowSelectionFunction ?? rowSelection : undefined
        }
        className="antd_table"
      />
    </>
  );
};
