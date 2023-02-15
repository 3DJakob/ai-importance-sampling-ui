import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { useControls } from 'leva'
import styled from 'styled-components'
import Node from './nodes'
import { getSpacing, sampleNetork3D } from './nodes/helper'

export const LAYERTHICKNESSMULTIPLIER = 10

const Container = styled.div`
  width: 100%;
  height: 50vh;
`

const ModelVisualization: React.FC = () => {
  return (
    <Container>
      <Canvas orthographic camera={{ position: [-6, 2, -2], zoom: 200, near: -29 }}>
        <color attach='background' args={['#fef4ef']} />
        <ambientLight />
        <directionalLight castShadow intensity={0.6} position={[0, 0, 10]} />
        <Scene scale={0.01} />
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
}

const Scene: React.FC<SceneProps> = ({ ...props }) => {
  const config = useControls({
    backside: false,
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 256, min: 64, max: 2048, step: 64 },
    transmission: { value: 0.95, min: 0, max: 1 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 0.1, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    thickness: { value: 200, min: 0, max: 200, step: 0.01 },
    backsideThickness: { value: 200, min: 0, max: 200, step: 0.01 },
    ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
    chromaticAberration: { value: 1, min: 0, max: 1 },
    anisotropy: { value: 1, min: 0, max: 10, step: 0.01 },
    distortion: { value: 0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.2, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
    attenuationColor: '#ffffff',
    color: '#ffffff'
  })

  const spacing = getSpacing(sampleNetork3D)

  return (
    <>
      <group {...props}>
        {sampleNetork3D.map((layer, i) => {
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
