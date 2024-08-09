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

    const generateDataPoints = async () => {
        try {
            const url =
                'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1';
            const options = {
                method: 'GET',
                headers: { accept: 'application/json' },
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
        }, 10000)
    };

    useEffect(() => {
        generateDataPoints();
    }, []);

    const options = {
        theme: 'light2', // "light1", "dark1", "dark2"
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: 'Bitcoin Price',
        },
        axisY: {
            includeZero: false,
        },
        height: '450',
        data: [
            {
                type: 'area',
                dataPoints: dataPoints,
            },
        ],
    };

    return (
        <div className="h-full">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <CanvasJSChart options={options} />
            )}
        </div>
    );
};

export default CanvaChart;
