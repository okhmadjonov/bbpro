import React from "react";
import LanguageFormList from "@/ui/LanguageFormList/LanguageFormList";
import { Input } from '@/ui/index';
import { useTranslations } from 'next-intl';
import { Form } from 'antd';
import PhoneList from "@/Components/AdminPhoneList/index";

interface Props {
    data?: any;
}

const LocationForm = ({ data }: Props) => {
  const t = useTranslations('ADMIN')
  return (
    <div>
        {data?.mapFrame ? (
          <iframe
            src={data.mapFrame}
            width="500"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        ) : (
          <Input label={t("Link")} name="mapFrame" type="text"/>
        )}
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

        <Input label={t("Email")} name="email" type="email" rules={[{ required: true, message: 'Please input your username!' }]}/>
        <LanguageFormList listName="workDay"/>
        <LanguageFormList listName="weekend"/>
    </div>
  );
};

export default LocationForm;
