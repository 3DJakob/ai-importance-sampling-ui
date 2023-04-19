
export const dataToCSV = (x: number[], y: number[], filename: string = 'data'): void => {
  const headline = `${filename} Accuracy, ${filename} Timestamp \n`

  // join data, time '\n' data, time '\n' ...
  const text = x.map((val, i) => `${val}, ${y[i]}`).join('\n')

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
