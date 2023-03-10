import React from 'react'
import { Network as NetworkType, NetworkRun, WithID } from '../lib/types'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
} from 'chart.js'
import { useCollection } from 'react-firebase-hooks/firestore'
import { getRunCollection } from '../lib/collections'
import NetworkInfo from '../components/NetworkInfo'
import styled from 'styled-components'
import Switch from 'react-switch'
import { arrayToChartData, averageRuns, chartDataToArray, toTrendLine } from '../lib/dataProcessing'
import ModelVisualization from '../components/ModelVisualization'
import { Line } from 'react-chartjs-2'
import { useLoaderData } from 'react-router-dom'
import BackButton from '../components/BackButton'
import LossWindowGraph from '../components/LossWindowGraph'
import Runs from '../components/RunsInfo'
import useShowTrendlines from '../lib/useShowTrendlines'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
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

const TopContainer = styled.div`
  display: flex;
  position: relative;
  height: 400px;
`

const Floating = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 20px;
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Network: React.FC = () => {
  const network = useLoaderData() as NetworkType | null

  const [firebaseRuns, , error] = useCollection(getRunCollection(network?.name ?? ''))
  let runs = firebaseRuns?.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Array<WithID<NetworkRun>>
  let processedRuns = runs
  const [averageResults, setAverageResults] = React.useState(true)
  const [showTrendLines, setShowTrendLines] = useShowTrendlines()

  if (runs == null) {
    runs = []
  }

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
    datasets: processedRuns.map(run => ({
      label: run.name,
      data: run.accuracyTest
      // borderColor: 'rgb(255, 99, 132)',
      // backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }))
  }

  if (showTrendLines) {
    if (data.datasets.length > 0) {
      const trendDataSets = data.datasets.map(dataset => {
        const cutIndex = dataset.data.findIndex(value => isNaN(value))
        if (cutIndex !== -1) {
          dataset.data = dataset.data.slice(0, cutIndex)
        }
        const chartData = arrayToChartData(dataset.data)
        const { predict } = toTrendLine(chartData)
        const trendLine = chartDataToArray(Array.from(Array(dataset.data.length).keys()).map(index => predict(index)))

        return {
          label: dataset.label + ' trend line',
          data: trendLine
        }
      })

      trendDataSets.forEach(trendDataSet => data.datasets.push(trendDataSet))
    }
  }

  return (
    <Container>
      <TopContainer>
        <ModelVisualization nodes={network.nodes} />
        <Floating>
          <BackButton href='/' />
          <NetworkInfo network={network} />
        </Floating>
      </TopContainer>
      <BottomContainer>
        <Line options={options} data={data} />
        <Row>
          <p style={{ marginRight: 10 }}>Average out runs</p><Switch checked={averageResults} onChange={setAverageResults} />
        </Row>
        <Row>
          <p style={{ marginRight: 10 }}>Show trend lines</p><Switch checked={showTrendLines} onChange={setShowTrendLines} />
        </Row>
        <Runs runs={runs} />
        <LossWindowGraph network={network} />
      </BottomContainer>
    </Container>
  )
}

export default Network
