import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";
import { Layout } from "../components/Layout";

import React from 'react';
import { formium } from '../lib/formium';
import { FormiumForm } from '@formium/react';

const Index = ({ doc, navigation, settings, form }) => {

  const [success, setSuccess] = React.useState(false);
  if (success) {
    return <div>Thank you! Your response has been recorded.</div>;
  }

  return (
    <Layout
      altLangs={doc.alternate_languages}
      navigation={navigation}
      settings={settings}
    >
      
      <Head>
        <title>{prismicH.asText(doc.data.title)}</title>
      </Head>
      
      <SliceZone slices={doc.data.slices} components={components} />
      <div className="flex justify-center pt-36 pb-36">
          <FormiumForm data={form}
            onSubmit={async (values) => {
              await formium.submitForm('registration-form', values);
              setSuccess(true);
            }}
          />
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
