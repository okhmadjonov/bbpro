import React, { useState, useEffect } from "react";
import LanguageFormList from "@/ui/LanguageFormList/LanguageFormList";
import { Select, SelectOption, Upload } from "@/ui";
import { useLocale, useTranslations } from "next-intl";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { LocaleStringsInterface } from "@/Components/Types";

const ProductsForm = () => {
  const locale = useLocale();
  const { data: categoryRes, isLoading } = useQueryApiClient({
    request: {
      url: "/Category",
      method: "GET",
    },
  });

  return (
    <div>
      <label className="language_label">Select Category</label>
      <Select
        rules={[
          {
            required: true,
            message: `Please Select category!`,
          },
        ]}
        name={"categoryId"}
        loading={isLoading}
      >
        {categoryRes?.data?.map((item: any) => (
          <SelectOption key={item.id}>
            {item.title[locale as keyof LocaleStringsInterface]}
          </SelectOption>
        ))}
      </Select>
      <LanguageFormList listName="title" />
      <LanguageFormList inputType="richTextarea" listName="description" />
      <LanguageFormList inputType="richTextarea" listName="subDescription" />
      <LanguageFormList inputType="richTextarea" listName="applicationArea" />
    </div>
  );
};

export default ProductsForm;
