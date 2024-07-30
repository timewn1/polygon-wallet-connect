import React, { useState } from "react";
import SpartChart from "./SparkChart";

const data = [
    {
        img: "/img/bitcoin.svg",
        title: "Bitcoin",
        desc: "BTC",
        percent: "1.50%",
        price: "$3, 872.83",
        holding: "37.54ETH"
    },{
        img: "/img/ethereum-eth.svg",
        title: "Ethereum",
        desc: "ETH",
        percent: "1.50%",
        price: "$3, 872.83",
        holding: "37.54ETH"
    },{
        img: "/img/avalanche.svg",
        title: "Avalanche",
        desc: "AVA",
        percent: "1.50%",
        price: "$3, 872.83",
        holding: "37.54ETH"
    },{
        img: "/img/binance.svg",
        title: "Binance",
        desc: "BIC",
        percent: "1.50%",
        price: "$3, 872.83",
        holding: "37.54ETH"
    }
]

const TokenList = () => {
    const [openId, setOpenId] = useState(1);

    return(
        <div  className='px-5 py-4 '>
            {
                data.map((i, ind) => (
                    openId === ind ? 
                    <div className="bg-white rounded-[1em] px-5 py-5 hover:cursor-pointer" key={ind}>
                        <div className="py-3  flex justify-between items-center " key={ind} onClick={() => {setOpenId(-1)}}>
                            <div className="flex gap-2">
                                <img src={i.img} alt="logo" width={43} height={43}/>
                                <div className="flex gap-4 items-center">
                                    <p className="text-[1.1em] font-medium	">{i.title}</p>
                                    <p className="text-slate-400">{i.desc}</p>
                                </div>
                            </div>
                            <div className="flex">
                                <p className="text-green-500 text-[1.2em]">{i.percent}</p>
                            </div>
                        </div> 
                        <div className="flex justify-between">
                            <div className="text-left">
                                <p className="text-slate-400 ">Price</p>
                                <p>{i.price}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-slate-400 ">Holding</p>
                                <p>{i.holding}</p>
                            </div>
                            <SpartChart data = {[5, 10, 3,12,42,18,22, 5, 20]} bgcolor="green" width = {150} height = {40}/>
                        </div>
                    </div> :
                    <div className="py-3 px-5 flex justify-between items-center hover:cursor-pointer" key={ind} onClick={() => {setOpenId(ind)}}>
                        <div className="flex gap-2">
                            <img src={i.img} alt="logo" width={43} height={43}/>
                            <div className="flex gap-4 items-center">
                                <p className="text-[1.1em] font-medium	">{i.title}</p>
                                <p className="text-slate-400">{i.desc}</p>
                            </div>
                        </div>
                       <div className="flex">
                            <p className="text-green-500">{i.percent}</p>
                       </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TokenList;