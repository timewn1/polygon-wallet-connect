import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { formatDate } from '../utils/chart';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface DataPoint {
    x: number;
    y: number;
}

const CanvaChart: React.FC = () => {
    const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeRange, setActiveRange] = useState(0);

    const generateDataPoints = async () => {
        try {
            const url =
                'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1';
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

        setTimeout(() => {
            generateDataPoints();
        }, 30000)
    };

    useEffect(() => {
        generateDataPoints();
    }, []);

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
                        <p className='text-[20px] font-semibold flex justify-between items-center pl-1 pr-2 gap-4'><span>Bitcoin/USD</span><span className={`text-[24px] ${dataPoints[dataPoints.length - 1].y > dataPoints[dataPoints.length - 2].y ? 'text-green-500': 'text-red-500'}`}>${dataPoints[dataPoints.length - 1]?.y?.toFixed(4)}</span></p>
                        <div className='flex justify-end items-center'>
                            <button>1D</button>
                            <button>1W</button>
                            <button>1M</button>
                            <button>1Y</button>
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
