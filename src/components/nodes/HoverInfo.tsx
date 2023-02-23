import React from 'react'
import styled from 'styled-components'
import { Node3D, NodeTypes } from '../../lib/types'

export interface HoverInfoProps {
  node: Node3D
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 8px;
  text-align: center;
`

const Item = styled.p`
  margin: 0;
`

const HoverInfo: React.FC<HoverInfoProps> = ({ node }) => {
  const { type } = node

  switch (type) {
    case NodeTypes.convolution:
      return (
        <Column>
          <Title>
            Convolution
          </Title>
          <Item>
            Input size: {node.x} x {node.y}
          </Item>
          <Item>
            Channels: {node.channels}
          </Item>
        </Column>
      )

    case NodeTypes.linear:
      return (
        <Column>
          <Title>
            Linear
          </Title>
          <Item>
            Input size: {node.x}
          </Item>
        </Column>
      )

    case NodeTypes.pooling:
      return (
        <Column>
          <Title>
            Pooling
          </Title>
          <Item>
            Input size: {node.x} x {node.y}
          </Item>
          <Item>
            Output size: {node.x / node.scale} x {node.y / node.scale}
          </Item>
          <Item>
            Scalefactor: {node.scale}
          </Item>
        </Column>
      )
  }
}

export default HoverInfo
