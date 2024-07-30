import React from 'react';

import Container from '../components/Container';
import TokenList from '../components/TokenList';
import History from '../components/history/History';
import TVChartContainer from '../components/TVChartContainer';

const Home = () => {
    return (
        <div className="mt-[60px]">
            <Container>
                <div className='flex pt-10 text-center'>
                    <div className="w-[25%]">
                        <h1 className='text-4xl	mt-[80px]'>$ 487, 914.83</h1>
                        <p className='text-[1em] text-slate-400	'>Your Balance</p>
                        <div className='w-[100] flex justify-center'>
                            <button className='flex items-center gap-2 border rounded-[1em] w-[10em] px-4 py-3 mt-[2em] justify-between'>
                                Buy SMD
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>
                            </button>
                        </div>
                        <h2 className='mt-[3em] text-left font-semibold	text-2xl'>Your Assets</h2>
                        <div className='flex gap-5 mt-3 '>
                            <p className='text-slate-400'>The crypto market cap</p>
                            <p className='text-slate-500'>52.19T</p>
                        </div>
                        <div className='bg-neutral-100 rounded-[1em] mt-5'>
                           <TokenList />
                        </div>

                    </div>
                    <div className="w-[75%] pl-[60px]">
                        <div className="w-full flex h-[500px]">
                            <div className='w-[70%]'>
                                <TVChartContainer />
                            </div>
                            <div className='w-[30%]'>
                                Rapid part
                            </div>
                        </div>
                        <div className='mt-[20px]'>
                            <History />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home;