import React from 'react'
import EditPage from '@/Features/admin/components/EditPage/EditPage';
import LocationForm from '@/Features/admin/components/ActionForms/LocationForm/index';

const Create = () => {
   
  return (
    <div>
      <EditPage
        link="Location/"
        multipart={false}
      >
       <LocationForm/>
      </EditPage>
    </div>
  )
}

export default Create