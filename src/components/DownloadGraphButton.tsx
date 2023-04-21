import { ChartData } from 'chart.js'
import React from 'react'
import { chartDataToCSV, chartDataToCSVXY } from '../lib/csv'

export interface DownloadGraphButtonProps {
  data: ChartData<'line', number[], number> | ChartData<'line', Array<{ x: number, y: number }>, number>
}

const DownloadGraphButton: React.FC<DownloadGraphButtonProps> = ({ data }) => {
  const handleClick = (): void => {
    if (typeof (data.datasets[0].data[0]) === 'number') {
      chartDataToCSV(data as ChartData<'line', number[], number>)
    } else {
      chartDataToCSVXY(data as ChartData<'line', Array<{ x: number, y: number }>, number>)
    }
  }

  return (
    <button onClick={handleClick}>
      Download graph data as CSV
    </button>
  )
}

export default DownloadGraphButton
