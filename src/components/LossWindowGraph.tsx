import React from 'react'
import { Network } from '../lib/types'
import { Line } from 'react-chartjs-2'
import { useCollection } from 'react-firebase-hooks/firestore'
import { getLossCollection } from '../lib/collections'

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Loss over the whole dataframe (64 batch average)'
    }
  }
}

export interface LossWindowGraphProps {
  network: Network
}

const LossWindowGraph: React.FC<LossWindowGraphProps> = ({ network }) => {
  const [firebaseLoss, ,] = useCollection(getLossCollection(network?.name ?? ''))
  let runs = firebaseLoss?.docs.map(doc => doc.data())
  if (runs == null) {
    runs = []
  }
  const labels = runs.length > 0 ? Array.from(Array(runs[0].loss.length).keys()) : []
  const data = {
    labels,
    datasets: [...runs.map((run, index) => {
      return {
        label: `Run ${index}`,
        data: run.loss
        // data: run.accuracyTest
      }
    }), {
      label: 'Average',
      data: runs[0]?.loss.map((_, index) => {
        let total = 0
        // average the 100 next values
        for (let i = index; i < index + 400; i++) {
          if (runs == null) break
          if (runs[0] == null) break
          if (runs[0].loss == null) break
          if (runs[0].loss[i] == null) break
          total += runs[0]?.loss[i]
        }
        return total / 400
      })
    },
    {
      label: 'Distribution',
      data: runs[0]?.loss != null ? [...runs[0].loss].sort((a, b) => a - b) : []
    }]
  }

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  )
}

export default LossWindowGraph
