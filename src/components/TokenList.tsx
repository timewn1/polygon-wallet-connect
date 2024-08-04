import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';

import SpartChart from "./SparkChart";

import { callQuery } from '../api/bitqueryApi';
import { GET_TOKEN_PRICE } from "./TVChartContainer/bitquery";

import * as walletStore from '../store/wallet';

const TokenList = () => {
    const dispatch = useDispatch();

    const [openId, setOpenId] = useState(-1);

    const tokens = useSelector((state: RootState) => state.wallet.tokens);

    const handleOpen = async (token: any, index: number) => {
        if(index !== -1 && (!token.price && token.price !== 0)) {
            const address = token.currency.address === '-' ? '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270' : token.currency.address;

            const query = GET_TOKEN_PRICE(address);
            const result = await callQuery('v1', query);
            let price = 0;

            if (result?.data?.data?.ethereum?.dexTrades && result?.data?.data?.ethereum?.dexTrades.length > 0) {
                price = result.data.data.ethereum.dexTrades[0].quotePrice;
            }
            const _tokens = [...tokens];
            const _token = {
                ..._tokens[index],
                price: price
            }
            _tokens[index] = _token;
            dispatch(walletStore.setTokens(_tokens));
        }

        setOpenId(index);
    }

    return(
        <div className='px-3 py-4 overflow-auto max-h-[600px]'>
            {
                tokens.map((i: any, ind: number) => (
                    openId === ind ? 
                    <div className="bg-white rounded-[1em] px-5 py-5 hover:cursor-pointer" key={ind}>
                        <div className="py-3  flex justify-between items-center " key={ind} onClick={() => {handleOpen(i, -1)}}>
                            <div className="flex gap-2">
                                {/* <img src={i.img} alt="logo" width={43} height={43}/> */}
                                <div className="flex gap-4 items-center justify-between">
                                    <p className="text-[1.1em] font-medium text-start">{i.currency.symbol}</p>
                                    <p className="text-slate-400">{i.currency.name}</p>
                                </div>
                            </div>
                            {/* <div className="flex">
                                <p className="text-green-500 text-[1.2em]">{i.percent}</p>
                            </div> */}
                        </div> 
                        <div className="flex justify-between">
                            <div className="text-left">
                                <p className="text-slate-400 ">Price</p>
                                <p>$ {i.price === 0 ? i.price.toFixed(2) : (i.price && i.price.toFixed(6))}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-slate-400 ">Holding</p>
                                <p>{i.value.toFixed(8)}</p>
                            </div>
                            <SpartChart data = {[5, 10, 3,12,42,18,22, 5, 20]} bgcolor="green" width = {150} height = {40}/>
                        </div>
                    </div> :
                    <div className={`w-full py-3 px-5 flex justify-between items-center hover:cursor-pointer`} key={ind} onClick={() => {handleOpen(i, ind)}}>
                        <div className="w-full flex gap-2">
                            {/* <img src={i.img} alt="logo" width={43} height={43}/> */}
                            <div className="w-full flex gap-4 items-center justify-between">
                                <p className="max-w-[150px] text-[1.05em] font-medium text-start text-nowrap overflow-hidden text-ellipsis">{i.currency.symbol}</p>
                                <p className="w-[100px] text-slate-400 text-nowrap overflow-hidden text-ellipsis text-end">{i.currency.name}</p>
                            </div>
                        </div>
                       {/* <div className="flex">
                            <p className="text-green-500">{i.percent}</p>
                       </div> */}
                    </div>
                ))
            }
        </div>
    )
}
0.
export default TokenList;