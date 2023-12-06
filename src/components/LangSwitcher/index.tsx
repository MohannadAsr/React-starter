import { Icon } from '@iconify/react/dist/iconify.js';
import { useTranslation } from 'react-i18next';
import React from 'react';

function LangSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
    changeHTML(i18n.language);
    localStorage.setItem('current-lang', JSON.stringify(i18n.language));
  };

  React.useEffect(() => {
    changeHTML(i18n.language);
  }, []);

  const changeHTML = (lang: string) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <button
      className=" flex justify-center items-center gap-2 bg-secondary text-white p-2 rounded-md"
      onClick={changeLang}
    >
      <Icon icon="mdi-flag" className=" text-white" />
      {t('changeLang')}
    </button>
  );
}

export default LangSwitcher;
