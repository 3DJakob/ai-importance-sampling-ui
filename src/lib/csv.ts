import { ChartData } from 'chart.js'

export const dataToCSV = (x: number[], ys: number[][], filename: string = 'data', labels = ['Accuracy, Timestamp']): void => {
  const headline = labels.join(', ') + '\n'

  // join time, data1, data2 '\n' time, data1, data2 '\n' ...
  const text = x.map((time, i) => {
    const data = ys.map(y => y[i]).join(', ')
    return `${time}, ${data}`
  }).join('\n')

  navigator.clipboard.writeText(headline + text).catch(err => {
    console.error('Could not copy data to clipboard', err)
    alert('Could not copy data to clipboard')
  })

  // create .csv file
  const csv = new Blob([headline + text], { type: 'text/csv' })
  const url = URL.createObjectURL(csv)
  const link = document.createElement('a')

  // download file
  link.href = url
  link.download = `${filename}.csv`
  link.click()
}

export const chartDataToCSV = (chartData: ChartData<'line', number[], number>, filename: string = 'data'): void => {
  const x = chartData.labels as number[]
  const ys = chartData.datasets?.map(dataset => dataset.data) ?? []

  dataToCSV(x, ys, filename)
}

// this is a variant of dataToCSV that supports different timestamps for each dataset
export const chartDataToCSVXY = (chartData: ChartData<'line', Array<{ x: number, y: number }>, number>): void => {
  const labels = chartData.datasets.map(d => [d.label == null ? '' : d.label, 'Timestamp']).flat()

  const xys = chartData.datasets?.map(dataset => dataset.data) ?? []
  const csvData = []

  for (let i = 0; i < xys.length; i++) {
    const xy = xys[i]
    const x = xy.map(({ x }) => x)
    const y = xy.map(({ y }) => y)
    csvData.push(x, y)
  }

  dataToCSV(csvData[0], csvData.slice(1), 'data', labels)
}
