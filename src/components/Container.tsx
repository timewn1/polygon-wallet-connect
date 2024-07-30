import React from 'react';

const Container = ({children}: any) => {
    return (
        <div className='mx-auto max-w-[1600px] w-full h-full px-[10px] sm:px-[20px]'>{children}</div>
    )
}

export default Container;