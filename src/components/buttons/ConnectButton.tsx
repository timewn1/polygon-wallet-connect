import React from 'react';

const ConnectButton = ({text, handleClick}: any) => {
    return (
        <button className='bg-transparent border-[1px] border-white rounded-md text-white px-[15px] py-[8px] hover:bg-black/5 transition-all duration-150' onClick={handleClick}>{text}</button>
    )
}

export default ConnectButton;