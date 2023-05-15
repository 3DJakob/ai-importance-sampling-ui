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
import ModelVisualization from '../components/ModelVisualization'
import { useLoaderData } from 'react-router-dom'
import BackButton from '../components/BackButton'
import LossWindowGraph from '../components/LossWindowGraph'
import RelativeAccuracyGraph from '../components/RelativeAccuracyGraph'
import Runs from '../components/RunsInfo'
import useShowTrendlines from '../lib/useShowTrendlines'
import useAverageResults from '../lib/useAverageResults'
import zoomPlugin from 'chartjs-plugin-zoom'
import TimestampGraph from '../components/TimestampAccuracyGraph'
import TimeSavingGraph from '../components/TimeSavingGraph'
import LossGraph from '../components/LossGraph'
import BatchAccuracyGraph from '../components/BatchAccuracyGraph'
import ImageSamples from '../components/ImageSamples'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  zoomPlugin
)

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
  const [averageResults, setAverageResults] = useAverageResults()
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
        <BatchAccuracyGraph network={network} />
        <Row>
          <p style={{ marginRight: 10 }}>Average out runs</p><Switch checked={averageResults} onChange={setAverageResults} />
        </Row>
        <Row>
          <p style={{ marginRight: 10 }}>Show trend lines</p><Switch checked={showTrendLines} onChange={setShowTrendLines} />
        </Row>
        <ImageSamples />
        <Runs runs={runs} networkID={network.name} />
        <TimestampGraph network={network} />
        <LossGraph network={network} />
        <TimeSavingGraph network={network} />
        <RelativeAccuracyGraph network={network} />
        <LossWindowGraph network={network} />
      </BottomContainer>
    </Container>
  )
}

export default Network
