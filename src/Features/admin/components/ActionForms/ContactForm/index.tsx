import React from 'react';
import LanguageFormList from "@/ui/LanguageFormList/LanguageFormList";
import { Input } from '@/ui/index';
import { Form } from 'antd';
import PhoneList from '@/Components/AdminPhoneList/index';

interface Props {
    data?: any;
}

const ContactForm = ({ data }: Props) => {
  return (
    <div>
        <Input label="Maplink:" name="mapFrame" type="text"/>
        <Input label="Title:" name="title" type="text"/>
        <LanguageFormList listName="address" />
        <Form.List
          name="phone"
          initialValue={data?.phone}
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(new Error('At least 2 passengers'));
                }
              },
            },
          ]}  
        >
          {(fields: any, { add, remove }) => (
            <PhoneList
              fields={fields}
              add={add}
              remove={(index) => remove(Number(index))}
            />
          )}
        </Form.List>


        <Input label="Email:" name="email" type="email" rules={[{ required: true, message: 'Please input your username!' }]}/>
        <LanguageFormList listName="workDay"/>
        <LanguageFormList listName="weekend"/>
    </div>
  );
}

export default ContactForm;
