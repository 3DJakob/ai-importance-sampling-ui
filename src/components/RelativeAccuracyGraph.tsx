import React from 'react'
import { Network, NetworkRun, WithID } from '../lib/types'
import { Line } from 'react-chartjs-2'
import { useCollection } from 'react-firebase-hooks/firestore'
import { getRunCollection } from '../lib/collections'
import useAverageResults from '../lib/useAverageResults'
import { averageRuns } from '../lib/dataProcessing'
import { getOptions } from '../lib/graph'
import { getRunColor } from './RunsInfo/Run'
import DownloadGraphButton from './DownloadGraphButton'

export interface RelativeAccuracyGraphProps {
  network: Network
  relativeName?: string
}

const getComparisonName = (runs: NetworkRun[]): string => {
  const names = runs.map(run => run.name)
  const target = names.find(name => name.includes('uniform'))
  if (target != null) {
    return target
  }
  return names[0]
}

const RelativeAccuracyGraph: React.FC<RelativeAccuracyGraphProps> = ({ network }) => {
  const [averageResults] = useAverageResults()
  const [firebaseRuns, ,] = useCollection(getRunCollection(network?.name ?? ''))
  let runs = firebaseRuns?.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Array<WithID<NetworkRun>>
  if (runs == null) {
    runs = []
  }
  const relativeName = getComparisonName(runs)

  // filter out runs and merge them
  const baseLines = runs.filter(run => run.name === relativeName)
  const baseLine = baseLines.length > 0
    ? baseLines[0].accuracyTest.map((_, i) => {
      return baseLines.reduce((acc, curr) => {
        return acc + curr.accuracyTest[i]
      }, 0) / baseLines.length
    })
    : []

  let plotRuns: Array<WithID<NetworkRun>> = runs.filter(run => run.name !== relativeName).map(run => {
    return {
      ...run,
      accuracyTest: run.accuracyTest.map((val, i) => {
        return val - baseLine[i]
      })
    }
  })

  if (averageResults) {
    plotRuns = averageRuns(plotRuns)
  }

  const redLine = baseLine.map(() => 0)

  const chartData = {
    labels: baseLine.map((_, i) => i),
    datasets: [
      ...plotRuns.map((run, i) => {
        return {
          label: run.name,
          data: run.accuracyTest.map(val => val * 100),
          fill: false,
          borderColor: getRunColor(run)
        }
      }),
      {
        label: 'Zero',
        data: redLine,
        fill: false,
        borderColor: 'rgb(255, 0, 0)'
      }
    ]
  }

  return (
    <>
      <Line
        data={chartData}
        options={getOptions(`Relative Accuracy (%) compared to ${relativeName}. Values over 0% is better than ${relativeName}`)}
      />
      <DownloadGraphButton data={chartData} />
    </>
  )
}

export default RelativeAccuracyGraph
