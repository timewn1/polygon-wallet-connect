import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAccount, useDisconnect } from 'wagmi';

import LanguageButton from '../components/buttons/languageButton';
import { WalletModal } from '../components/modals/WalletModal';

import * as walletStore from '../store/wallet';


const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        if (isConnected) {
            disconnect();
        } else {
            setShowModal(true);
        }
    }

    useEffect(() => {
        if (address) {
            dispatch(walletStore.setAddress(address));
            navigate('/dashboard');
        }
    }, [address])

    return (
        <div className="w-screen h-screen x-home relative overflow-hidden">
            <div className='absolute top-[15px] md:top-[25px] left-[15px] md:left-[25px]'>
                <LanguageButton mode="dark" />
            </div>
            <div className="flex flex-col justify-start items-center gap-4 h-full mt-[50px]">
                <img src='/img/logo1.svg' alt='logo' className='w-[50px] md:w-[100px] h-[50px] md:h-[100px]' />
                <h1 className='text-[36px] md:text-[80px] font-bold text-black leading-[50px] md:leading-[90px] text-center'>{t('START')} <span className='text-[#11D6B2]'>{t('EARNING')}</span> <br />{t('WITH')} <span className='text-[#11D6B2]'>SMD</span>-{t('Coin')}!</h1>
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
                <button className='bg-[#11D6B2] w-[250px] md:w-[350px] min-h-[45px] h-[45px] md:min-h-[56px] md:h-[56px] flex justify-center items-center text-[20px] md:text-[24px] font-semibold mt-3 md:mt-7 rounded-full' onClick={handleClick}>{t('Connect')}</button>
                <div className='mt-[10px] md:mt-[10px] w-[250px] md:w-[350px] flex justify-between items-center gap-[5px] md:gap-[10px]'>
                    <a href='https://smart-dangol-coin.gitbook.io/smd-coin-whitepaper' target='blank'><img src='/img/whitepaper-1.png' alt='whitepaper' className='w-[120px] md:w-[170px]' /></a>
                    <a href='https://play.google.com/store/apps/details?id=kr.smartorder.dangol&hl=en_NZ' target='blank'><img src='/img/google-play-1.png' alt='googleplay' className='w-[120px] md:w-[170px]' /></a>
                </div>
                <img src='/img/page.png' alt='page' className='w-auto max-w-none md:w-[80%] min-h-[60%] md:h-auto blur-[3px] mt-3' />
            </div>
            {
                showModal && <WalletModal close={() => setShowModal(false)} />
            }
        </div>
    )
}

export default Home;