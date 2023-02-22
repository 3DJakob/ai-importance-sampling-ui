import { ApartmentOutlined, CaretUpOutlined, PieChartOutlined, RedoOutlined, RiseOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'
import { Network } from '../lib/types'

export const Glass = styled.div`
  background-image:linear-gradient(to bottom right, rgba(255,255,255,0.7), rgba(255,255,255,0));
  backdrop-filter: blur(10px);
  box-shadow: 10px 10px 10px rgba(30,30,30,0.1);
  border-radius: 10px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;

  h1 {
    margin: 0 0 12px 0;
  }

  p {
    margin: 4px 0;
  }
  
`

export interface NetworkInfoProps {
  network: Network
  style?: React.CSSProperties
}

const NetworkInfo: React.FC<NetworkInfoProps> = ({ network, style }) => {
  return (
    <Container as={Glass} style={style}>
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
