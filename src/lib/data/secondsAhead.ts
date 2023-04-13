import { NetworkRun, WithID } from '../types'

export const findXCoordinate = (x: number[], y: number[], searchValue: number): number => {
  // what is the first position in x where y is equal to searchValue
  for (let i = 0; i < x.length - 1; i++) {
    if (y[i] <= searchValue && y[i + 1] >= searchValue) {
      // interpolate
      const diff = y[i + 1] - y[i]
      if (diff === 0) {
        console.log('diff is 0')
      }
      const progression = searchValue - y[i]
      const ratio = progression / diff
      return x[i] + ratio * (x[i + 1] - x[i])
    }
  }
  return x[x.length - 1]
}

export const computeXDistanceGraphFromRuns = (runs: Array<WithID<NetworkRun>>): Array<WithID<NetworkRun>> | null => {
  const uniformRun = runs.find(run => run.name.includes('uniform'))

  if (uniformRun == null) {
    return null
  }

  const runsExceptUniform = runs.filter(run => !run.name.includes('uniform'))

  const x1 = uniformRun.timestamps
  const y1 = uniformRun.accuracyTest

  const results = []

  for (const run of runsExceptUniform) {
    const x2 = run.timestamps
    const y2 = run.accuracyTest
    const { x, y } = computeXDistanceGraph(x1, y1, x2, y2)

    const result: WithID<NetworkRun> = {
      ...run,
      accuracyTest: y,
      timestamps: x
    }
    results.push(result)
  }

  return results
}

export const computeXDistanceGraph = (x1: number[], y1: number[], x2: number[], y2: number[]): { x: number[], y: number[] } => {
  const stepSize = 0.001

  const xValues: number[] = []
  const yValues: number[] = []

  const smallestAccuracy = Math.min(...y1) > Math.min(...y2) ? Math.min(...y1) : Math.min(...y2)
  const largestAccuracy = Math.max(...y1) < Math.max(...y2) ? Math.max(...y1) : Math.max(...y2)

  let currentAccuracy = smallestAccuracy

  while (currentAccuracy <= largestAccuracy) {
    const xa = findXCoordinate(x1, y1, currentAccuracy)
    const xb = findXCoordinate(x2, y2, currentAccuracy)

    xValues.push(currentAccuracy)
    const roundedDiff = Math.round((xa - xb) * 10000) / 10000
    yValues.push(roundedDiff)

    currentAccuracy += stepSize
  }

  return { x: xValues, y: yValues }
}
