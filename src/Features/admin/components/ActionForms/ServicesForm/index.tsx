import React from "react";
import LanguageFormList from "@/ui/LanguageFormList/LanguageFormList";
import { RichTextarea, Select, SelectOption, Upload } from "@/ui";
import { useLocale, useTranslations } from "next-intl";
import useQueryApiClient from "@/utils/useQueryApiClient";

interface Props {
  data?: any;
}

const ServicesForm = ({ data }: Props) => {
  const t = useTranslations("ADMIN");
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
            {item.title}
            {/* {item.title[locale as keyof LocaleStringsInterface]} */}
          </SelectOption>
        ))}
      </Select>
      <LanguageFormList listName="title" />
      <LanguageFormList inputType="textarea" listName="description" />
    </div>
  );
};

export default ServicesForm;
