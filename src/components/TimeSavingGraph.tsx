import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { getRunCollection } from '../lib/collections'
import { Network, NetworkRun, WithID } from '../lib/types'
import useAverageResults from '../lib/useAverageResults'
import { Line } from 'react-chartjs-2'
import { averageRunsVaribleTime } from '../lib/dataProcessing'
import { getOptions } from '../lib/graph'
import { computeXDistanceGraphFromRuns } from '../lib/data/secondsAhead'

export interface TimeSavingGraphProps {
  network: Network
}

const TimeSavingGraph: React.FC<TimeSavingGraphProps> = ({ network }) => {
  const [averageResults] = useAverageResults()
  const [firebaseRuns, ,] = useCollection(getRunCollection(network?.name ?? ''))
  let runs = firebaseRuns?.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Array<WithID<NetworkRun>>
  if (runs == null) {
    runs = []
  }

  if (averageResults) {
    runs = averageRunsVaribleTime(runs)
  }

  const foo = computeXDistanceGraphFromRuns(runs)

  const data2 = foo !== null && {
    datasets: foo.map(run => {
      return {
        label: run.name,
        data: run.accuracyTest.map((val, i) => {
          return {
            x: run.timestamps[i],
            y: val
          }
        })
      }
    }
    )
  }

  if (data2 == null || data2 === false) {
    return null
  }

  return (
    <Line
      data={{
        datasets: data2.datasets
      }}
      options={{
        ...getOptions('Seconds ahead of uniform at that accuracy'),
        indexAxis: 'x',
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }}
    />
  )
}

export default TimeSavingGraph
