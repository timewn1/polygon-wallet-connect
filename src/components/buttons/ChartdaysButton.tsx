import React from "react";

const ChartdaysButton = ({active, days, handleButtonClick, children} : any) => {
    return(
        <>
            <button className={`text-[13px] w-[50px] font-semibold border px-2 py-1 mx-[1.5px] rounded-md hover:bg-slate-100 active:bg-slate-200 ${active === days ? 'bg-slate-200' : ''}`} onClick={() => handleButtonClick(days)}>{children}</button>
        </>
    )
}

export default ChartdaysButton;