import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageButton = ({ mode }: any) => {
    const { t, i18n } = useTranslation();

    const [language, setLanguage] = useState('en');
    const [openLang, setOpenLang] = useState(false);

    const changeLanguage = (lang: string) => {
        localStorage.setItem('lang', lang);
        i18n.changeLanguage(lang);
        setLanguage(lang);
    }

    useEffect(() => {
        const _lang = localStorage.getItem('lang');

        if (_lang && (_lang === 'en' || _lang === 'ko')) {
            setLanguage(_lang);
            i18n.changeLanguage(_lang);
        }
    }, [])

    return (
        <>
            <button className={`relative bg-transparent hover:bg-black/5 flex justify-center items-center rounded-full w-[35px] md:w-[40px] h-[35px] md:h-[40px] p-2 ${mode==='dark' ? "text-black border-black/50" : "text-white border-white"}`} onClick={() => { setOpenLang(!openLang) }}>
                {
                    language === 'en' ?  
                    <img src='/img/flag/us.svg' />:
                    <img src='/img/flag/kr.svg' />
                }
                <div className={`z-10 absolute bottom-0 translate-y-[100%] left-0 divide-y overflow-hidden bg-[#f8f7f5] divide-gray-100 rounded-lg shadow w-[100px] ${openLang ? 'block' : 'hidden'}`}>
                    <ul className="text-[14px] text-black">
                        <li className='py-2 px-2 hover:bg-[#dadada] flex justify-start items-center gap-[5px]' onClick={() => { changeLanguage('en') }}><img src='/img/flag/us.svg' className='h-[15px] w-auto' />{t('English')}</li>
                        <li className='py-2 px-2 hover:bg-[#dadada] flex justify-start items-center gap-[5px]' onClick={() => { changeLanguage('ko') }}><img src='/img/flag/kr.svg' className='h-[15px] w-auto' />{t('Korean')}</li>
                    </ul>
                </div>
            </button>
            <div className={`fixed top-0 left-0 w-screen h-screen z-9 ${openLang ? 'block' : 'hidden'}`} onClick={() => { setOpenLang(false) }}></div>
        </>
    )
}

export default LanguageButton;