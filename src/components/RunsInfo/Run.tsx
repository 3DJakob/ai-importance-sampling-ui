import randomColor from 'randomcolor'
import React from 'react'
import { NetworkRun, WithID } from '../../lib/types'
import { dataToCSV } from '../../lib/csv'
import { updateDoc } from 'firebase/firestore'
import { getRunDocument } from '../../lib/collections'

export interface ExtendedRun extends WithID<NetworkRun> {
  visibility: boolean
}

export interface RunProps {
  run: ExtendedRun
  networkID: string
}

export const getRunColor = (run: WithID<NetworkRun>): string => {
  return randomColor({ seed: run.name + String(Number(run.id) * 1000) })
}

const Run: React.FC<RunProps> = ({ run, networkID }) => {
  const bestAccuracy = run.accuracyTest.reduce((acc, curr) => {
    if (curr > acc) {
      return curr
    }
    return acc
  }, 0)

  const color = getRunColor(run)

  const updateVisibility = (): void => {
    const docRef = getRunDocument(networkID, run.id)

    updateDoc(docRef, {
      visible: !run.visibility
    }).catch((error) => {
      console.error('Error updating document: ', error)
      alert('Error updating document')
    }).finally(() => {
      console.log('Document successfully updated!')
    })
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
      <td><input
        type='checkbox' checked={run.visibility} onChange={updateVisibility}
          />
      </td>
      <td><button onClick={() => dataToCSV(run.accuracyTest, [run.timestamps], run.name)}>Copy data</button></td>
    </tr>
  )
}

export default Run
