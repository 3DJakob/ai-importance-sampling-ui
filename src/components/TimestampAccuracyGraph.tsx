import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { getRunCollection } from '../lib/collections'
import { Network, NetworkRun, WithID } from '../lib/types'
import useAverageResults from '../lib/useAverageResults'
import { Line } from 'react-chartjs-2'
import { averageRuns } from '../lib/dataProcessing'

export interface TimestampGraphProps {
  network: Network
}

const accumulateTimestamps = (runs: Array<WithID<NetworkRun>>): Array<WithID<NetworkRun>> => {
  const accumulated = runs.map(run => {
    const timestamps = run.timestamps.reduce((acc, curr) => {
      return [...acc, curr + acc[acc.length - 1]]
    }, [0])
    return {
      ...run,
      timestamps
    }
  })
  return accumulated
}

const TimestampGraph: React.FC<TimestampGraphProps> = ({ network }) => {
  const [averageResults] = useAverageResults()
  const [firebaseRuns, ,] = useCollection(getRunCollection(network?.name ?? ''))
  let runs = firebaseRuns?.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Array<WithID<NetworkRun>>
  if (runs == null) {
    runs = []
  }

  runs = accumulateTimestamps(runs)

  const data = {
    datasets: runs.map(run => {
      return {
        label: run.name,
        data: run.accuracyTest.map((val, i) => {
          return {
            x: run.timestamps[i],
            y: val
          }
        })
      }
    })
  }

  if (averageResults) {
    runs = averageRuns(runs)
  }

  return (
    <Line
      data={{
        datasets: data.datasets
      }}
      options={{
        indexAxis: 'x',
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }}
      // options={getOptions(`Relative Accuracy (%) compared to ${relativeName}. Values over 0% is better than ${relativeName}`)}
    />
  )
}

export default TimestampGraph
