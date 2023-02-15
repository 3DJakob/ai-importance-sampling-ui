import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import React from 'react'
import { ConvolutionNode3D } from '../../lib/types'
import { Euler } from 'three'
import { LAYERTHICKNESSMULTIPLIER } from '../ModelVisualization'

export interface PoolingProps {
  node: ConvolutionNode3D
  float?: number
  config: any
  color?: string
  position: [number, number, number]
}

export const getConvolutionDepth = (node: ConvolutionNode3D): number => {
  return node.channels * LAYERTHICKNESSMULTIPLIER
}

const Convolution: React.FC<PoolingProps> = ({ node, float = 50, config, color = '#FF9060', position }) => {
  const { x, y } = node

  const rot: Euler = new Euler(0, Math.PI, -Math.PI / 2, 'XYZ')

  return (
    <Float floatIntensity={float} rotationIntensity={0} speed={2}>
      <mesh position={position} rotation={rot}>
        <boxGeometry args={[x, y, getConvolutionDepth(node)]} />
        <MeshTransmissionMaterial {...config} color={color} toneMapped={false} />
      </mesh>
    </Float>
  )
}

export default Convolution
