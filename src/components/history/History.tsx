import React, { useState } from 'react';

import Th from '../tables/Th';
import Td from '../tables/Td';

const Tab = ({text, active, handleClick, _className}: any) => {
    return (
        <div
            className={`text-[1.2em] cursor-pointer pb-2 font-medium ${
            active
                ? " text-[#000000]"
                : " text-[#B9B9B9]"
            } ${_className ? _className : ''}`}
            onClick={() => handleClick()}
        >
            {text}
        </div>
    )
}

const History = () => {
    const [active, setActive] = useState(true);
    const transactions = [
        {
            type: "buy",
            date: "2021-08-12",
            kind: "ETH",
            amount: "12ETH",
            address: "sdfdsfdsfdsf3594729385sdfsdf",
            status: "Pending"
        },
        {
            type: "buy",
            date: "2021-08-12",
            kind: "ETH",
            amount: "12ETH",
            address: "sdfdsfdsfdsf3594729385sdfsdf",
            status: "Pending"
        },
        {
            type: "buy",
            date: "2021-08-12",
            kind: "ETH",
            amount: "12ETH",
            address: "sdfdsfdsfdsf3594729385sdfsdf",
            status: "Pending"
        },
        {
            type: "buy",
            date: "2021-08-12",
            kind: "ETH",
            amount: "12ETH",
            address: "sdfdsfdsfdsf3594729385sdfsdf",
            status: "Pending"
        },
        {
            type: "buy",
            date: "2021-08-12",
            kind: "ETH",
            amount: "12ETH",
            address: "sdfdsfdsfdsf3594729385sdfsdf",
            status: "Pending"
        }
    ]
    return (
            <div className="flex flex-col">
                <div className='flex justify-between'>
                <div className={"flex gap-[30px] sm:gap-[30px]"}>
                    <Tab text="Top Holder" active={active} handleClick={() => setActive(true)} />
                    <Tab text="Transaction History"  active={!active} handleClick={() => setActive(false)}/>
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
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <Th _className="items-center flex gap-2 justify-center">
                                        <div>
                                            <input type="checkbox" />
                                        </div>
                                        Type
                                    </Th>
                                    <Th>Date</Th>
                                    <Th>Asset</Th>
                                    <Th>Amount</Th>
                                    <Th>Address</Th>
                                    <Th>Status</Th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    transactions.map((transaction, ind) => (
                                        <tr key={ind}>
                                            <Td _className=" font-medium items-center flex gap-4 justify-center">
                                                <div>
                                                    <input type="checkbox" />
                                                </div>
                                                <div className='rounded-full p-2 bg-cyan-200'>
                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4.75 17.25a.75.75 0 0 1 .75.75v2.25c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V18a.75.75 0 0 1 1.5 0v2.25A1.75 1.75 0 0 1 18.25 22H5.75A1.75 1.75 0 0 1 4 20.25V18a.75.75 0 0 1 .75-.75Z"></path><path d="M5.22 9.97a.749.749 0 0 1 1.06 0l4.97 4.969V2.75a.75.75 0 0 1 1.5 0v12.189l4.97-4.969a.749.749 0 1 1 1.06 1.06l-6.25 6.25a.749.749 0 0 1-1.06 0l-6.25-6.25a.749.749 0 0 1 0-1.06Z"></path></svg>
                                                </div>
                                                {transaction.type}
                                            </Td>
                                            <Td>{transaction.date}</Td>
                                            <Td>{transaction.kind}</Td>
                                            <Td>{transaction.amount}</Td>
                                            <Td>{transaction.address}</Td>
                                            <Td _className="items-center flex gap-2 justify-center">
                                                <div className='w-2 h-2 bg-green-600'></div>
                                                <div>
                                                    {transaction.status}
                                                </div>
                                            </Td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History;