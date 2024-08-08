import React from 'react';

const ConnectButton = ({text, handleClick}: any) => {
    return (
        <button className={`bg-transparent border-[1px] border-white text-white hover:bg-black/5 transition-all duration-150 ${text === 'Disconnect' ? 'flex justify-center items-center rounded-full bg-white w-[50px] h-[50px] p-3' : 'rounded-md px-[15px] py-[8px]'}`} onClick={handleClick}>
            {
                text === 'Disconnect' ? 
                    <img src="/img/metamask.svg" alt="metamask" className='w-[35px] h-[35px]' /> : 
                    text
            }
        </button>
    )
}

export default ConnectButton;