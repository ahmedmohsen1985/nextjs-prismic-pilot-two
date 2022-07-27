import { useRouter } from 'next/router'

import { PrismicLink } from "@prismicio/react";
import { linkResolver } from "../prismicio";


const LangIcon = ({ lang }) => {
  const code = lang.substring(3).toLowerCase();
  return <span className={`fi fi-${code}`} />;
};

export const LanguageSwitcher = ({ altLangs = [], currentLang }) => {

  const router = useRouter()

  const onSelectChange = (e) => {
    const locale = e.target.value;
    router.push(router.asPath, router.asPath, {
      locale,
      scroll: false
    })
  }
  
  return (
    <li>
      <div className="dropdown dropdown-hover">
        <label className="btn m-1"><LangIcon lang={currentLang} /></label>
        <ul className="menu dropdown-content p-1 shadow bg-base-100 rounded-box bg-zinc-100" onChange={onSelectChange}>
          {altLangs.map((altLang) => (
            <li key={altLang.lang} >
              <PrismicLink href={linkResolver(altLang)} locale={altLang.lang} className='text-center'>
                <span className="sr-only">{altLang.lang}</span>
                <LangIcon lang={altLang.lang} className='m-auto m-0' />
              </PrismicLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};


export default LanguageSwitcher;