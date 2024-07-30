import React from 'react';

const ConnectButton = ({text, handleClick}: any) => {
    return (
        <button className='bg-blue-600 rounded-md text-white px-[15px] py-[8px] hover:bg-blue-500 transition-all duration-150' onClick={handleClick}>{text}</button>
    )
}

export default ConnectButton;