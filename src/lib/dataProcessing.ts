import { NetworkRun, WithID } from './types'
import regression, { DataPoint, Result } from 'regression'

export const averageRuns = (runs: Array<WithID<NetworkRun>>): Array<WithID<NetworkRun>> => {
  const newRuns: Array<WithID<NetworkRun>> = []

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

const getSegmentValue = (x: number[], y: number[], searchValue: number): number => {
  // find the value for searchValue using linear interpolation
  for (let i = 0; i < x.length - 1; i++) {
    if (x[i] <= searchValue && x[i + 1] >= searchValue) {
      const slope = (y[i + 1] - y[i]) / (x[i + 1] - x[i])
      return slope * (searchValue - x[i]) + y[i]
    }
  }
  // console.warn('could not find value for', searchValue)
  return x[0]
}

const propertiesToAverage: Array<'accuracyTest' | 'lossTest'> = ['accuracyTest', 'lossTest']

export const averageRunVariableTime = (runs: Array<WithID<NetworkRun>>): WithID<NetworkRun> => {
  const longestRunCount = Math.max(...runs.map(run => run.timestamps.length))
  const stepSize = longestRunCount / 500
  const smallestFinalTimestamp = Math.min(...runs.map(run => run.timestamps[run.timestamps.length - 1]))
  const xValues = []
  let currentX = 0

  const newRun = { ...runs[0] }

  for (const property of propertiesToAverage) {
    newRun[property] = []
  }

  while (currentX < smallestFinalTimestamp) {
    for (const property of propertiesToAverage) {
      let toRound = 0
      for (const run of runs) {
        const yValue = getSegmentValue(run.timestamps, run[property], currentX)
        toRound += yValue
      }
      newRun[property].push(toRound / runs.length)
    }

    xValues.push(currentX)

    currentX += stepSize
  }

  newRun.timestamps = xValues

  return newRun
}

export const averageRunsVaribleTime = (runs: Array<WithID<NetworkRun>>): Array<WithID<NetworkRun>> => {
  const sortedRuns: any = {}

  // sort the runs by name
  for (const run of runs) {
    if (sortedRuns[run.name] == null) {
      sortedRuns[run.name] = []
    }
    sortedRuns[run.name].push(run)
  }

  const resultingRuns = []

  // average the runs
  for (const runName in sortedRuns) {
    resultingRuns.push(averageRunVariableTime(sortedRuns[runName]))
  }

  return resultingRuns
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
