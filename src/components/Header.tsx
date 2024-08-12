import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Container from './Container';
import ConnectButton from './buttons/ConnectButton';
import { WalletModal } from './modals/WalletModal';

import { GET_TOKEN_LIST, GET_TOKENS_PRICE } from './TVChartContainer/bitquery';

import * as walletStore from '../store/wallet';
import TOKENS from '../config/tokens';

import { callQuery } from '../api/bitqueryApi';

const Header = () => {
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

        if (result && result.data?.data?.ethereum?.address[0]) {
            const walletData = result.data?.data?.ethereum?.address[0]

            if (walletData.balance) {
                dispatch(walletStore.setBalance(result.data?.data?.ethereum?.address[0]?.balance));
            }

            const filterdTokens = walletData.balances?.filter((e: any) => e.value > 0);
            if (filterdTokens) {
                const tokenOrder = TOKENS.reduce((acc: any, token: any, index: number) => {
                    acc[token.currency.address] = index;
                    return acc;
                }, {});
                filterdTokens.sort((a: any, b: any) => {
                    const orderA = tokenOrder[a.currency.address];
                    const orderB = tokenOrder[b.currency.address];
                
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
    
                dispatch(walletStore.setTokens(filterdTokens));
            } else {
                dispatch(walletStore.setTokens(TOKENS));
            }
        }
    }

    useEffect(() => {
        if (address) {
            dispatch(walletStore.setAddress(address));
            getTokenList(address);
        } else {
            dispatch(walletStore.setTokens(TOKENS));
        }

        setShowModal(false);
    }, [address])

    return (
        <div className="h-[60px] shadow-md fixed w-screen top-0 left-0 bg-gradient-to-r from-[#1A846D] to-[#3B9CB7] z-20">
            <Container>
                <div className="flex justify-between items-center h-full relative">
                    <div className="text-[24px] font-bold text-white absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">Wallet Dashboard</div>
                    <div className="text-2xl font-[700] text-white flex justify-start gap-4 items-center">
                        <img src='/img/logo2.svg' alt='logo' />
                        <span className="hover:cursor-pointer">Smart Dangol</span>
                        {/* <img className="h-[50px] hover:cursor-pointer" src='/img/google-play.png' alt='' /> */}
                    </div>
                    <div>
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