export interface Network {
  batchSize: number
  testSize: number
  name: string
  lr: number
  optimizer: string
  lossFunction: string
  model: string
}

export interface NetworkRun {
  timestamps: number[]
  accuracyTrain: number[]
  accuracyTest: number[]
  lossTrain: number[]
  lossTest: number[]
  name: string
}

export interface NetworkLoss {
  loss: number[]
}

// 3D network data
export type Network3D = Node3D[]

export enum NodeTypes {
  linear = 'linear',
  convolution = 'convolution',
  pooling = 'pooling',
}

export type Node3D = LinearNode3D | ConvolutionNode3D | PoolingNode3D

export interface LinearNode3D {
  type: NodeTypes.linear
  x: number
}

export interface ConvolutionNode3D {
  type: NodeTypes.convolution
  x: number
  y: number
  channels: number
}

export interface PoolingNode3D {
  type: NodeTypes.pooling
  x: number
  y: number
  scale: number
}
