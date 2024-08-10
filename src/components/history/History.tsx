import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import Th from '../tables/Th';
import Td from '../tables/Td';

import { GET_ALL_TRANSACTIONS, GET_TOKEN_HOLDERS, GET_TRANSACTIONS } from '../TVChartContainer/bitquery';
import { callQuery } from '../../api/bitqueryApi';
import { Link } from 'react-router-dom';
import { formatAddress } from '../../utils/normal';

const Tab = ({ text, active, handleClick, _className }: any) => {
    return (
        <div
            className={`text-[1.2em] cursor-pointer pb-2 font-medium ${active
                ? " text-[#000000]"
                : " text-[#B9B9B9]"
                } ${_className ? _className : ''}`}
            onClick={() => handleClick()}
        >
            {text}
        </div>
    )
}

const Transactions = ({ transactions }: any) => {
    return (
        <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <Th _className="items-center flex gap-2 justify-center">
                            No
                        </Th>
                        <Th>Hash</Th>
                        <Th>Time</Th>
                        <Th>From</Th>
                        <Th>To</Th>
                        <Th>Gas</Th>
                        <Th>Status</Th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {
                        !!transactions.length &&
                        transactions.map((transaction: any, ind: number) => (
                            <tr key={ind}>
                                <Td _className=" font-medium items-center flex gap-4 justify-center">
                                    {ind + 1}
                                </Td>
                                <Td><Link className="hover:underline" to={`https://polygonscan.com/tx/${transaction.hash}`}>{formatAddress(transaction.hash)}</Link></Td>
                                <Td>{transaction.block.timestamp.time}</Td>
                                <Td><Link className="hover:underline" to={`https://polygonscan.com/address/${transaction.sender.address}`}>{formatAddress(transaction.sender.address)}</Link></Td>
                                <Td><Link className="hover:underline" to={`https://polygonscan.com/address/${transaction.address.address}`}>{formatAddress(transaction.address.address)}</Link></Td>
                                <Td>{transaction.gasValue}</Td>
                                <Td _className="items-center flex gap-2 justify-center">
                                    <div className={`w-2 h-2 ${transaction.success ? 'bg-green-600' : 'bg-red-600'} `}></div>
                                    <div>
                                        {transaction.success ? 'Success' : 'Failed'}
                                    </div>
                                </Td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <p className="w-full text-center mt-3">{!transactions.length && 'No List'}</p>
        </>
    )
}

const TokenHolders = ({ holders }: any) => {
    return (
        <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <Th _className="items-center flex gap-2 justify-center">
                            No
                        </Th>
                        <Th>Address</Th>
                        <Th>Asset</Th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {

                        !!holders.length &&
                        holders.map((holder: any, ind: number) => (
                            <tr key={ind}>
                                <Td _className=" font-medium items-center flex gap-4 justify-center">
                                    {ind + 1}
                                </Td>
                                <Td>{holder.Holder.Address}</Td>
                                <Td>{holder.Balance.Amount}</Td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <p className="w-full text-center mt-3">{!holders.length && 'No List'}</p>
        </>
    )
}

const History = () => {
    const { address } = useAccount();

    const [activeTab, setActiveTab] = useState(true);
    const [tokenHolders, setTokenHolders] = useState([]);
    const [transactions, setTransactions] = useState<any>([]);

    const getTransaction = async (address: string) => {
        const query = GET_TRANSACTIONS(address, 10, 0);
        const result = await callQuery('v1', query);

        if (result?.data?.data?.ethereum?.transactions) {
            const _transactions = result?.data?.data?.ethereum?.transactions;
            const mergeTransactions = [..._transactions.sender, ..._transactions.receiver].sort((a: any, b: any) => {
                if (a.block.timestamp.time > b.block.timestamp.time) {
                    return 1
                } else {
                    return -1
                }
            }).slice(0, 10);

            if (mergeTransactions) {
                setTransactions(mergeTransactions);
            }
        }
    }

    const getAllTransactions = async () => {
        const now = new Date();
        const to = now.toISOString();
        now.setDate(now.getDate() - 1);
        const from = now.toISOString();

        const query = GET_ALL_TRANSACTIONS(from, to, 10, 0);
        const result = await callQuery('v1', query);

        if (result?.data?.data?.ethereum?.transactions) {
            setTransactions(result?.data?.data?.ethereum?.transactions);
        }
    }

    const getTokenHolders = async () => {
        const query = GET_TOKEN_HOLDERS('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270');   // WMATIC holders
        const result = await callQuery('eap', query);

        if (result?.data?.data?.EVM?.TokenHolders) {
            setTokenHolders(result?.data?.data?.EVM?.TokenHolders);
        }
    }

    useEffect(() => {
        if (activeTab) {
            getTokenHolders();
        } else {
            if (address) {
                // getTransaction('0xad8fbf8291a5b1d768f26a770a82308840953f77');
                getTransaction(address);
            } else {
                getAllTransactions();
            }
        }
    }, [activeTab, address])
    
    return (
        <div className="flex flex-col">
            <div className='flex justify-between'>
                <div className={"flex gap-[30px] sm:gap-[30px]"}>
                    <Tab text="Top Holder" active={activeTab} handleClick={() => setActiveTab(true)} />
                    <Tab text="Transaction History" active={!activeTab} handleClick={() => setActiveTab(false)} />
                </div>
                {/* <div className='flex gap-5'>
                    <div  className='flex gap-5 items-center cursor-pointer'>
                        <p>Pending</p>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path></svg>
                    </div>
                    <div  className='flex gap-5 items-center cursor-pointer'>
                        <p>Type</p>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path></svg>
                    </div>
                    <div  className='flex gap-5 items-center cursor-pointer'>
                        <p>Asset</p>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path></svg>
                    </div>
                    <div  className='flex gap-5 items-center cursor-pointer'>
                        <p>Status</p>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path></svg>
                    </div>
                </div> */}
            </div>
            <div className="-m-1.5 overflow-x-auto mt-1">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-auto max-h-[350px]">
                        {
                            activeTab ?
                                <TokenHolders holders={tokenHolders} /> :
                                <Transactions transactions={transactions} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History;