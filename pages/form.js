import {  } from "@prismicio/react";
import React from 'react';
import { formium } from '../lib/formium';
import { FormiumForm } from '@formium/react';

export async function getStaticProps(context) {
  const form = await formium.getFormBySlug('registration-form');
  return { props: { form } };
}
export default function MyPage({ form }) {
    //console.log(form)

    const [success, setSuccess] = React.useState(false);
    if (success) {
      return <div>Thank you! Your response has been recorded.</div>;
    }
    
  return (
    <div>
      <h1>My first Formium form</h1>
      <FormiumForm data={form}
            onSubmit={async (values) => {
              await formium.submitForm('registration-form', values);
              setSuccess(true);
            }}
        />
    </div>
  )
}