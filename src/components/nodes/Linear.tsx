import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import React from 'react'
import { LinearNode3D } from '../../lib/types'
import { LAYERTHICKNESSMULTIPLIER } from '../ModelVisualization'

export interface PoolingProps {
  node: LinearNode3D
  float?: number
  config: any
  color?: string
  position: [number, number, number]
}

export const getLinearDepth = (node: LinearNode3D): number => {
  return node.x * LAYERTHICKNESSMULTIPLIER
}

const Linear: React.FC<PoolingProps> = ({ node, float = 100, config, color = '#FF718F', position }) => {
  return (
    <Float floatIntensity={float} rotationIntensity={0} speed={2}>
      <mesh position={position}>
        <boxGeometry args={[LAYERTHICKNESSMULTIPLIER, LAYERTHICKNESSMULTIPLIER, getLinearDepth(node)]} />
        <MeshTransmissionMaterial {...config} color={color} toneMapped={false} />
      </mesh>
    </Float>
  )
}

export default Linear
