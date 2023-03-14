import React from 'react'
import { Network, NetworkRun } from '../lib/types'
import { Line } from 'react-chartjs-2'
import { useCollection } from 'react-firebase-hooks/firestore'
import { getRunCollection } from '../lib/collections'
import useAverageResults from '../lib/useAverageResults'
import { averageRuns } from '../lib/dataProcessing'

export interface LossWindowGraphProps {
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

const LossWindowGraph: React.FC<LossWindowGraphProps> = ({ network }) => {
  const [averageResults] = useAverageResults()
  const [firebaseRun, ,] = useCollection(getRunCollection(network?.name ?? ''))
  let runs = firebaseRun?.docs.map(doc => doc.data())
  if (runs == null) {
    runs = []
  }
  const relativeName = getComparisonName(runs)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: `Relative Accuracy (%) compared to ${relativeName}. Values over 0% is better than ${relativeName}`
      }
    }
  }

  // filter out runs and merge them
  const baseLines = runs.filter(run => run.name === relativeName)
  const baseLine = baseLines.length > 0
    ? baseLines[0].accuracyTest.map((_, i) => {
      return baseLines.reduce((acc, curr) => {
        return acc + curr.accuracyTest[i]
      }, 0) / baseLines.length
    })
    : []

  let plotRuns: NetworkRun[] = runs.filter(run => run.name !== relativeName).map(run => {
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

  return (
    <Line
      data={{
        labels: baseLine.map((_, i) => i),
        datasets: [
          ...plotRuns.map((run, i) => {
            return {
              label: run.name,
              data: run.accuracyTest.map(val => val * 100),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          }),
          {
            label: 'Zero',
            data: redLine,
            fill: false,
            borderColor: 'rgb(255, 0, 0)'
          }
        ]
      }}
      options={options}
    />
  )
}

export default LossWindowGraph
