import React from 'react'
import { Network as NetworkType } from '../lib/types'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useCollection } from 'react-firebase-hooks/firestore'
import collections from '../lib/collections'
import NetworkInfo from '../components/NetworkInfo'
import styled from 'styled-components'
import Switch from 'react-switch'
import { averageRuns } from '../lib/dataProcessing'
import ModelVisualization from '../components/ModelVisualization'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart'
    }
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
`

export interface NetworkProps {
  network: NetworkType
}

const Network: React.FC<NetworkProps> = ({ network }) => {
  const [firebaseRuns, loading, error] = useCollection(collections.runs)
  let runs = firebaseRuns?.docs.map(doc => doc.data())
  const [avarageResults, setAvarageResults] = React.useState(false)

  if (runs == null || loading) {
    return <div>Loading...</div>
  }

  if (error != null) {
    return <div>Error: {error.message}</div>
  }

  if (avarageResults) {
    runs = averageRuns(runs)
  }

  // create labels as indexed list of size networks[0].accuracyTest.length
  const labels = Array.from(Array(runs[0].accuracyTest.length).keys())

  const data = {
    labels,
    datasets: runs.map(run => ({
      label: run.name,
      data: run.accuracyTest
      // borderColor: 'rgb(255, 99, 132)',
      // backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }))
  }

  return (
    <Container>
      <ModelVisualization />
      <Line options={options} data={data} />
      <p>Avarage out runs <Switch checked={avarageResults} onChange={setAvarageResults} /></p>
      <NetworkInfo network={network} />
    </Container>
  )
}

export default Network
