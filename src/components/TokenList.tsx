import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState } from '../store';

import SpartChart from "./SparkChart";

import { callQuery } from '../api/bitqueryApi';
import { GET_TOKEN_PRICE } from "./TVChartContainer/bitquery";

// @ts-ignore
import Logos from "../config/tokenLogos";

import * as walletStore from '../store/wallet';

const TokenList = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [openId, setOpenId] = useState(-1);

    const tokens = useSelector((state: RootState) => state.wallet.tokens);

    const handleOpen = async (token: any, index: number) => {
        if (index !== -1 && (!token.prices || token.prices.length === 0)) {
            const address = token.currency.address === '-' ? '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270' : token.currency.address;
            const now = new Date();
            const nowStr = now.toISOString();

            now.setHours(now.getHours() - 2);
            const secondStr = now.toISOString();

            now.setHours(now.getHours() - 2);
            const thirdStr = now.toISOString();

            now.setHours(now.getHours() - 2);
            const fourthStr = now.toISOString();

            now.setHours(now.getHours() - 2);
            const fifthStr = now.toISOString();

            now.setHours(now.getHours() - 2);
            const sixthStr = now.toISOString();

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString();

            const query = GET_TOKEN_PRICE(address, nowStr, secondStr, thirdStr, fourthStr, fifthStr, sixthStr, yesterdayStr);
            const result = await callQuery('v1', query);
            let prices = [] as any;

            if (result?.data?.data?.ethereum) {
                const _prices = result?.data?.data?.ethereum;

                const yesterday = _prices.yesterday.length ? _prices.yesterday[0].quotePrice : 0;
                const sixth = _prices.sixth.length ? _prices.sixth[0].quotePrice : 0;
                const fifth = _prices.fifth.length ? _prices.fifth[0].quotePrice : 0;
                const fourth = _prices.fourth.length ? _prices.fourth[0].quotePrice : 0;
                const third = _prices.third.length ? _prices.third[0].quotePrice : 0;
                const second = _prices.second.length ? _prices.second[0].quotePrice : 0;
                const now = _prices.now.length ? _prices.now[0].quotePrice : 0;

                prices = [
                    yesterday,
                    sixth,
                    fifth,
                    fourth,
                    third,
                    second,
                    now
                ];
            }

            const _tokens = [...tokens];
            const _token = {
                ..._tokens[index],
                prices: prices
            }
            _tokens[index] = _token;
            dispatch(walletStore.setTokens(_tokens));
        }

        setOpenId(index);
    }

    const getPercent = (tokens: number[]) => {
        const last = tokens[tokens.length - 1];
        const first = tokens[0];

        if (first === 0 && last === 0) {
            return 0;
        }

        return (Math.abs(first - last) / first).toFixed(2);
    }

    const getTokenLogo = (address: string) => {
        const _address = (address === '-' || address.toLowerCase() === '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'.toLowerCase()) ? '0x0000000000000000000000000000000000001010' : address;
        const filterAddress = _address.toLowerCase();

        if (Logos[filterAddress]) {
            return Logos[filterAddress];
        } else {
            return '/img/default-token.png';
        }
    }

    return (
        <div className='px-3 py-4 overflow-auto max-h-[395px] md:max-h-[600px]'>
            {
                tokens && tokens.length ?
                    tokens?.map((i: any, ind: number) => (
                        openId === ind ?
                            <div className="bg-white rounded-[1em] px-5 py-5 hover:cursor-pointer" key={ind}>
                                <div className="py-3 flex justify-between items-center gap-2" onClick={() => { handleOpen(i, -1) }}>
                                    <div className="flex gap-2">
                                        <img src={getTokenLogo(i.currency.address)} alt="logo" width={43} height={43} className="w-[43px] h-[43px] rounded-full" onError={(event: any) => (event.target.src = '/img/default-coin.png')} />
                                        <div className="flex gap-4 items-center justify-between">
                                            <p className="max-w-[100px] text-[1.1em] font-medium text-start break-words">{i.currency.symbol}</p>
                                            <p className="max-w-[150px] text-slate-400 break-words">{i.currency.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <p className={`text-[1.2em] ${i.prices[i.prices.length - 1] > i.prices[0] ? 'text-green-500' : 'text-red-500'}`}>{getPercent(i.prices)}%</p>
                                    </div>
                                </div>
                                <div className="flex justify-between gap-1">
                                    <div className="text-left">
                                        <p className="text-slate-400">{t('Price')}</p>
                                        <p className="max-w-[100px] text-nowrap overflow-hidden text-ellipsis hover:overflow-visible">${i.prices[i.prices.length - 1] === 0 ? i.prices[i.prices.length - 1].toFixed(2) : (i.prices[i.prices.length - 1] && i.prices[i.prices.length - 1].toFixed(6))}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-slate-400 ">{t('Holding')}</p>
                                        <p className="max-w-[100px] text-nowrap overflow-hidden text-ellipsis hover:overflow-visible">{i.value}</p>
                                    </div>
                                    {
                                        i.prices && <SpartChart data={i.prices} bgcolor="green" width={150} height={40} />
                                    }
                                </div>
                            </div> :
                            <div className={`w-full py-3 px-5 flex justify-between items-center hover:cursor-pointer`} key={ind} onClick={() => { handleOpen(i, ind) }}>
                                <div className="w-full flex gap-2">
                                    <img src={getTokenLogo(i.currency.address)} alt="logo" width={43} height={43} className="w-[43px] h-[43px] rounded-full" onError={(event: any) => (event.target.src = '/img/default-coin.png')} />
                                    <div className="w-full flex gap-4 items-center justify-start">
                                        <div className="max-w-[100px] overflow-hidden">
                                            <p className="max-w-full text-[1.05em] font-medium text-start text-nowrap overflow-hidden text-ellipsis">{i.currency.symbol}</p>
                                            <p className="text-slate-400 text-nowrap overflow-hidden text-ellipsis text-start">{i.value}</p>
                                        </div>
                                        <p className="max-w-[150px] text-slate-400 text-nowrap overflow-hidden text-ellipsis text-start">{i.currency.name}</p>
                                    </div>
                                </div>
                            </div>
                    )) :
                    <div>{t('No assets')}</div>
            }
        </div>
    )
}

export default TokenList;