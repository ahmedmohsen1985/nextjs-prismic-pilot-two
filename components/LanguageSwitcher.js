//import { useRouter } from 'next/router'

import { PrismicLink } from "@prismicio/react";
import { linkResolver } from "../prismicio";


const LangIcon = ({ lang }) => {
  const code = lang.substring(3).toLowerCase();
  return <span className={`fi fi-${code}`} />;
};


export const LanguageSwitcher = ({ altLangs = [] }) => {

  // const router = useRouter()

  // const onSelectChange = (e) => {
  //   const locale = e.target.value;
  //   router.push(router.asPath, router.asPath, {
  //     locale,
  //     scroll: false
  //   })
  // }

  return (
    <ul className="-ml-4 -mt-4 flex flex-wrap">
      {altLangs.map((altLang) => {
        return (
          <li key={altLang.lang} className="pl-4 pt-4">
            <PrismicLink href={linkResolver(altLang)} locale={altLang.lang}>
              <span className="sr-only">{altLang.lang}</span>
              <LangIcon lang={altLang.lang} />
            </PrismicLink>
          </li>
        );
      })}
    </ul>
  );
};

// <li>
//   <select name="languages" onChange={onSelectChange}>
//     {altLangs.map((altLang) => (
//       <option key={altLang.lang} value={altLang.lang}>
//         {altLang.lang}
//       </option>
//     ))}
//   </select>
// </li>

//   <ul className="-ml-4 -mt-4 flex flex-wrap">
//   {altLangs.map((altLang) => {
//     return (
//       <li key={altLang.lang}  className="pl-4 pt-4">
//         <PrismicLink href={linkResolver(altLang)} locale={altLang.lang}>
//           <span className="sr-only">{altLang.lang}</span>
//           <LangIcon lang={altLang.lang} />
//         </PrismicLink>
//       </li>
//     );
//   })}
// </ul>

export default LanguageSwitcher;