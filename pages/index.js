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
  return <input {...props} className="w-full rounded border border-zink-300 bg-zinc-100 py-3 pl-3 pr-10 text-black placeholder-slate-400" />

}

function SubmitButton(props) {
  return <button {...props} className="btn btn-wide mt-5" ></button>
}

function FieldWrapper(props) {
  return <div {...props} className="pt-3 pb-3 customInput" ></div>
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
    return <div class="alert alert-success bg-green-400 text-white shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Thank you! Your response has been recorded.</span>
      </div>
    </div>;
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
