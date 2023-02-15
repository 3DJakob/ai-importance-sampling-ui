import React from 'react'
import { Node3D, NodeTypes } from '../../lib/types'
import Convolution from './Convolution'
import Linear from './Linear'
import Pooling from './Pooling'

export interface NodeProps {
  node: Node3D
  config: any
  position: [number, number, number]
}

const Node: React.FC<NodeProps> = ({ node, config, position }) => {
  switch (node.type) {
    case NodeTypes.convolution:
      return <Convolution node={node} config={config} position={position} />
    case NodeTypes.linear:
      return <Linear node={node} config={config} position={position} />
    case NodeTypes.pooling:
      return <Pooling node={node} config={config} position={position} />
    default:
      return <></>
  }
}

export default Node
