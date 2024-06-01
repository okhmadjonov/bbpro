import React from "react";
import LanguageFormList from "@/ui/LanguageFormList/LanguageFormList";

interface Props {
  data?: any;
}

const AboutForm = ({ data }: Props) => {
  return (
    <div>
      <LanguageFormList listName="title" />
      <LanguageFormList inputType="richTextarea" listName="description" />
    </div>
  );
};

export default AboutForm;
