import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";
import { Layout } from "../components/Layout";

import React from 'react';
import { formium } from '../lib/formium';
import { FormiumForm, defaultComponents } from '@formium/react';

function TextInput(props) {
   return <input {...props} className="w-full rounded border border-slate-500 bg-slate-600 py-3 pl-3 pr-10 text-white placeholder-slate-400" />
   
}

function SubmitButton(props) {
  return <button {...props} className="btn-primary" ></button>  
}

function FieldWrapper(props) {
  return <div {...props} className="pt-3 pb-3" ></div>  
}


const customForm = {
   ...defaultComponents,
   TextInput,
   SubmitButton,
   FieldWrapper,
}



const Index = ({ doc, navigation, settings, form }) => {
  
  const [success, setSuccess] = React.useState(false);
  if (success) {
    return <div>Thank you! Your response has been recorded.</div>;
  }

  return (
    <Layout
      altLangs={doc.alternate_languages}
      currentLang={doc.lang}
      navigation={navigation}
      settings={settings}
    >
      
      <Head>
        <title>{prismicH.asText(doc.data.title)}</title>
      </Head>
      
      <SliceZone slices={doc.data.slices} components={components} />
      <div className="flex justify-center pt-36 pb-36 formContainer">
          <div className="w-2/4">
            <h1>Contact Us</h1>
            <FormiumForm 
              components={customForm}
              data={form}
              onSubmit={async (values) => {
                await formium.submitForm('registration-form', values);
                setSuccess(true);
              }}
            />
          </div>
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "home", { lang: locale });
  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });
  const form = await formium.getFormBySlug('registration-form');

  return {
    props: {
      doc: page,
      navigation,
      settings,
      form,
    },
  };
}
