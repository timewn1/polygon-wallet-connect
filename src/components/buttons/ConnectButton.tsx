import React from 'react';
import { useTranslation } from 'react-i18next';

const ConnectButton = ({text, handleClick}: any) => {
    const { t } = useTranslation();
    
    return (
        <button className={`bg-transparent border-[1px] border-white text-white hover:bg-black/5 transition-all duration-150 ${text === 'Disconnect' ? 'flex justify-center items-center rounded-full bg-white w-[50px] h-[50px] p-3' : 'rounded-md px-[15px] py-[8px]'}`} onClick={handleClick}>
            {
                text === 'Disconnect' ? 
                    <img src="/img/metamask.svg" alt="metamask" className='w-[35px] h-[35px]' /> : 
                    <>
                        <span className='hidden md:block'>{t(text)}</span>
                        <span className='block md:hidden'>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><rect width="416" height="288" x="48" y="144" fill="none" strokeLinejoin="round" strokeWidth="32" rx="48" ry="48"></rect><path fill="none" strokeLinejoin="round" strokeWidth="32" d="M411.36 144v-30A50 50 0 0 0 352 64.9L88.64 109.85A50 50 0 0 0 48 159v49"></path><path d="M368 320a32 32 0 1 1 32-32 32 32 0 0 1-32 32z"></path></svg>
                        </span>
                    </>
            }
        </button>
    )
}

export default ConnectButton;