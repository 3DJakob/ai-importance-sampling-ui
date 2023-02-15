import { ApartmentOutlined, CaretUpOutlined, PieChartOutlined, RedoOutlined, RiseOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'
import { Network } from '../lib/types'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 4px 0;
  }
  
`

export interface NetworkInfoProps {
  network: Network
}

const NetworkInfo: React.FC<NetworkInfoProps> = ({ network }) => {
  return (
    <Container>
      <h1>{network.name}</h1>
      <p><PieChartOutlined /> Batch size <b>{network.batchSize}</b></p>
      <p><CaretUpOutlined /> Learning rate <b>{network.lr}</b></p>
      <p><RedoOutlined /> Optimizer <b>{network.optimizer}</b></p>
      <p><RiseOutlined /> Loss function <b>{network.lossFunction}</b></p>
      <p><ApartmentOutlined /> Model <b>{network.model}</b></p>
    </Container>
  )
}

export default NetworkInfo
