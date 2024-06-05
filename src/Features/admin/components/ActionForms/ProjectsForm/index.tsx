import React from "react";
import LanguageFormList from "@/ui/LanguageFormList/LanguageFormList";
import { RichTextarea, Upload } from "@/ui";
import { useTranslations } from "next-intl";

interface Props {
  data?: any;
}

const ProjectsForm = ({ data }: Props) => {
  const t = useTranslations("ADMIN");
  return (
    <div>
      <LanguageFormList listName="title" />
      <LanguageFormList inputType="textarea" listName="description" />
    </div>
  );
};

export default ProjectsForm;
