import React, { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Container from './Container';
import ConnectButton from './buttons/ConnectButton';
import { WalletModal } from './modals/WalletModal';

import { GET_TOKEN_LIST } from './TVChartContainer/bitquery';

import * as walletStore from '../store/wallet';

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
        // const query = GET_TOKEN_LIST(_address);
        const query = GET_TOKEN_LIST('0xad8fbf8291a5b1d768f26a770a82308840953f77');
        const result = await callQuery('v1', query);

        if (result && result.data?.data?.ethereum?.address[0]) {
            const walletData = result.data?.data?.ethereum?.address[0]

            if (walletData.balance) {
                dispatch(walletStore.setBalance(result.data?.data?.ethereum?.address[0]?.balance));
            }

            const filterdTokens = walletData.balances?.filter((e: any) => e.value > 0).map((token: any, index: number) => {
                return {
                    ...token,
                    id: `token${index}`
                }
            });
            console.log('filterdTokens = ', filterdTokens)

            dispatch(walletStore.setTokens(filterdTokens));
        }
    }

    useEffect(() => {
        if (address) {
            dispatch(walletStore.setAddress(address));
            getTokenList(address);
        }
    }, [address])

    return (
        <div className="h-[60px] shadow-md fixed w-screen top-0 left-0 bg-gradient-to-r from-[#1A846D] to-[#3B9CB7]">
            <Container>
                <div className="flex justify-between items-center h-full">
                    <div className="text-2xl font-[700] text-white flex justify-start gap-4 items-center">
                        <span className="hover:cursor-pointer">Smart Dangol</span>
                        <img className="h-[50px] hover:cursor-pointer" src='/img/google-play.png' alt='' />
                    </div>
                    <div className="text-[24px] font-bold text-white">Wallet Dashboard</div>
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