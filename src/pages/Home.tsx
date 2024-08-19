import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LanguageButton from '../components/buttons/languageButton';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="w-screen h-screen x-home relative overflow-hidden">
            <div className='absolute top-[30px] left-[30px]'>
                <LanguageButton mode="dark" />
            </div>
            <div className="flex flex-col justify-start items-center gap-4 h-full mt-[50px]">
                <img src='/img/logo1.svg' alt='logo' className='w-[50px] md:w-[100px] h-[50px] md:h-[100px]' />
                <h1 className='text-[36px] md:text-[80px] font-bold text-black leading-[50px] md:leading-[90px]'>{t('START')} <span className='text-[#11D6B2]'>{t('EARNING')}</span> <br />{t('WITH')} <span className='text-[#11D6B2]'>SMD</span>-{t('Coin')}!</h1>
                <div className='flex flex-col md:flex-row justify-center gap-3 md:gap-5 items-start md:items-center'>
                    <div className='flex gap-2 items-center flex-start'>
                        <img src='/img/check.png' alt='check' className='w-[20px] md:w-[30px] h-[20px] md:h-[30px]' />
                        <p className='text-[20px] md:text-[24px] text-black'>100% {t('Community')}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <img src='/img/check.png' alt='check' className='w-[20px] md:w-[30px] h-[20px] md:h-[30px]' />
                        <p className='text-[20px] md:text-[24px] text-black'>100% {t('Decentral')}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <img src='/img/check.png' alt='check' className='w-[20px] md:w-[30px] h-[20px] md:h-[30px]' />
                        <p className='text-[20px] md:text-[24px] text-black'>100% {t('for you')}</p>
                    </div>
                </div>
                <Link to='/dashboard' className='bg-[#11D6B2] px-[60px] md:px-[100px] py-[10px] md:py-[15px] text-[20px] md:text-[24px] font-semibold mt-3 md:mt-7 rounded-full'>{t('Connect')}</Link>
                <img src='/img/page.png' alt='page' className='w-auto max-w-none md:w-[80%] min-h-[60%] md:h-auto blur-[3px] mt-3' />
            </div>
        </div>
    )
}

export default Home;