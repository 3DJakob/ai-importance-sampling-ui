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
  const [sortBy, setSortBy] = React.useState<string | undefined>(undefined)

  return (
    <Container>
      <Table
        as={TableTheme} data={runs} renderItem={(data => <Run run={data} />)} header={
          <thead>
            <tr>
              <th style={{ cursor: 'pointer' }} onClick={() => setSortBy('id')}>ID</th>
              <th style={{ cursor: 'pointer' }} onClick={() => setSortBy('name')}>Name</th>
              <th>Batches</th>
              <th>Best Accuracy</th>
            </tr>
          </thead>
      }
        sortBy={sortBy}
      />
    </Container>
  )
}

export default Runs
