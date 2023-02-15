import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import styled from 'styled-components'
import Node from './nodes'
import { getSpacing, sampleNetwork3D } from './nodes/helper'
import { Network3D } from '../lib/types'

export const LAYERTHICKNESSMULTIPLIER = 10

const Container = styled.div`
  width: 100%;
  height: 100%;
`

interface ModelVisualizationProps {
  network3D?: Network3D
}

const ModelVisualization: React.FC<ModelVisualizationProps> = ({ network3D }) => {
  return (
    <Container>
      <Canvas orthographic camera={{ position: [-6, 2, -2], zoom: 200, near: -29 }}>
        <color attach='background' args={['#fef4ef']} />
        <ambientLight />
        <directionalLight castShadow intensity={0.6} position={[0, 0, 10]} />
        <Scene scale={0.01} network3D={network3D} />
        {/* <OrbitControls makeDefault /> */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
              <Lightformer key={i} form='circle' intensity={4} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[4, 1, 1]} />
            ))}
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[50, 2, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
          </group>
        </Environment>
      </Canvas>
    </Container>
  )
}

interface SceneProps {
  scale: number
  network3D?: Network3D
}

const Scene: React.FC<SceneProps> = ({ scale, network3D }) => {
  const config = {
    backside: false,
    samples: 16,
    resolution: 256,
    transmission: 0.95,
    roughness: 0.5,
    clearcoat: 0.1,
    clearcoatRoughness: 0.1,
    thickness: 200,
    backsideThickness: 200,
    ior: 1.5,
    chromaticAberration: 1,
    anisotropy: 1,
    distortion: 0,
    distortionScale: 0.2,
    temporalDistortion: 0,
    attenuationDistance: 0.5,
    attenuationColor: '#ffffff',
    color: '#ffffff'
  }
  if (network3D == null) {
    network3D = sampleNetwork3D
  }

  const spacing = getSpacing(network3D)

  return (
    <>
      <group scale={scale}>
        {network3D.map((layer, i) => {
          return (
            <Node
              key={i}
              node={layer}
              config={config}
              position={[0, 0, spacing[i]]}
            />
          )
        })}
      </group>
    </>
  )
}

export default ModelVisualization
