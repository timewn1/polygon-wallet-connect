import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines';

interface ChartProps {
	data: number[]
	bgcolor?: string
	width?: number
	height?: number
	margin?: number
}

const SpartChart = ({data, bgcolor='green', width = 130, height = 34, margin = 8} : ChartProps) => {
	return (	
		<div style={{width: width, height: height}}>
			<Sparklines data={data} width={width} height={height} margin = {margin}>
				<SparklinesLine color={bgcolor} />
			</Sparklines>
		</div>
	)
}

export default SpartChart