
declare interface RpcRequestType {
	jsonrpc: 		"2.0"
	method: 		string
	params: 		Array<any>
	id: 			string|number
}

declare interface RpcResponseType {
	jsonrpc: 		"2.0"
	id: 			string|number
	result?: 		any
	error?: 		string
}

declare interface WebFileType {
	mime:string
	data:Buffer 
}

declare interface ServerResponse {
	result?: any
	error?: number
}

declare interface InfoType {
	ticker: 			string
	base:				string			//base ticker
	price:				number			//latest price
	usd:				number			//latest price as USD
	change:				number
	high:				number
	low:				number
	volume:				number			//base volume
}

declare interface OrderType {
	price:				number
	amount:				number
}

declare interface ChartType {
	data:				ChartDataType[]
	focus:				'5m'|'15m'|'1h'|'4h'|'24h'
}

declare interface ChartDataType {
	t:				number	// time
	o:				number	// open
	c:				number	// close
	h:				number	// high
	l:				number	// low
	v?:				number	// volume
}

declare interface TickerType {
	base:				string
	token:				string
	price:				number
	change:				number
	change24:			number
	margin:				number
	volume:				number
	usd:				number
	high:				number
	low:				number
}

declare interface TradeType {
	price: 				number
	amount:				number
	created:			number
}
