import styled from 'styled-components'
import { NetworkRun, WithID } from '../../lib/types'
import Table, { TableTheme } from '../Table'
import Run from './Run'
import { useState } from 'react'
import { updateDoc } from 'firebase/firestore'
import { getRunDocument } from '../../lib/collections'

const Container = styled.div`
  display: flex;
  flex-direction: column;

`

export interface RunsProps {
  runs: Array<WithID<NetworkRun>>
  networkID: string
}

const Runs: React.FC<RunsProps> = ({ runs, networkID }) => {
  const [sortBy, setSortBy] = useState<string | undefined>('id')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showAll, setShowAll] = useState<boolean>(false)

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
      bestAccuracy,
      visibility: run.visible === true
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

  const toggleVisibility = (): void => {
    const toUpdate = preparedData.map(r => r.id)

    // for each run, update visibility
    toUpdate.forEach((id) => {
      const docRef = getRunDocument(networkID, id)

      updateDoc(docRef, {
        visible: showAll
      }).catch((error) => {
        console.error('Error updating document: ', error)
        alert('Error updating document')
      }).finally(() => {
        console.log('Document successfully updated!')
      })
    })

    setShowAll(!showAll)
  }

  return (
    <Container>
      <Table
        as={TableTheme} data={preparedData} renderItem={(data => <Run run={data} key={data.id} networkID={networkID} />)} header={
          <thead>
            <tr>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSortBy('id')}>ID</th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSortBy('name')}>Name</th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSortBy('name')}>Color</th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSortBy('batches')}>Batches</th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSortBy('bestAccuracy')}>Best Accuracy</th>
              <th style={{ cursor: 'pointer' }} onClick={() => toggleSortBy('visibility')}>Visibility <button onClick={toggleVisibility}>Toggle all</button></th>
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
