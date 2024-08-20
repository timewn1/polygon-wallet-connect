import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';
import { useTranslation } from 'react-i18next';

import { RootState } from '../store';

import Header from '../components/Header';

import Container from '../components/Container';
import TokenList from '../components/TokenList';
import History from '../components/history/History';
import CanvaChart from '../components/CanvaChart';

const Dashboard = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { address } = useAccount();
    const [addressValue, setAddressValue] = useState('');
    const [feedSlip, setFeedSlip] = useState(false);
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);

    const balance = useSelector((state: RootState) => state.wallet.balance);

    const copyAddress = async () => {
        const _address = address as string;
        await navigator.clipboard.writeText(_address);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000)
    }

    useEffect(() => {
        if (address) {
            setAddressValue(address);
        } else {
            navigate('/');
        }
    }, [address])

    return (
        <>
            <Header />
            <div className="mt-[60px] xl:block">
                <Container>
                    <div className='flex flex-col md:flex-row md:pt-10 pt-3 text-center pb-6'>
                        <div className="md:w-[25%] md:min-w-[380px]">
                            <div className='flex items-center justify-between'>
                                {
                                    address ? <>
                                        <p className='flex gap-2 items-center text-[1em] text-slate-400 text-left'>
                                            {'...' + addressValue.substring(addressValue.length - 10)}
                                            <span className='hover:bg-black/10 rounded-md cursor-pointer relative' onClick={copyAddress}>
                                                <img className='w-5 h-5' src='/img/copy.svg' alt='copy' />
                                                <span className={`absolute -left-[50%] -top-5 w-[60px] flex justify-center items-center text-[14px] text-black transition-all duration-400 ease-in-out ${copied ? 'opacity-100' : 'opacity-0'}`}>{t('Copied!')}</span>
                                            </span>
                                        </p>
                                    </> :
                                    <p className="text-left">{t('No connected')}</p>
                                }
                                <div className='w-[100] flex justify-center'>
                                    <button className='md:hidden flex items-center gap-2 border rounded-[1em] w-[10em] px-4 py-3 md:mt-[2em]  justify-between hover:bg-black/[0.02]'>
                                        <img src='/img/swap.png' className='w-5 h-auto' />
                                        {t('Buy SMD')}
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex md:flex-col items-center md:justify-start justify-center gap-2 md:mt-[60px] mt-[35px]">
                                <img src='/img/logo1.svg' width={50} height={50} alt="coin" className='md:w-[50px] md:h-[50px] w-[40px] h-[40px]'/>
                                <h1 className='md:text-4xl text-[1.8em] '>$ {balance.toFixed(2)}</h1>
                                <button className={`md:hidden hover:cursor-pointer ${open ? " rotate-90 " : "rotate-0"} `} onClick={() => setOpen(!open)}>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>
                                </button>
                            </div>
                            <div className='w-[100] md:flex justify-center hidden'>
                                <button className='flex items-center gap-2 border rounded-[1em] w-[10em] px-4 py-3 md:mt-[2em] mt-[1em] justify-between hover:bg-black/[0.02]'>
                                    <img src='/img/swap.png' className='w-5 h-auto' />
                                    {t('Buy SMD')}
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>
                                </button>
                            </div>
                            <div>
                                <h2 className='md:mt-[3em] mt-[1em] text-left font-semibold	text-2xl hidden md:block'>{t('Assets')}</h2>
                                <div className={`bg-[#f8f7f5] rounded-[1em]  transition-all duration-500 ease-in-out h-0 md:h-auto overflow-hidden md:overflow-auto ${open ? 'h-[395px] mt-5': ''}`}>
                                    <TokenList />
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-[75%] md:pl-[60px] ">
                            <div className="w-full flex flex-col md:flex-row md:h-[500px]">
                                <div className='w-[100%] md:w-[65%] md:pt-2 pt-7'>
                                    <CanvaChart />
                                </div>
                                <div className='md:w-[35%]  md:pl-10 overflow-hidden flex gap-10 mt-7 md:mt-0 relative'>
                                    <div className={`min-w-full grid justify-center transition-transform duration-500 ease-in-out ${feedSlip ? 'translate-x-[-150%]' : ''}`}>
                                        <img src="https://alternative.me/crypto/fear-and-greed-index.png" alt="Latest Crypto Fear & Gred Index" className='w-[300px]' />
                                        <a href='https://smart-dangol-coin.gitbook.io/smd-coin-whitepaper' target='blank'>
                                            <img className='w-[300px] mt-5' src='/img/whitepaper.jpg' alt='whitepaper' />
                                        </a>
                                    </div>
                                    {/* <div className={`min-w-full transition-transform duration-500 ease-in-out ${feedSlip ? 'translate-x-[-110%]' : ''}`}>
                                        <iframe width="300" height="450" src="https://rss.app/embed/v1/list/bjVfZH7h7j6I5yuO" className='border-none'></iframe>
                                    </div> */}
                                    {/* <span className="absolute right-0 top-[40%] text-[50px] text-[#1A846D] z-19 hover:cursor-pointer hover:bg-black/5" onClick={() => {setFeedSlip(!feedSlip)}}>
                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="50px" width="50px" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>
                                    </span> */}
                                </div>
                            </div>
                            <div className='mt-[20px]'>
                                <History />
                            </div>
                        </div>
                    </div>
                    <div className='w-full mt-2 mb-5'>
                        <gecko-coin-price-marquee-widget locale="en" outlined="true" coin-ids="" initial-currency="usd" width="100%"></gecko-coin-price-marquee-widget>
                    </div>
                </Container>
            </div>
            {/*
                <div className='pt-[160px] px-[30px] text-center font-bold text-[24px] flex xl:hidden w-full justify-center items-center'>
                    Please use Desktop Browser View to access
                </div>
            */}
        </>
    )
}

export default Dashboard;