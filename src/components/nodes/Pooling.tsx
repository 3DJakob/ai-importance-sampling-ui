import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import React from 'react'
import { PoolingNode3D } from '../../lib/types'
import { Euler } from 'three'
import { LAYERTHICKNESSMULTIPLIER } from '../ModelVisualization'
import { ThreeEvent } from '@react-three/fiber'

export interface PoolingProps {
  node: PoolingNode3D
  float?: number
  config: any
  color?: string
  position: [number, number, number]
  onPointerEnter: (e: ThreeEvent<PointerEvent>) => void
  onPointerLeave: (e: ThreeEvent<PointerEvent>) => void
}

export const getPoolingDepth = (): number => {
  return LAYERTHICKNESSMULTIPLIER * 10
}

const Pooling: React.FC<PoolingProps> = ({ node, float = 50, config, color = '#29C1A2', position, onPointerEnter, onPointerLeave }) => {
  const { x, scale } = node
  // y unused for now as it is always = x

  const rot: Euler = new Euler(Math.PI / 2, 0, 0, 'XYZ')

  const radiusBig = Math.sqrt(x * x + x * x) / 2
  const radiusSmall = radiusBig / scale

  return (
    <Float floatIntensity={float} rotationIntensity={0} speed={2}>
      <mesh position={position} rotation={rot} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
        <cylinderGeometry attach='geometry' args={[radiusSmall, radiusBig, getPoolingDepth(), 4, 100, false, Math.PI / 4]} />
        <MeshTransmissionMaterial {...config} color={color} toneMapped={false} />
      </mesh>
    </Float>
  )
}

export default Pooling
