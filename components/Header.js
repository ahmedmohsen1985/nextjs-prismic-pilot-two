import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Bounded } from "./Bounded";


export const Header = ({ altLangs, navigation, settings, currentLang }) => {
  return (
    <Bounded as="header" yPadding="sm">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none">
        <PrismicLink href="/">
          {prismicH.isFilled.image(settings.data.logo) && (
            <PrismicNextImage field={settings.data.logo} layout="fixed" />
          )}
        </PrismicLink>
        <nav>
          <ul className="flex flex-wrap gap-6 md:gap-10">
            {navigation.data?.links.map((item) => (
              <li
                key={prismicH.asText(item.label)}
                className="font-semibold tracking-tight text-slate-800"
              >
                <PrismicLink field={item.link}>
                  <PrismicText field={item.label} />
                </PrismicLink>
              </li>
            ))}
            <LanguageSwitcher altLangs={altLangs} currentLang={currentLang} />
          </ul>
        </nav>
      </div>
    </Bounded>
  );
};
