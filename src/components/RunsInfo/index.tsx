import React from 'react'
import styled from 'styled-components'
import { NetworkRun, WithID } from '../../lib/types'
import Table, { TableTheme } from '../Table'
import Run from './Run'

const Container = styled.div`
  display: flex;
  flex-direction: column;

`

export interface RunsProps {
  runs: Array<WithID<NetworkRun>>
}

const Runs: React.FC<RunsProps> = ({ runs }) => {
  const [sortBy, setSortBy] = React.useState<string | undefined>('id')
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc')

  const preparedData = runs.map((run) => {
    const bestAccuracy = run.accuracyTest.reduce((acc, curr) => {
      if (curr > acc) {
        return curr
      }
      return acc
    }, 0)
    return {
      ...run,
      baches: run.accuracyTest.length,
      bestAccuracy
    }
  })

  const toggleSortBy = (key: string): void => {
    if (sortBy === key) {
      if (sortOrder === 'asc') {
        setSortOrder('desc')
      } else {
        setSortOrder('asc')
      }
    } else {
      setSortBy(key)
    }
  }

  return (
    <Container>
      <Table
        as={TableTheme} data={preparedData} renderItem={(data => <Run run={data} key={data.id} />)} header={
          <thead>
            <tr>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSortBy('id')}>ID</th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSortBy('name')}>Name</th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSortBy('name')}>Color</th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSortBy('batches')}>Batches</th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSortBy('bestAccuracy')}>Best Accuracy</th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSortBy('bestAccuracy')}>Copy</th>
            </tr>
          </thead>
      }
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </Container>
  )
}

export default Runs
