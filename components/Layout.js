//import Head from "next/head";
import { Header } from "./Header";
import { Footer } from "./Footer";
// import * as prismicH from "@prismicio/helpers";

export const Layout = ({
  altLangs,
  navigation,
  settings,
  children,
  currentLang,
  
}) => {
  return (
    <div className="text-slate-800">
      <Header
        altLangs={altLangs}
        currentLang={currentLang}
        navigation={navigation}
        settings={settings}
      />
      <main>{children}</main>
      <Footer settings={settings} />
    </div>
  );
};
