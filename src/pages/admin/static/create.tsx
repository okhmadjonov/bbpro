import React from 'react'
import EditPage from '@/Features/admin/components/EditPage/EditPage';
const Create = () => {
   
  return (
    <div>
      <EditPage
        link="AboutUs/" 
      >
       <AboutUsForm/>
      </EditPage>
    </div>
  )
}

export default Create