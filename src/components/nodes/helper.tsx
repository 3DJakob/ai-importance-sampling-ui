import { Network3D, NodeTypes } from '../../lib/types'
import { getConvolutionDepth } from './Convolution'
import { getLinearDepth } from './Linear'
import { getPoolingDepth } from './Pooling'

const AIRGAP = 10

export const getSpacing = (nodes: Network3D): number[] => {
  let spacing: number[] = []

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    switch (node.type) {
      case NodeTypes.convolution:
        spacing.push(getConvolutionDepth(node) + AIRGAP)
        break
      case NodeTypes.linear:
        spacing.push(getLinearDepth(node) + AIRGAP)
        break
      case NodeTypes.pooling:
        spacing.push(getPoolingDepth() + AIRGAP)
        break
      default:
        break
    }
  }

  // Accumulate spacing add up all the previous values
  let sum = 0
  spacing = spacing.map((s, i) => {
    sum += s
    return sum
  })

  spacing = spacing.map((s, i) => {
    if (i === 0) return s / 2
    return s / 2 + spacing[i - 1] / 2
  })

  // Center the spacing
  const windowWidth = window.innerWidth
  spacing = spacing.map((s) => s - windowWidth / 4)

  return spacing
}

export const sampleNetwork3D: Network3D = [
  {
    type: NodeTypes.convolution,
    x: 96,
    y: 96,
    channels: 10
  },
  {
    type: NodeTypes.pooling,
    x: 96,
    y: 96,
    scale: 2
  },
  {
    type: NodeTypes.convolution,
    x: 48,
    y: 48,
    channels: 20
  },
  {
    type: NodeTypes.pooling,
    x: 48,
    y: 48,
    scale: 2
  },
  {
    type: NodeTypes.linear,
    x: 24 * 24 * 20
  }
]
