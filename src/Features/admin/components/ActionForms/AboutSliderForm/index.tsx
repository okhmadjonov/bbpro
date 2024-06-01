import React, { useState, useEffect } from 'react';
import LanguageFormList from "@/ui/LanguageFormList/LanguageFormList";
import { Upload } from "@/ui";
import { Input } from '@/ui/index';
import { useTranslations } from 'use-intl';

interface Props {
    data?: any;
}

const BrandsForm = ({ data }: Props) => {
  const t = useTranslations("ADMIN")
  return (
    <div>
        <Upload
          name="imageUrl"
          btnLabel={t("Upload")}
          imageUrl={data?.imageUrl}
        />
    </div>
  )
}

export default BrandsForm