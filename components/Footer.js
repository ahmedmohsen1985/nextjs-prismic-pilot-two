import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react";
//import * as prismicH from "@prismicio/helpers";

import { Bounded } from "./Bounded";
//import { Heading } from "./Heading";


export const Footer = ({ settings }) => {
  return (
    <Bounded as="footer" className="bg-gray-800 pb-12 text-slate-300 md:pb-12">
      <div className="grid grid-cols-1 justify-items-center gap-20 md:gap-24">
        <div className="mx-auto w-full max-w-3xl text-center text-xs font-semibold tracking-tight">
          Proudly published using{" "}
          <PrismicLink href="https://prismic.io" className="text-white">
            Prismic
          </PrismicLink>
        </div>
      </div>
    </Bounded>
  );
};
