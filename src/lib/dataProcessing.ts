import { NetworkRun } from './types'
import regression, { DataPoint, Result } from 'regression'

export const averageRuns = (runs: NetworkRun[]): NetworkRun[] => {
  const newRuns: NetworkRun[] = []

  for (const run of runs) {
    const existingItem = newRuns.find(newRun => newRun.name === run.name)
    if (existingItem != null) {
      existingItem.accuracyTest = run.accuracyTest.map((value, index) => {
        return (value + existingItem.accuracyTest[index]) / 2
      })
      existingItem.accuracyTrain = run.accuracyTrain.map((value, index) => {
        return (value + existingItem.accuracyTrain[index]) / 2
      })
      existingItem.lossTest = run.lossTest.map((value, index) => {
        return (value + existingItem.lossTest[index]) / 2
      })
      existingItem.lossTrain = run.lossTrain.map((value, index) => {
        return (value + existingItem.lossTrain[index]) / 2
      })
    } else {
      newRuns.push(run)
    }
  }

  return newRuns
}

export interface TrendLine {
  slope: number
  yStart: number
  calcY: (x: number) => number
}

export const toTrendLine = (values: DataPoint[]): Result => {
  const trend = regression.polynomial(values, { order: 5, precision: 40 })
  return trend
}

export const arrayToChartData = (values: number[]): DataPoint[] => {
  return values.map((value, index) => [index, value])
}

export const chartDataToArray = (values: DataPoint[]): number[] => {
  return values.map(value => value[1])
}
