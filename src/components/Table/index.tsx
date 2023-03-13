import React from 'react'
import styled from 'styled-components'

export const TableTheme = styled.table`
  tr {

  }

  tr>th {
    text-align: left;
    padding: 10px;
  }

  tr>td {
    padding: 10px;
    border: 0px;
    border-bottom: 1px solid #ccc;
  }
`

const StyledTable = styled.table`
  width: 100%;
  font: 16px;
  border-collapse: collapse;

  td {
    border: 1px solid #ccc;
    padding: 5px 10px;
  }
  
  .autowidth td {
    white-space: nowrap;
  }
`

export interface TableProps<T = any> {
  data: T[]
  header: React.ReactNode
  renderItem: (item: T) => React.ReactNode
  as: React.ElementType | undefined
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

const sort = (data: any[], sortBy: string | undefined): any[] => {
  if (sortBy == null) {
    return data
  }
  if (data.length === 0) {
    return data
  }
  const first = data[0]

  // ID is always string in firebase but we want to sort it as number
  if (sortBy === 'id') {
    return data.sort((a, b) => {
      return Number(a[sortBy]) - Number(b[sortBy])
    })
  }

  if (typeof first[sortBy] === 'string') {
    return data.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1
      }
      if (a[sortBy] > b[sortBy]) {
        return 1
      }
      return 0
    })
  }
  return data.sort((a, b) => {
    return a[sortBy] - b[sortBy]
  })
}

const Table: React.FC<TableProps> = ({ as, header, data, renderItem, sortBy, sortOrder = 'asc' }) => {
  data = sort(data, sortBy)

  if (sortOrder === 'desc') {
    data = data.reverse()
  }

  return (
    <StyledTable as={as}>
      {header}
      <tbody>
        {data.map((item) => {
          return renderItem(item)
        })}
      </tbody>
    </StyledTable>
  )
}

export default Table
