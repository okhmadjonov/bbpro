import React from "react";
import EditPage from "@/Features/admin/components/EditPage/EditPage";
import ProjectsForm from "@/Features/admin/components/ActionForms/ProjectsForm";

const Create = () => {
  return (
    <div>
      <EditPage link="Project/" multipart={true}>
        <ProjectsForm />
      </EditPage>
    </div>
  );
};

export default Create;
