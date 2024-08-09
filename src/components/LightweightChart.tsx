
import { createChart } from 'lightweight-charts';
import React, {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

const Context = createContext(null);

const initialData = [
    { time: '2018-10-11', value: 52.89 },
    { time: '2018-10-12', value: 51.65 },
    { time: '2018-10-13', value: 51.56 },
    { time: '2018-10-14', value: 50.19 },
    { time: '2018-10-15', value: 51.86 },
    { time: '2018-10-16', value: 51.25 },
];

const initialData2 = [
    { time: '2018-10-11', value: 42.89 },
    { time: '2018-10-12', value: 41.65 },
    { time: '2018-10-13', value: 41.56 },
    { time: '2018-10-14', value: 40.19 },
    { time: '2018-10-15', value: 41.86 },
    { time: '2018-10-16', value: 41.25 },
];
const currentDate = new Date(initialData[initialData.length - 1].time);

export const App = (props: any) => {
    const {
        colors: {
            backgroundColor = 'black',
            lineColor = '#2962FF',
            textColor = 'white',
        } = {},
    } = props;

    const [chartLayoutOptions, setChartLayoutOptions] = useState({});
    // The following variables illustrate how a series could be updated.
    const series1 = useRef(null) as any;
    const series2 = useRef(null) as any;
    const [started, setStarted] = useState(false);
    const [isSecondSeriesActive, setIsSecondSeriesActive] = useState(false);

    // The purpose of this effect is purely to show how a series could
    // be updated using the `reference` passed to the `Series` component.
    useEffect(() => {
        if (series1.current === null) {
            return;
        }
        let intervalId: any;

        if (started) {
            intervalId = setInterval(() => {
                currentDate.setDate(currentDate.getDate() + 1);
                const next = {
                    time: currentDate.toISOString().slice(0, 10),
                    value: 53 - 2 * Math.random(),
                };
                series1.current.update(next);
                if (series2.current) {
                    series2.current.update({
                        ...next,
                        value: 43 - 2 * Math.random(),
                    });
                }
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [started]);

    useEffect(() => {
        setChartLayoutOptions({
            background: {
                color: backgroundColor,
            },
            textColor,
        });
    }, [backgroundColor, textColor]);

    return (
        <>
            <button type="button" onClick={() => setStarted(current => !current)}>
                {started ? 'Stop updating' : 'Start updating series'}
            </button>
            <button type="button" onClick={() => setIsSecondSeriesActive(current => !current)}>
                {isSecondSeriesActive ? 'Remove second series' : 'Add second series'}
            </button>
            <Chart layout={chartLayoutOptions}>
                <Series
                    ref={series1}
                    type={'line'}
                    data={initialData}
                    color={lineColor}
                />
                {isSecondSeriesActive && <Series
                    ref={series2}
                    type={'area'}
                    data={initialData2}
                    color={lineColor}
                />}
            </Chart>
        </>
    );
};

export function Chart(props: any) {
    const [container, setContainer] = useState(false);
    const handleRef = useCallback((ref: any) => setContainer(ref), []);
    return (
        <div ref={handleRef}>
            {container && <ChartContainer {...props} container={container} />}
        </div>
    );
}

export const ChartContainer = forwardRef((props: any, ref) => {
    const { children, container, layout, ...rest } = props as any;

    const chartApiRef = useRef<any>({
        isRemoved: false,
        api() {
            if (!this._api) {
                this._api = createChart(container, {
                    ...rest,
                    layout,
                    width: container.clientWidth,
                    height: 300,
                });
                this._api.timeScale().fitContent();
            }
            return this._api;
        },
        free(series: any) {
            if (this._api && series) {
                this._api.removeSeries(series);
            }
        },
    });

    useLayoutEffect(() => {
        const currentRef = chartApiRef.current;
        const chart = currentRef.api();

        const handleResize = () => {
            chart.applyOptions({
                ...rest,
                width: container.clientWidth,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            chartApiRef.current.isRemoved = true;
            chart.remove();
        };
    }, []);

    useLayoutEffect(() => {
        const currentRef = chartApiRef.current;
        currentRef.api();
    }, []);

    useLayoutEffect(() => {
        const currentRef = chartApiRef.current;
        currentRef.api().applyOptions(rest);
    }, []);

    useImperativeHandle(ref, () => chartApiRef.current.api(), []);

    useEffect(() => {
        const currentRef = chartApiRef.current;
        currentRef.api().applyOptions({ layout });
    }, [layout]);

    return (
        <Context.Provider value={chartApiRef.current}>
            {props.children}
        </Context.Provider>
    );
});
ChartContainer.displayName = 'ChartContainer';

export const Series = forwardRef((props: any, ref) => {
    const parent = useContext(Context) as any;
    const context = useRef<any>({
        api() {
            if (!this._api) {
                const { children, data, type, ...rest } = props as any;
                this._api =
                    type === 'line'
                        ? parent.api().addLineSeries(rest)
                        : parent.api().addAreaSeries(rest);
                this._api.setData(data);
            }
            return this._api;
        },
        free() {
            // check if parent component was removed already
            if (this._api && !parent.isRemoved) {
                // remove only current series
                parent.free(this._api);
            }
        },
    });

    useLayoutEffect(() => {
        const currentRef = context.current;
        currentRef.api();

        return () => currentRef.free();
    }, []);

    useLayoutEffect(() => {
        const currentRef = context.current;
        const { children, data, ...rest } = props as any;
        currentRef.api().applyOptions(rest);
    });

    useImperativeHandle(ref, () => context.current.api(), []);

    return (
        <Context.Provider value={context.current}>
            {props.children}
        </Context.Provider>
    );
});
Series.displayName = 'Series';