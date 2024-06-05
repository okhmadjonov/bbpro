import React from "react";
import EditPage from "@/Features/admin/components/EditPage/EditPage";
import NewsForm from "@/Features/admin/components/ActionForms/NewsForm/index";

const Create = () => {
  return (
    <div>
      <EditPage link="News/" multipart={true}>
        <NewsForm />
      </EditPage>
    </div>
  );
};

export default Create;
