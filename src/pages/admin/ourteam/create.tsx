import React from 'react'
import EditPage from '@/Features/admin/components/EditPage/EditPage';
import OurteamForm from '@/Features/admin/components/ActionForms/OurteamForm/index';

const Create = () => {
   
  return (
    <div>
      <EditPage
        link="OurTeam/"
        multipart={true}
      >
       <OurteamForm/>
      </EditPage>
    </div>
  )
}

export default Create