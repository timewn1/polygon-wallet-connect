import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Container from './Container';
import ConnectButton from './buttons/ConnectButton';
import { WalletModal } from './modals/WalletModal';

import { GET_TOKEN_LIST } from './TVChartContainer/bitquery';

import * as walletStore from '../store/wallet';
import TOKENS from '../config/tokens';

import { callQuery } from '../api/bitqueryApi';
import LanguageButton from './buttons/languageButton';

const Header = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const { isConnected } = useAccount();

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        if (isConnected) {
            disconnect();
        } else {
            setShowModal(true);
        }
    }

    const getTokenList = async (_address: string) => {
        const query = GET_TOKEN_LIST(_address);
        // const query = GET_TOKEN_LIST('0xad8fbf8291a5b1d768f26a770a82308840953f77');
        const result = await callQuery('v1', query);

        console.log('result = ', result)

        if (result && result.data?.data?.ethereum?.address[0]) {
            const walletData = result.data?.data?.ethereum?.address[0]

            if (walletData.balance) {
                dispatch(walletStore.setBalance(result.data?.data?.ethereum?.address[0]?.balance));
            }

            const filterdTokens = walletData.balances?.filter((e: any) => e.value > 0);
            if (filterdTokens) {
                const tokenOrder = TOKENS.reduce((acc: any, token: any, index: number) => {
                    acc[token.currency.address.toLowerCase()] = index;
                    return acc;
                }, {});
                filterdTokens.sort((a: any, b: any) => {
                    const orderA = tokenOrder[a.currency.address.toLowerCase()];
                    const orderB = tokenOrder[b.currency.address.toLowerCase()];

                    if (orderA === undefined && orderB === undefined) {
                        return 0;
                    }
                    if (orderA === undefined) {
                        return 1;
                    }
                    if (orderB === undefined) {
                        return -1;
                    }

                    return orderA - orderB;
                });

                let tokens = filterdTokens;

                if(!filterdTokens.find((token: any) => token.currency.address.toLowerCase() === TOKENS[0].currency.address.toLowerCase())) {
                    tokens = [TOKENS[0], ...tokens];
                }

                if(!filterdTokens.find((token: any) => token.currency.address.toLowerCase() === TOKENS[1].currency.address.toLowerCase())) {
                    tokens.splice(1, 0, TOKENS[1])
                }
                dispatch(walletStore.setTokens(tokens));
            } else {
                dispatch(walletStore.setTokens(TOKENS));
            }
        }
    }

    useEffect(() => {
        if (address) {
            getTokenList(address);
        } else {
            navigate('/');
        }

        setShowModal(false);
    }, [address]);

    return (
        <div className="h-[60px] shadow-md fixed w-screen top-0 left-0 bg-gradient-to-r from-[#1A846D] to-[#3B9CB7] z-20">
            <Container>
                <div className="flex justify-between items-center h-full relative">
                    <div className="xl:block hidden text-[24px] font-bold text-white absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">{t('Wallet Dashboard')}</div>
                    <div className="text-xl md:text-2xl font-[700] text-white flex justify-start gap-2 md:gap-4 items-center">
                        <img src='/img/logo2.svg' alt='logo' />
                        <span className="hover:cursor-pointer">{t('Smart Dangol')}</span>
                        {/* <img className="h-[50px] hover:cursor-pointer" src='/img/google-play.png' alt='' /> */}
                    </div>
                    <div className='flex justify-end items-center gap-5'>
                        <LanguageButton />
                        <ConnectButton text={!address ? 'Connect Wallet' : 'Disconnect'} handleClick={handleClick} />
                    </div>
                </div>
                {
                    showModal && <WalletModal close={() => setShowModal(false)} />
                }
            </Container>
        </div>
    )
}

export default Header;