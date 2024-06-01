import React, { useState, useEffect } from 'react';
import LanguageFormList from "@/ui/LanguageFormList/LanguageFormList";
import { Upload } from "@/ui";
import { Input } from '@/ui/index';
import { useTranslations } from 'use-intl';

interface Props {
    data?: any;
}

const OurteamForm = ({ data }: Props) => {
  const t = useTranslations("ADMIN")
  return (
    <div>        
        <Input label={t("Fullname")} name="fullname"/>
        <LanguageFormList listName="position"/>
    </div>
  )
}

export default OurteamForm


