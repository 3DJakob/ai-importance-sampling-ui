import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { getRunCollection } from '../lib/collections'
import { Network, NetworkRun, WithID } from '../lib/types'
import useAverageResults from '../lib/useAverageResults'
import { Line } from 'react-chartjs-2'
import { averageRunsVaribleTime } from '../lib/dataProcessing'
import { getOptions } from '../lib/graph'
import { ChartData } from 'chart.js'
import DownloadGraphButton from './DownloadGraphButton'

export interface LossGraphProps {
  network: Network
}

const LossGraph: React.FC<LossGraphProps> = ({ network }) => {
  const [averageResults] = useAverageResults()
  const [firebaseRuns, ,] = useCollection(getRunCollection(network?.name ?? ''))
  let runs = firebaseRuns?.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Array<WithID<NetworkRun>>
  if (runs == null) {
    runs = []
  }

  if (averageResults) {
    runs = averageRunsVaribleTime(runs)
  }

  const data: ChartData<'line', Array<{ x: number, y: number }>, number> = {
    datasets: [...runs.map(run => {
      return {
        label: run.name,
        data: run.lossTest.map((val, i) => {
          return {
            x: run.timestamps[i],
            y: val
          }
        }),
        importanceSamplingToggleIndex: run.importanceSamplingToggleIndex
      }
    })
    ]
  }

  return (
    <>
      <Line
        data={data}
        options={{
          ...getOptions('Loss over time'),
          indexAxis: 'x',
          scales: {
            x: {
              type: 'linear',
              position: 'bottom'
            }
          }
        }}
      />
      <DownloadGraphButton data={data} />
    </>
  )
}

export default LossGraph
