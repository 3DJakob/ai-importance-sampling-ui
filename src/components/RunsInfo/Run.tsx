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
    </tr>
  )
}

export default Run
