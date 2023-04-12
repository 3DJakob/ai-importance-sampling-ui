import randomColor from 'randomcolor'
import React from 'react'
import { NetworkRun, WithID } from '../../lib/types'

export interface RunProps {
  run: WithID<NetworkRun>
}

export const getRunColor = (run: WithID<NetworkRun>): string => {
  return randomColor({ seed: run.name + String(Number(run.id) * 1000) })
}

const Run: React.FC<RunProps> = ({ run }) => {
  const bestAccuracy = run.accuracyTest.reduce((acc, curr) => {
    if (curr > acc) {
      return curr
    }
    return acc
  }, 0)

  const color = getRunColor(run)

  const copyData = (): void => {
    const data = run.accuracyTest
    const timestamps = run.timestamps

    const headline = `${run.name} Accuracy, ${run.name} Timestamp \n`

    // join data, time '\n' data, time '\n' ...
    const text = data.map((val, i) => `${val}, ${timestamps[i]}`).join('\n')

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
    link.download = `${run.name}.csv`
    link.click()
  }

  return (
    <tr>
      <td>{run.id}</td>
      <td>{run.name}</td>
      <td>
        <div style={{
          width: '1rem',
          height: '1rem',
          backgroundColor: color,
          borderRadius: '50%'
        }}
        />

      </td>
      <td>{run.accuracyTest.length}</td>
      <td>{bestAccuracy * 100}%</td>
      <td><button onClick={copyData}>Copy data</button></td>
    </tr>
  )
}

export default Run
