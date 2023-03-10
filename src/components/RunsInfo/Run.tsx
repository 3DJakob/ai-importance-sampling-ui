import React from 'react'
import { NetworkRun, WithID } from '../../lib/types'

export interface RunProps {
  run: WithID<NetworkRun>
}

const Run: React.FC<RunProps> = ({ run }) => {
  const bestAccuracy = run.accuracyTest.reduce((acc, curr) => {
    if (curr > acc) {
      return curr
    }
    return acc
  }, 0)

  return (
    <tr>
      <td>{run.id}</td>
      <td>{run.name}</td>
      <td>{run.accuracyTest.length}</td>
      <td>{bestAccuracy * 100}%</td>
    </tr>
  )
}

export default Run
