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
  return (
    <Container>
      <Table as={TableTheme}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Batches</th>
            <th>Best Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => {
            return (
              <Run run={run} key={run.id} />
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}

export default Runs
