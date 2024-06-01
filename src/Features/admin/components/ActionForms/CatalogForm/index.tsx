import React, { useState, useEffect } from 'react';
import LanguageFormList from "@/ui/LanguageFormList/LanguageFormList";
import { Upload } from "@/ui";
import { useTranslations } from 'next-intl';

interface Props {
    data?: any;
}

const CatalogForm = ({ data }: Props) => {
  const t = useTranslations('ADMIN')
  return (
    <div>
        <LanguageFormList listName="title" />
    </div>
  )
}

export default CatalogForm