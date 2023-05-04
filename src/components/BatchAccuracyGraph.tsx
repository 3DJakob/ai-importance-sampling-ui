import React from 'react'
import { Network, NetworkRun, WithID } from '../lib/types'
import { Line } from 'react-chartjs-2'
import DownloadGraphButton from './DownloadGraphButton'
import { getOptions } from '../lib/graph'
import useAverageResults from '../lib/useAverageResults'
import { useCollection } from 'react-firebase-hooks/firestore'
import { getRunCollection } from '../lib/collections'
import { averageRuns } from '../lib/dataProcessing'
import { getRunColor } from './RunsInfo/Run'

export interface BatchAccuracyGraphProps {
  network: Network
}

const BatchAccuracyGraph: React.FC<BatchAccuracyGraphProps> = ({ network }) => {
  const [averageResults] = useAverageResults()
  const [firebaseRuns, , error] = useCollection(getRunCollection(network?.name ?? ''))

  let runs = firebaseRuns?.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Array<WithID<NetworkRun>>

  if (runs == null) {
    runs = []
  }

  let processedRuns = runs

  if (network == null) {
    return <div>Could not find the network</div>
  }

  if (error != null) {
    return <div>Error: {error.message}</div>
  }

  if (averageResults) {
    processedRuns = averageRuns(runs)
  }

  // create labels as indexed list of size networks[0].accuracyTest.length
  const labels = processedRuns.length > 0 ? Array.from(Array(processedRuns[0].accuracyTest.length).keys()) : []

  const data = {
    labels,
    datasets: processedRuns.map((run, i) => ({
      label: run.name,
      data: run.accuracyTest,
      borderColor: getRunColor(run),
      importanceSamplingToggleIndex: run.importanceSamplingToggleIndex
    }))
  }

  return (
    <>
      <Line options={getOptions('Accuracy over batch number')} data={data} />
      <DownloadGraphButton data={data} />
    </>
  )
}

export default BatchAccuracyGraph
