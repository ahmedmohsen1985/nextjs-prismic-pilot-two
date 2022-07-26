import { PrismicLink } from "@prismicio/react";
//import * as prismicH from "@prismicio/helpers";

import React from 'react';
import { formium } from '../lib/formium';
//import { FormiumForm } from '@formium/react';

import { Bounded } from "./Bounded";
//import { Heading } from "./Heading";


export async function getStaticProps(context) {
  const form = await formium.getFormBySlug('registration-form');
  return { props: { form } };
}

export const Footer = ({ form }) => {
  
  console.log(form)

  // const [success, setSuccess] = React.useState(false);
  // if (success) {
  //   return <div>Thank you! Your response has been recorded.</div>;
  // }

  return (
    <Bounded as="footer" className="bg-gray-800 pb-12 text-slate-300 md:pb-12">
      <div className="grid grid-cols-1 justify-items-center gap-20 md:gap-24">
      {/* <FormiumForm data={form}
            onSubmit={async (values) => {
              await formium.submitForm('registration-form', values);
              setSuccess(true);
            }}
        /> */}
        <div className="mx-auto w-full max-w-3xl text-center text-xs font-semibold tracking-tight">
          Proudly published using{" "}
          <PrismicLink href="#" className="text-white">
            Prismic
          </PrismicLink>
        </div>
      </div>
    </Bounded>
  );
};
