




import React, { useEffect, useRef } from 'react';
import { createChart, ISeriesApi, CandlestickData, Time } from 'lightweight-charts';
import { fetchMaticPrices } from '../bitquery/tokenPrices';

const CandlestickChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'>>();

  useEffect(() => {
    const initializeChart = async () => {
      if (chartContainerRef.current) {
        const chart = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          height: 500,
          layout: {
            background: {
              color: '#ffffff',
            },
            textColor: '#000',
          },
          grid: {
            vertLines: {
              color: '#e1e1e1',
            },
            horzLines: {
              color: '#e1e1e1',
            },
          },
          timeScale: {
            borderColor: '#cccccc',
          },
        });

        const candlestickSeries = chart.addCandlestickSeries();
        candlestickSeriesRef.current = candlestickSeries;

        // const initialData = await fetchMaticPrices('0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', '0xc2132D05D31c914a87C6611C10748AEb04B58e8F');
        // candlestickSeries.setData(initialData);

        // Initialize with some dummy data if initialData is empty
        // if (initialData.length === 0) {
          candlestickSeries.setData([
            { time: '2023-04-01', open: 30000, high: 31000, low: 29500, close: 30500 },
            { time: '2023-04-02', open: 30500, high: 30500, low: 30000, close: 31000 },
            { time: '2023-04-03', open: 31000, high: 32000, low: 30500, close: 31500 },
            { time: '2023-04-04', open: 31500, high: 32500, low: 31000, close: 32000 },
            { time: '2023-04-07', open: 32000, high: 33000, low: 31500, close: 32500 },
          ]);
        // }

        return () => {
          chart.remove();
        };
      }
    };

    initializeChart();
  }, []);

  return (
    <div ref={chartContainerRef} style={{ position: 'relative', width: '100%', height: '500px' }} />
  );
};

export default CandlestickChart;
