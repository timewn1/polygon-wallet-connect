import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { formatDate } from '../utils/chart';
import ChartdaysButton from './buttons/ChartdaysButton';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface DataPoint {
    x: number;
    y: number;
}

const CanvaChart: React.FC = () => {
    const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [days, setDays] = useState(1);

    const handleButtonClick = (daysValue: any) => {
        setDays(daysValue);
    }

    const generateDataPoints = async (_day: number) => {
        try {
            const url =
                `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${_day}`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    "x-cg-demo-api-key": "CG-gai4uXMPd7obu5476wkDQi9A",
                    mode: 'no-cors'
                },
            };

            const response = await fetch(url, options);
            const data = await response.json();

            const dps: DataPoint[] = data.prices.map((price: [number, number]) => {
                return {
                    // x: price[0],
                    label: formatDate(price[0]),
                    y: price[1],
                }
            });

            setDataPoints(dps);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        generateDataPoints(days);

        const intervalId = setInterval(() => {
            generateDataPoints(days);
        }, 30000);

        return () => clearInterval(intervalId);
    }, [days]);

    const options = {
        theme: 'light2', // "light1", "dark1", "dark2"
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: ``,
        },
        axisY: {
            includeZero: false,
        },
        height: '450',
        data: [
            {
                type: 'area',
                color: "#30949d",
                dataPoints: dataPoints,
            },
        ],
    };

    return (
        <div className="h-full">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className='flex justify-between items-center w-full'>
                        <div className='text-[20px] font-semibold flex justify-between items-center pl-1 pr-2 gap-4'>
                            <span className='font-bold text-[#353739]'>BTC/USD</span>
                            <span className='text-[24px]'>${dataPoints[dataPoints.length - 1]?.y?.toFixed(4)}</span>
                            <div className='flex'>
                                <span className={`text-[16px] ${(dataPoints[dataPoints.length - 1].y - dataPoints[0].y) / dataPoints[0].y * 100  > 0 ? 'text-green-500' : 'text-red-500'}`}>{Math.abs((dataPoints[dataPoints.length - 1].y - dataPoints[0].y) / dataPoints[0].y * 100).toFixed(2)}%</span>
                                <span className={`${(dataPoints[dataPoints.length - 1].y - dataPoints[0].y) / dataPoints[0].y * 100  > 0 ? 'text-green-500' : 'text-red-500  rotate-180 '}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" width="24px" viewBox="0 0 24 24" className="sc-4c05d6ef-0 dMwnWW"><path d="M18.0566 16H5.94336C5.10459 16 4.68455 14.9782 5.27763 14.3806L11.3343 8.27783C11.7019 7.90739 12.2981 7.90739 12.6657 8.27783L18.7223 14.3806C19.3155 14.9782 18.8954 16 18.0566 16Z"></path></svg>
                                </span>
                            </div>
                        </div>
                        <div className='flex justify-end items-center '>
                            <ChartdaysButton active={days} days={1} handleButtonClick={handleButtonClick}>1D</ChartdaysButton>
                            <ChartdaysButton active={days} days={7} handleButtonClick={handleButtonClick}>1W</ChartdaysButton>
                            <ChartdaysButton active={days} days={30} handleButtonClick={handleButtonClick}>1M</ChartdaysButton>
                            <ChartdaysButton active={days} days={365} handleButtonClick={handleButtonClick}>1Y</ChartdaysButton>
                        </div>
                    </div>
                    {
                        dataPoints.length && <CanvasJSChart options={options} />
                    }
                </>
            )}
        </div>
    );
};

export default CanvaChart;
