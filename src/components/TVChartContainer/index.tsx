import React from 'react';
import { Ether } from '@uniswap/sdk-core'
import './index.css'
import { widget } from '../../charting_library';
import Datafeed from './datafeed'; 
import { connectStream, disconnectStream } from './stream';

const TVChartContainer = ({base, quote}: any) => {
	const defaultProps = {
		symbol: [
			base instanceof Ether ? "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": base?.address, 
			quote instanceof Ether ? "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": quote?.address
		],
		interval: `${30}`,
		containerId: 'tv_chart_container',
		// datafeedUrl: 'https://demo_feed.tradingview.com',
		libraryPath: '/charting_library/', 
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true
	};

	React.useEffect(() => {
		// connectStream();

		return () => {
			disconnectStream();
		}
	}, [])

	React.useEffect(()=>{
		const widgetOptions = {
			symbol: (base instanceof Ether ? "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": base?.address) + "," + (
			quote instanceof Ether ? "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": quote?.address),
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: Datafeed,
			// datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl),
			interval: defaultProps.interval,
			container_id: defaultProps.containerId,
			library_path: defaultProps.libraryPath,
			theme: 'Light',
			locale:  'en', //getLanguageFromURL() ||
			disabled_features: [ 
				"header_compare",  
				"header_saveload", 
				"header_indicators", 
				"left_toolbar", 
				"header_interval_dialog_button", 
				"header_settings", 
				"header_screenshot", 
				"header_undo_redo", 
				"show_interval_dialog_on_key_press", 
				"header_interval_toolbar",
				"timeframes_toolbar"
			],
			/*"left_toolbar",'use_localstorage_for_settings', "timeframes_toolbar", "left_toolbar", "show_logo_on_all_charts", "header_settings", "header_indicators", "header_compare", "compare_symbol", "header_screenshot", 
			"header_widget_dom_node", "header_saveload", "header_undo_redo", 
			 "header_interval_dialog_button", "show_interval_dialog_on_key_press"*/
			enabled_features: [],
			charts_storage_url: defaultProps.chartsStorageUrl,
			charts_storage_api_version: defaultProps.chartsStorageApiVersion,
			client_id: defaultProps.clientId,
			user_id: defaultProps.userId,
			fullscreen: !!defaultProps.fullscreen,
			autosize: !!defaultProps.autosize,
			studies_overrides: '',
		} as any;
		const options = {...widgetOptions, ...defaultProps}

		const tvWidget = new widget(options);
		tvWidget.onChartReady(() => {
			tvWidget.hideAllDrawingTools()
			tvWidget.headerReady().then(() => {
				tvWidget.chart().setChartType(1)
				
				// const button = tvWidget.createButton();
				// button.setAttribute('title', 'Click to show a notification popup');
				// button.classList.add('apply-common-tooltip');
				// button.addEventListener('click', () => tvWidget.showNoticeDialog({
				// 	title: 'Notification',
				// 	body: 'TradingView Charting Library API works correctly',
				// 	callback: () => {
				// 		console.log('Noticed!');
				// 	},
				// }));

				// button.innerHTML = 'Check API';
			});
		});
	}, [base, quote])

	return (
		<div
			id={ 'tv_chart_container' /* containerId */ }
			className={ 'TVChartContainer' }
		/>
	);
}

export default TVChartContainer;
