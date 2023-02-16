import { ThreeEvent } from '@react-three/fiber'
import React from 'react'
import { Node3D, NodeTypes } from '../../lib/types'
import Convolution from './Convolution'
import Linear from './Linear'
import Pooling from './Pooling'

export interface NodeProps {
  node: Node3D
  config: any
  position: [number, number, number]
  onPointerEnter: (e: ThreeEvent<PointerEvent>) => void
  onPointerLeave: (e: ThreeEvent<PointerEvent>) => void
}

const Node: React.FC<NodeProps> = ({ node, config, position, onPointerEnter, onPointerLeave }) => {
  switch (node.type) {
    case NodeTypes.convolution:
      return <Convolution node={node} config={config} position={position} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} />
    case NodeTypes.linear:
      return <Linear node={node} config={config} position={position} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} />
    case NodeTypes.pooling:
      return <Pooling node={node} config={config} position={position} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} />
    default:
      return <></>
  }
}

export default Node
