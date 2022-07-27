import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import { createClient } from "../prismicio";
import { components } from "../slices";
import { Layout } from "../components/Layout";
import * as prismicH from "@prismicio/helpers";

const Page = ({ doc, navigation, settings }) => {
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
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", params.uid, { lang: locale });
  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });

  return {
    props: {
      doc: page,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page", { lang: "*" });

  return {
    paths: pages.map((page) => {
      return {
        params: { uid: page.uid },
        locale: page.lang,
      };
    }),
    fallback: false,
  };
}
